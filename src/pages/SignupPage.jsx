import { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Login_Api, Signup_api, generate_otp, verify_otp, reset_password } from "../Utils/Apis";
import { useDispatch } from "react-redux";
import { login } from "../ReduxStateManagement/authslice";
import LandingPage_Header from "../LandingPage_components/LandingPage_Header";
import useDispatchHeader from '../customHooks/useDispatchHeader';
import superchatLogo from '../assets/superchat_logo.webp';
import { useGoogleLogin } from '@react-oauth/google';
import { Helmet } from 'react-helmet-async';
import LandingPage__Left_Container from "../LandingPage_components/LandingPage__Left_Container";

export default function SignupPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginhandle, setloginhandle] = useState(true);
  const [formdata, setformdata] = useState({});
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);

  const [resetStep, setResetStep] = useState(null);
  const [otpExpirationTime, setOtpExpirationTime] = useState(null);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useDispatchHeader();

  const pageTitle = loginhandle ? "Login - Superchat" : "Sign Up - Superchat";
  const pageDescription = loginhandle 
    ? "Log in to your Superchat account for seamless conversations and exceptional chat experience."
    : "Join Superchat today - Sign up for free and experience the next generation of chat platforms.";

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/chatbot");
    }
  }, [navigate]);

  const handlechange = (e) => {
    setformdata({ ...formdata, [e.target.id]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleloginhandle = () => {
    setloginhandle(!loginhandle);
  };

  const handleGenerateOtp = async () => {
    const response = await fetch(generate_otp, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: formdata.email }),
    });
  
    const data = await response.json(); // Expecting { expiration_time, status }
  
    if (response.ok && data.status === "success") {
      alert("OTP sent to email!");
  
      // Store expiration time in state for verification
      setOtpExpirationTime(data.expiration_time);
      
      setResetStep("otp");
    } else {
      alert("Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpExpirationTime) {
      alert("OTP has expired. Please request a new one.");
      return;
    }
  
    const response = await fetch(verify_otp, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        email: formdata.email, 
        otp, 
        expiration_time: otpExpirationTime,  // Include expiration time as required
      }),
    });
  
    const data = await response.json(); // Expecting { status: "OTP Verified" }
  
    if (response.ok && data.status === "OTP Verified") {
      alert("OTP Verified!");
      setResetStep("reset");
    } else {
      alert(data.message || "Invalid OTP");
    }
  };
  

  const handleResetPassword = async () => {
    const response = await fetch(reset_password, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        email: formdata.email, 
        password: newPassword,  //  Use "password" instead of "newPassword"
      }),
    });
  
    const data = await response.json(); // Expecting { response: "Password reset successful" }
  
    if (response.ok && data.response === "Password reset successful") {
      alert("Password Reset Successfully!");
      setResetStep(null);
    } else {
      alert(data.response || "Failed to reset password");
    }
  };

  const handleloginsubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const endpoint = loginhandle ? Login_Api : Signup_api;

    try {
      const resp = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await resp.json();
      // console.log("API Response:", data); // Debugging

      if (data.token) {
        // console.log("Token received:", data.token); // Debugging
        localStorage.setItem("token", data.token);
        dispatch(login({ token: data.token }));
        navigate("/chatbot");
      } else {
        const errorMessage = data.error || "Login failed. Please try again.";
        seterror(errorMessage);
        alert(errorMessage); // Show error to user
      }
    } catch (err) {
      console.log(err);
      console.log("Login Error:", err);
      seterror("Something went wrong. Please try again.");
    } finally {
      setloading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      //console.log("Full token response:", tokenResponse);
    },
  });

  return (
    <>
      <Helmet>
        <title>{loginhandle ? "Login - Superchat" : "Sign Up - Superchat"}</title>
        <meta name="description" content="Login or sign up to Superchat." />
      </Helmet>

      <div className="flex min-h-screen w-full">
        <header className="fixed top-0 w-full h-12 bg-white shadow z-10">
          <LandingPage_Header />
        </header>
        {/* Left Section (Hidden on small screens) */}
        <div className="hidden lg:flex flex-col w-1/2 bg-slate-50 relative">
          <div className="absolute top-4 left-4">
            <span
              className="sm:text-[22px] text-xl font-inter font-semibold bg-clip-text text-transparent cursor-pointer"
              style={{
                backgroundImage: "linear-gradient(to right, #6F036C, #FF6F61E5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Superchat LLC
            </span>
          </div>
          <div className="col-span-1 sm:col-span-2 justify-center item-center mt-20">
            <LandingPage__Left_Container />
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 h-screen flex items-center justify-center bg-white p-8 sm:p-20">
          <form
            onSubmit={handleloginsubmit}
            className="w-full flex flex-col justify-center px-6"
          >
            <h1 className="text-2xl font-semibold mb-6 text-center">
              {loginhandle ? "Welcome Back to Superchat" : "Join Superchat"}
            </h1>

            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mb-4 border rounded-lg"
              id="email"
              onChange={handlechange}
              required
            />

            {/* Password Field (Only Show When Reset is Not in Progress) */}
            {resetStep !== "reset" && (
              <>
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="relative w-full">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    className="w-full px-4 py-2 border rounded-lg"
                    id="password"
                    onChange={handlechange}
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-3 flex items-center px-2 text-gray-600"
                  >
                    {passwordVisible ? <FiEye /> : <FiEyeOff />}
                  </button>
                </div>
              </>
            )}

            {/* OTP Verification Step */}
            {resetStep === "otp" && (
              <>
                <label className="block text-sm font-medium mb-2">Enter OTP</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 mb-4 border rounded-lg"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Verify OTP
                </button>
              </>
            )}

            {/* Password Reset Step */}
{resetStep === "reset" && (
  <>
    <label className="block text-sm font-medium mb-2">New Password</label>
    <div className="relative w-full">
      <input
        type={passwordVisible ? "text" : "password"}
        className="w-full px-4 py-2 mb-4 border rounded-lg"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute inset-y-0 right-3 flex items-center px-2 text-gray-600"
      >
        {passwordVisible ? <FiEye /> : <FiEyeOff />}
      </button>
    </div>

    <button
      type="button"
      onClick={handleResetPassword}
      className="w-full py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
    >
      Reset Password
    </button>
  </>
)}

            {/* Forgot Password Button (Only Show If Not Resetting) */}
            {resetStep === null && (
              <button
                type="button"
                onClick={handleGenerateOtp}
                className="text-blue-600 mt-2 self-start"
              >
                Forgot Password?
              </button>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 mt-4 text-white bg-black rounded-lg hover:bg-gray-800"
              disabled={loading}
            >
              {loading ? "Processing..." : loginhandle ? "Login" : "Sign Up"}
            </button>

            {/* Google Login Option */}
            <p className="text-center text-gray-600 my-4">Or continue with</p>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={googleLogin}
                disabled={loading}
                className="flex items-center border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                Google
              </button>
            </div>
             {/* Toggle between Login and Sign Up */}
             <div className="mt-4 text-center">
              {loginhandle ? (
                <>
                  Don't have an account?{" "}
                  <span
                    onClick={toggleloginhandle}
                    className="text-indigo-600 hover:underline cursor-pointer"
                  >
                    Sign Up
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span
                    onClick={toggleloginhandle}
                    className="text-indigo-600 hover:underline cursor-pointer"
                  >
                    Log In
                  </span>
                </>
              )}
              </div>
          </form>
        </div>
      </div>
    </>
  );
}
