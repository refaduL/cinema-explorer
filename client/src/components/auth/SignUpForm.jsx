import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api";
import ModalMessage from "./ModalMessage";

export default function SignUpForm({ onSignIn }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        if (isSubmitting) return;
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const response = await registerUser(formData);
            setMessage(response.data.message);
            setIsError(false);
            setTimeout(() => navigate("/signin"), 2000);
        } catch (error) {
            console.log(error);
            setMessage(error.response?.data?.message || "Registration failed.");
            setIsError(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Sign Up</h2>
            <div className="mb-4 px-0.5">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-[#2B2C37] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary input-hover"
                    required
                />
            </div>
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
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Submitting...' : 'Sign Up'}

            </button>

            {message && (
                <ModalMessage
                    message={message}
                    isError={isError}
                    onClose={() => setMessage("")}
                    onBackToHome={() => {
                        setMessage("");
                        navigate("/");
                    }}
                    onRetry={() => {
                        setFormData({ name: "", email: "", password: "" });
                        setMessage("");
                    }}
                    onSignIn={() => {
                        setMessage("");
                        onSignIn();
                    }}
                    context={"signup"}
                />
            )}
        </form>
    );
}
