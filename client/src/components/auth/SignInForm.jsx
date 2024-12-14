import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ModalMessage from "./ModalMessage";
import { signInUser } from "../../api";
import { useAuthContext } from "../../contexts/AuthContext";

export default function SignInForm() {
    const { login, authData } = useAuthContext();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(formData);

        try {
            const response = await signInUser(formData); 
            setMessage(response.message)
            setIsError(false);

            setTimeout(() => navigate("/dashboard"), 2000);
        } catch (error) {
            console.error(error);
            setMessage(error.response?.data?.message || "Login failed.");
            setIsError(true);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Sign In</h2>
                <div className="mb-4 px-0.5">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-[#2B2C37] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary input-hover"
                        required
                    />
                </div>
                <div className="mb-6 px-0.5">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-[#2B2C37] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary input-hover"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-primary text-white font-semibold py-2 px-4 rounded-lg w-full hover:bg-primary-dark btn-hover"
                    disabled={authData.loading}
                >
                    {authData.loading ? "Signing In..." : "Sign In"}
                </button>
                
            </form>

            {message && (
                <ModalMessage
                    message={message}
                    isError={isError}
                    onClose={() => setMessage("")}
                    onRetry={() => {
                        setFormData({ email: "", password: "" });
                        setMessage("");
                    }}
                    onSignIn={() => navigate("/dashboard")}
                    context={"signin"}
                />
            )}
        </>
    );
}
