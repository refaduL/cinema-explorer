import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export default function AuthModal({ isOpen, onClose }) {
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(true); // Toggle between Sign Up and Sign In

    if (!isOpen) return null;

    function handleSignIn() {
        navigate("/signin");
        setIsSignUp(false);
    }

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
            {/* Clickable Overlay: Clicking Outside of the Modal */}
            <div
                className="absolute inset-0"
                onClick={() => { navigate("/") }}
            ></div>
            
            {/* Auth Modal starts */}
            <div
                className="bg-white dark:bg-[#1F2029] rounded-lg shadow-lg p-6 w-full max-w-md relative transition-all duration-500"
                style={{
                    height: isSignUp ? "450px" : "370px", // Adjust heights based on content
                    
                }}
            >
                {/* Close Button */}
                <Link
                    to="/"
                    className="absolute top-1 right-1 border-none text-2xl text-gray-500 dark:text-gray-400 dark:hover:text-gray-200 btn-hover-transparent"
                    onClick={onClose}
                >
                    &times;
                </Link>

                {/* Capsule Toggle */}
                <div className="flex justify-center mb-6">
                    <div className="relative flex w-64 bg-gray-200 dark:bg-gray-700 rounded-full p-1">
                        {/* Sliding Active Indicator */}
                        <div
                            className={`absolute top-0 left-0 h-full w-1/2 bg-primary rounded-full transition-transform duration-500 hover:scale-105 ${
                                isSignUp ? "translate-x-0" : "translate-x-full"
                            }`}
                        ></div>
                        <Link
                            to="/signup"
                            className={`flex-1 px-8 py-2 text-sm font-semibold relative z-10 ${
                                isSignUp ? "text-white" : "text-gray-600 dark:text-gray-300"
                            }`}
                            onClick={() => setIsSignUp(true)}
                        >
                            Sign Up
                        </Link>
                        <Link
                            to="/signin"
                            className={`flex-1 py-2 text-sm font-semibold relative z-10 ${
                                !isSignUp ? "text-white" : "text-gray-600 dark:text-gray-300"
                            }`}
                            onClick={() => setIsSignUp(false)}
                        >
                            Sign In
                        </Link>
                    </div>
                </div>

                {/* Form Content with Height Transition */}
                <div
                    className=".transition-all duration-500 overflow-hidden"
                >
                    {isSignUp ? <SignUpForm onSignIn={handleSignIn} /> : <SignInForm />}
                </div>
            </div>
        </div>
    );
}




