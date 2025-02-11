import  { useState, useRef, useCallback } from "react";
import { FaMicrophone } from "react-icons/fa";
import { FaMicrophoneLinesSlash, FaXmark } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { changeVoiceMode } from "../../ReduxStateManagement/user";
import { Transcript_api, Chat_api, Voice_api } from "../../Utils/Apis";
import { logout } from "../../ReduxStateManagement/authslice";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import process from "../../assets/lottie/Animation - 1736227142552.json";
import listen from '../../assets/lottie/Animation - 1736228909691.json';
import { Helmet } from 'react-helmet-async';

export default function VoiceInterface() {
    const [listening, setListening] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [speaking, setSpeaking] = useState(false);
    const [initializing, setInitializing] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Refs to manage ongoing processes
    const mediaRecorderRef = useRef(null);
    const audioStreamRef = useRef(null);
    const audioRef = useRef(null);
    const shouldContinueRef = useRef(true);
    const abortControllerRef = useRef(null);

    const stopAllProcesses = useCallback(() => {
        // Abort any ongoing fetch requests
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }

        // Stop media recording if active
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current = null;
        }

        // Stop audio playback
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        // Stop audio stream
        if (audioStreamRef.current) {
            audioStreamRef.current.getTracks().forEach(track => track.stop());
            audioStreamRef.current = null;
        }

        // Reset states
        setListening(false);
        setProcessing(false);
        setSpeaking(false);
        setInitializing(false);
        shouldContinueRef.current = false;
    }, []);

    const processAudioCycle = useCallback(async () => {
        if (!shouldContinueRef.current) return;

        try {
            // Create a new abort controller for each cycle
            abortControllerRef.current = new AbortController();
            const signal = abortControllerRef.current.signal;

            // Capture audio
            const audioBlob = await captureAudio();
            const authToken = localStorage.getItem("token");

            // Set processing state only if we're continuing
            if (shouldContinueRef.current) {
                setProcessing(true);
            }

            // Create form data for Transcript API
            const formData = new FormData();
            formData.append("audio", audioBlob, "input.wav");
            formData.append("target_lang",'en')

            // Transcribe audio
            const transcriptResponse = await fetch(Transcript_api, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                body: formData,
                signal
            });

            const transcript = await transcriptResponse.json();
            if (transcript.message) {
                dispatch(logout());
                localStorage.removeItem("messages");
                navigate("/signup");
                return;
            }

            // Ensure we're still continuing before next steps
            if (!shouldContinueRef.current) return;

            // Send transcript to Chat API
            const chatResponse = await fetch(Chat_api, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_input: transcript.response,
                    response_length: "short",
                    target_lang:"en"
                }),
                signal
            });

            const response = await chatResponse.json();
            if (response.message) {
                dispatch(logout());
                localStorage.removeItem("messages");
                navigate("/signup");
                return;
            }

            if (!shouldContinueRef.current) return;

            const voiceResponse = await fetch(Voice_api, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user_input: response.response,target_lang:'en' }),
                signal
            });

            const voiceBlob = await voiceResponse.blob();

            // Ensure we're still continuing before playing audio
            if (!shouldContinueRef.current) return;

            // Reset processing state before speaking
            setProcessing(false);

            // Play audio response
            setSpeaking(true);
            await playAudio(voiceBlob);
            setSpeaking(false);

            // Continue the cycle if still listening
            if (shouldContinueRef.current) {
                await processAudioCycle();
            }
        } catch (error) {
            // Only log if it's not an abort error
            if (!(error instanceof DOMException) || error.name !== 'AbortError') {
                console.error("Error in audio processing:", error);
            }
            stopAllProcesses();
        }
    }, [stopAllProcesses]);

    const captureAudio = () => {
      return new Promise((resolve, reject) => {
          try {
              const constraints = {
                  audio: {
                      echoCancellation: true,
                      noiseSuppression: true,
                      autoGainControl: true,
                      sampleRate: 44100,
                  }
              };

              let audioChunks = [];
              let isSpeaking = false;
              let speechTimeout = null;

              navigator.mediaDevices.getUserMedia(constraints)
                  .then((stream) => {
                      audioStreamRef.current = stream;
                      const mediaRecorder = new MediaRecorder(stream, {
                          mimeType: 'audio/webm;codecs=opus',
                          audioBitsPerSecond: 128000
                      });
                      mediaRecorderRef.current = mediaRecorder;

                      const audioContext = new AudioContext();
                      const source = audioContext.createMediaStreamSource(stream);
                      const analyser = audioContext.createAnalyser();
                      analyser.fftSize = 256;
                      analyser.smoothingTimeConstant = 0.5;
                      source.connect(analyser);

                      const buffer = new Uint8Array(analyser.frequencyBinCount);
                      
                      const detectSpeech = () => {
                          if (!shouldContinueRef.current) return;
                          
                          analyser.getByteFrequencyData(buffer);
                          const average = buffer.reduce((a, b) => a + b) / buffer.length;

                          if (average > 25) {
                              if (!isSpeaking) {
                                  isSpeaking = true;
                                  mediaRecorder.start();
                              }
                              if (speechTimeout) {
                                  clearTimeout(speechTimeout);
                              }
                              speechTimeout = setTimeout(() => {
                                  if (mediaRecorder.state === 'recording') {
                                      mediaRecorder.stop();
                                  }
                              }, 1000);
                          }
                      };

                      const detectionInterval = setInterval(detectSpeech, 100);

                      mediaRecorder.ondataavailable = (event) => {
                          if (event.data.size > 0) {
                              audioChunks.push(event.data);
                          }
                      };

                      mediaRecorder.onstop = () => {
                          clearInterval(detectionInterval);
                          if (audioChunks.length > 0) {
                              const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                              resolve(audioBlob);
                          } else {
                              reject(new Error("No audio captured"));
                          }
                      };
                  })
                  .catch(reject);
          } catch (error) {
              reject(new Error("Audio capture error: " + error.message));
          }
      });
  };




    const playAudio = (audioBlob) => {
        return new Promise((resolve) => {
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audioRef.current = audio;
            audio.onended = () => {
                URL.revokeObjectURL(audioUrl);
                resolve();
            };
            audio.play();
        });
    };

    const handleMicrophoneClick = async () => {
        if (listening) {
            // Stop listening
            stopAllProcesses();
        } else {
            // Start continuous listening
            setInitializing(true);
            shouldContinueRef.current = true;

            setTimeout(async () => {
                setInitializing(false);
                setListening(true);
                
                try {
                    await processAudioCycle();
                } catch (error) {
                    console.error("Error in voice interface:", error);
                    stopAllProcesses();
                }
            }, 1000); // Simulate initialization delay
        }
    };

    // Animated text component
    const AnimatedText = ({ children, className }) => (
        <div className={`animate-pulse text-white text-center font-bold ${className}`}>
            {children}
        </div>
    );

    return (
        <>
        <Helmet>
                {/* Primary Meta Tags */}
                <title>Voice Interface - Interactive Voice Assistant</title>
                <meta name="title" content="Voice Interface - Interactive Voice Assistant" />
                <meta name="description" content="An interactive voice interface for natural conversation with AI. Features real-time speech recognition, processing, and voice responses." />
                
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Voice Interface - Interactive Voice Assistant" />
                <meta property="og:description" content="Experience natural conversation with our AI voice assistant. Featuring real-time speech recognition and intelligent responses." />
                
              
                {/* Technical Meta Tags */}
                <meta name="robots" content="index, follow" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="keywords" content="voice interface, AI assistant, speech recognition, voice commands, interactive assistant, voice AI" />
                
                {/* Accessibility Tags */}
                <html lang="en" />
                <meta name="application-name" content="Voice Interface" />
                <link rel="canonical" href={window.location.href} />
            </Helmet>
        <main className="w-screen h-screen bg-[#292828] flex flex-col">
            <div className="flex items-center justify-center mx-auto h-full flex-col">
                <div className="flex w-44 justify-between mb-4">

                    <span
                        className={`text-white p-4 bg-[#3A3A3A] rounded-full cursor-pointer ${initializing ? 'animate-ping' : listening ? 'animate-pulse' : ''}`}
                        onClick={handleMicrophoneClick}
                    >
                        {!listening && !initializing ? (
                            <FaMicrophoneLinesSlash className="w-8 h-8 text-red-600" />
                        ) : (
                            <FaMicrophone className="w-8 h-6" />
                        )}
                    </span>

                    <span
                        onClick={() => {
                            stopAllProcesses();
                            dispatch(changeVoiceMode(false));
                        }}
                        className={`text-white p-4 bg-[#3A3A3A] rounded-full cursor-pointer ${processing ? 'animate-spin' : ''}`}
                    >
                        <FaXmark className="w-8 h-8" />
                    </span>
                </div>

                {/* Animated state indicators */}
                {listening && !speaking && !processing && (
                    <>
                    <Lottie
                      animationData={listen}
                      style={{ width: '226px', height: '226px' }} 
                      />
                      
                    <AnimatedText className="text-blue-500 mt-2">Listening...</AnimatedText>


                    </>
                    
                )}
                
                {processing && !speaking && (
                    <>
                    <Lottie
                      animationData={process}
                      style={{ width: '226px', height: '226px' }} 
                        />
               <AnimatedText className="text-blue-500 mt-2">Processing...</AnimatedText>

                    </>
                )}
                
                {speaking && (
                  <>
                  <Lottie
                  animationData={listen}
                  style={{ width: '326px', height: '326px' }} 
                />
                 <AnimatedText className="text-blue-500 mt-2">Speaking...</AnimatedText>

                  </>
                  

                )}
            </div>
        </main>
        </>
    );
}








