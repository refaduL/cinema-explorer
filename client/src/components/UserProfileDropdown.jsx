import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

export default function UserProfileDropdown({ user }) {
    const navigate = useNavigate();
    const { logout } = useAuthContext();

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = (e) => {
        e.stopPropagation();
        setShowDropdown(!showDropdown);
    };
    const closeDropdown = () => {
        setShowDropdown(false);
    };
    const handleLogout = async (e) => {
        e.preventDefault();
        await logout();

        setTimeout(() => navigate("/"), 2000);
    }
    return (
        <div className="relative">
            {/* Profile Button */}
            <button
                className="bg-primary/20 dark:bg-primary/[7%] rounded-lg backdrop-blur-[2px] p-2 inline-block"
                onClick={toggleDropdown}
            >
                <FaUserAlt alt="User Profile" className="w-6 h-6" />
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
                <div
                    className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#2B2C37] rounded-lg shadow-xl pt-4 pb-1 text-sm z-50"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* User Info Section */}
                    <div className="px-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                        {/* <img src={userIcon} alt="Avatar" className="w-12 h-12 rounded-full mb-3"/> */}
                        <FaUserAlt className="w-12 h-12 rounded-full mb-3" />
                        <p className="font-semibold text-gray-800 dark:text-gray-200">{user.name}</p>
                        <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
                    </div>

                    {/* Actions Section */}
                    <ul className="pt-2">
                        <li>
                            <button
                                className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
                                onClick={() => console.log("View Profile")}
                            >
                                View Profile
                            </button>
                        </li>
                        <li>
                            <button
                                className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
                                onClick={() => console.log("Settings")}
                            >
                                Settings
                            </button>
                        </li>
                        <li>
                            <button
                                className="block w-full text-left px-4 py-2 rounded-lg bg-primary text-[#171923] font-semibold text-sm transition-all duration-200 hover:shadow-glow hover:scale-102"
                                onClick={handleLogout}
                            >
                                Log Out
                            </button>
                        </li>
                    </ul>
                </div>
            )}

            {/* Close dropdown when clicking outside */}
            {showDropdown && (
                <div
                    className="bg-black/40 fixed inset-0 z-40"
                    onClick={closeDropdown}
                ></div>
            )}
        </div>
    );
}
