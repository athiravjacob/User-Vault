import { useState } from "react";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignupForm";

const Authentication = () => {
  const [isSignUp, setIssignup] = useState(false)
  const toggleForm = () => {
    console.log("signup", isSignUp )
    setIssignup((prev)=>!prev)
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 p-8">
      <h1 className="text-green-400 text-3xl font-serif  font-extrabold">
        User Vault
      </h1>

      <div className=" flex flex-col justify-center  px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-mono text-green-400">
            {isSignUp ? "Create Your Account" :"Sign In"}
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {isSignUp ? (<SignUpForm changeForm={ toggleForm} />)  : (<SignInForm changeForm={toggleForm} />) }
            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
