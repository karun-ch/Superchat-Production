import { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Login_Api, Signup_api } from "../Utils/Apis";
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
  const [loginhandle, setloginhandle] = useState(false);
  const [formdata, setformdata] = useState({});
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);
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
  const handlechange =  (e)=>{
    setformdata({ ...formdata, [e.target.id]: e.target.value })

  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleloginhandle=()=>{
    setloginhandle(!loginhandle)
  }

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
      console.log("API Response:", data); // Debugging

      // if (data.response) {
      //   setloginhandle(!loginhandle);
      //   seterror(data.response );
      //   if (data.token) {
      //     console.log("Token received:", data.token); // Debugging
      //     dispatch(login({ token: data.token }));
      //     navigate("/chatbot");
      //   }
      // } else {
      //   seterror(data.error);
      // }


      // FIX: Checks if the token exists instead of checking data.response

      if (data.token) {
        console.log("Token received:", data.token); // Debugging
        localStorage.setItem("token", data.token); // Store token
        dispatch(login({ token: data.token }));
        navigate("/chatbot");
      } else {
        seterror(data.error || "Login failed. Please try again.");
      }
    } catch (err) {
     console.log(err)
     console.log("Login Error:", err);
      seterror("Something went wrong. Please try again.");
    } finally {
      setloading(false);
    }
  };

  const googleLogin = useGoogleLogin({ 
    onSuccess: async (tokenResponse) => {
      //console.log("Full token response:", tokenResponse);
    }
  });

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={superchatLogo} />
        <meta property="og:url" content={window.location.href} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={superchatLogo} />
        
        {/* Additional Meta Tags */}
        <meta name="application-name" content="Superchat" />
        <meta name="keywords" content="chat, messaging, communication, login, signup, superchat" />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <div className="bg-gray-50 min-h-screen">
        <header className="fixed top-0 w-full h-12 bg-white shadow z-10">
          <LandingPage_Header />
        </header>

        <main className="w-full bg-white border max-w-sm sm:max-w-md mx-auto px-6 rounded-lg flex flex-col items-center justify-center min-h-screen">
          <form 
            onSubmit={handleloginsubmit} 
            className="w-full mt-16 px-2 rounded-md bg-white"
            aria-labelledby="form-heading"
          >
            <div className="flex justify-center mb-1">
              <img 
                src={superchatLogo} 
                className="w-14 h-14" 
                alt="Superchat Logo"
                width="56"
                height="56"
              />
            </div>
            
            <h1 id="form-heading" className="text-center text-2xl font-semibold mb-10 text-slate-900">
              {loginhandle ? "Welcome Back to Superchat" : "Join Superchat"}
            </h1>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="email"
                name="email"
                onChange={handlechange}
                disabled={loading}
                required
                aria-required="true"
                aria-describedby={error ? "error-message" : undefined}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter Your Password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  id="password"
                  name="password"
                  onChange={handlechange}
                  disabled={loading}
                  required
                  aria-required="true"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center"
                  disabled={loading}
                  aria-label={passwordVisible ? "Hide password" : "Show password"}
                >
                  {passwordVisible ? (
                    <FiEye className="w-5 h-5 text-gray-500" />
                  ) : (
                    <FiEyeOff className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div 
                id="error-message"
                className="text-red-700 text-center p-2 m-2" 
                role="alert"
                aria-live="assertive"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2 text-white bg-black rounded-lg hover:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? "Processing..." : (loginhandle ? "Login" : "Sign Up")}
            </button>

            <p className="text-center mt-4 text-sm flex flex-col sm:flex-row gap-2 justify-center">
              {loginhandle ? (
                <>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={toggleloginhandle}
                    className="text-indigo-600 hover:underline focus:outline-none "
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  Have an account?{" "}
                  <button
                    type="button"
                    onClick={toggleloginhandle}
                    className="text-indigo-600 hover:underline focus:outline-none "
                  >
                    Log In
                  </button>
                </>
              )}
            </p>
          </form>
        </main>
      </div>
    </>
  );
}