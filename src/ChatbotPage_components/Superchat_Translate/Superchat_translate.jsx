import { useEffect, useState } from "react"
import CopyText from "../../Components/Copy";
import { translate_api } from "../../Utils/Apis";
import { supportedLanguage } from "../../Utils/constants";
import { useSelector } from "react-redux";

export default function Superchat_translate() {
    const [inputText,setinputText]= useState('');
    const [target_lang,settarget_lang]=useState("en");
    const [outputText,setoutputText]=useState('');
    const [loading,setloading]=useState(false)
    const [error,seterror]=useState('')
    const { darkmode } = useSelector((store) => store.user);

    const char_limit=5000
    const handleChnage=(e)=>{
    setinputText(e.target.value);
        if(inputText.length<5000)
        {
          seterror(' ')
        }
   }
    useEffect(()=>{
      if(inputText.length>=char_limit)
      {
        seterror("Characters length should be less than 5000")
   }
    },[inputText])
    
    
    const handletranslate = async()=>{
      if(inputText.length>char_limit)
        return
        try{
            setloading(true)
            const authToken=localStorage.getItem("token")
            const responseData=await fetch(translate_api,
                {
                    method:"POST",
                    headers:{
                        Authorization:`Bearer ${authToken}`,
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({user_input:inputText,target_lang})
                },
            )
            const data= await responseData.json();
            setoutputText(data.translation);
            setloading(false)

        }
        catch(e)
        {
                seterror(e)
        }

    }

  return (
    <main className={`w-full min-h-screen overflow-x-hidden overflow-y-auto p-4 relative md:ml-[100px] lg:ml-[230px] ${darkmode?"bg-[#2C2C2C]" : "bg-white"}` } >
        <h2 className={`
      flex 
      pt-6 
      md:pt-12 
      mb-4 
      text-2xl 
      md:text-3xl 
      lg:text-4xl 
      font-bold 
      justify-center
      text-center 
      bg-gradient-to-r ${
        darkmode 
          ? "from-[#F5EEF8] to-[#D0D3D4]" 
          : "from-[#6F036C] to-[#FF6F61E5]"
      } 
      bg-clip-text 
      text-transparent 
    `}>
      Superchat Translator
    </h2>

        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 h-auto md:h-[400px]">
    <div className="relative w-full md:w-[400px] lg:w-[500px] border-2 rounded-lg focus-within:border-transparent">
        <textarea
            value={inputText}
            onChange={handleChnage}
            placeholder="Enter text to translate"
             className={ `h-[250px] md:h-[300px] lg:h-full w-full p-3 pb-16 rounded-lg border-0 focus:outline-none resize-none ${darkmode? "bg-[#2C2C2C] text-white" : "bg-[white] text-black"}`}/>

      <div className="absolute bottom-0 left-0 right-0 h-12 rounded-b-lg">
        <div className={`flex justify-between items-center h-full px-4 ${darkmode? "bg-[#2C2C2C] text-white" : "bg-white text-gray-500"}`}>
        <span 
        className={`text-sm  `}
        >
           { inputText.length}/{char_limit} characters
        </span>
                <button 
                 className={` rounded-lg font-semibold  p-2 ${darkmode ? "text-white hover:underline" : "text-gray-500 hover:underline" }`}
                  onClick={()=>{
                    setinputText('')}}>Clear
                </button>
        </div>
        
     </div>

     </div>

     <div className="relative w-full md:w-[400px] lg:w-[500px] border-2 rounded-lg focus-within:border-transparent">
        <textarea
            value={outputText}
            readOnly
            placeholder="Translated Text.."
            className={ `h-[250px] md:h-[300px] lg:h-full w-full p-3 pb-16 rounded-lg border-0 focus:outline-none resize-none ${darkmode? "bg-[#2C2C2C] text-white" : "bg-[white] text-black"}`}/>

      <div className={`absolute bottom-0 left-0 right-0 h-12 rounded-b-lg ${darkmode? "bg-[#2C2C2C] text-white" : "bg-white text-gray-500"} `}>
        <CopyText text={outputText}/>

     </div>

     </div>
        </div>

      <div className="text-center mt-4 flex flex-col items-center">
      <select className={`w-full max-w-xs py-2 pl-1 text-md hover:cursor-pointer rounded-lg m-1 ${darkmode ? "bg-[#2C2C2C] text-white" : "" }`} onChange={(e)=>settarget_lang(e.target.value)}>
          {supportedLanguage.map((language,index)=><option value={language.code} key={index}>{language.language}</option>)}
        </select>

      {  inputText.length <char_limit && <button
        onClick={handletranslate}
         className="hover:cursor-pointer rounded-md sm:text-[16px] text-[15px] bg-black text-white mt-5 p-2 w-full max-w-xs">
            {loading ? "Translating.." : "Translate"}
        </button>}
       
      </div>
      <div className="text-center text-red-700 mt-4">
        {error}
      </div>
    </main>
  )
}