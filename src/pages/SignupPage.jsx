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
            className="w-full h-full  flex flex-col justify-center px-6" // max-w-md
          >
            <h1 className="text-2xl font-semibold mb-6 text-center">
              {loginhandle ? "Welcome Back to Superchat" : "Join Superchat"}
            </h1>

            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="chris@gmail.com"
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              id="email"
              onChange={handlechange}
              disabled={loading}
              required
            />

            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative w-full">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="chris@1234"
                className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="password"
                onChange={handlechange}
                disabled={loading}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 mb-4 flex items-center"
                disabled={loading}
              >
                {passwordVisible ? (
                  <FiEye className="w-5 h-5 text-gray-500" />
                ) : (
                  <FiEyeOff className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </div>

            {error && (
              <p className="text-red-700 text-center p-2 m-2">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-2 text-white bg-black rounded-lg hover:bg-gray-800"
              disabled={loading}
            >
              {loading ? "Processing..." : loginhandle ? "Login" : "Sign Up"}
            </button>

            <p className="text-center text-gray-600 my-4">Or continue with</p>
            <div className="flex justify-center gap-4">
              <button
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
              <button
                disabled={loading}
                className="flex items-center border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                  alt="Apple"
                  className="w-5 h-5 mr-2"
                />
                Apple
              </button>
            </div>

            <p className="text-center mt-4 text-sm flex flex-col sm:flex-row gap-2 justify-center">
              {loginhandle ? (
                <>
                  Don't have an account? {" "}
                  <span
                    onClick={toggleloginhandle}
                    className="text-indigo-600 hover:underline cursor-pointer"
                  >
                    Sign Up
                  </span>
                </>
              ) : (
                <>
                  Already have an account? {" "}
                  <span
                    onClick={toggleloginhandle}
                    className="text-indigo-600 hover:underline cursor-pointer"
                  >
                    Log In
                  </span>
                </>
              )}
            </p>
          </form>
        </div>
      </div>
    </>
  );
}