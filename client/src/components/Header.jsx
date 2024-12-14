import { useState } from "react";
import { Link } from "react-router-dom";
import MoonIcon from "../assets/icons/moon.svg";
import RingIcon from "../assets/icons/ring.svg";
import SunIcon from "../assets/icons/sun.svg";
import { useThemeContext } from "../contexts/ThemeContext";
import AuthModal from "./auth/AuthModal";
import CinemaExplorerLogo from "./CinemaExpLogo";
import UserProfileDropdown from "./UserProfileDropdown";
import { useAuthContext } from "../contexts/AuthContext";

export default function Header() {
    const { authData } = useAuthContext();
    const currentUser = authData.user;
    const isAuthenticated = authData.isAuthenticated;
    console.log("\n\n current user: ", currentUser, "\n\ngotchaa");

    const { darkMode, setDarkMode } = useThemeContext();
    // const { movieData, showCartModal, setShowCartModal } = useMovieContext();
    const [showSignUp, setShowSignUp] = useState(false);

    return (
        <>
            <header className="fixed w-full dark:bg-body bg-white shadow-lg z-50">
                <nav className="container flex items-center justify-between space-x-10 py-6">
                    <a href="/">
                        {/* <img src={MainLogo} width="139" height="26" alt="logo" /> */}
                        <CinemaExplorerLogo />
                    </a>

                    <ul className="flex items-center space-x-5">
                        <li>
                            <a className="bg-primary/20 dark:bg-primary/[7%] rounded-lg backdrop-blur-[2px] p-1 inline-block" href="#">
                                <img src={RingIcon} width="24" height="24" alt="Ring" />
                            </a>
                        </li>
                        <li>
                            <a
                                className="bg-primary/20 dark:bg-primary/[7%] rounded-lg backdrop-blur-[2px] p-1 inline-block"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setDarkMode(!darkMode);
                                }}
                            >
                                <img src={darkMode ? SunIcon : MoonIcon} width="24" height="24" alt="Theme Toggle" />
                            </a>
                        </li>
                        {/* <li>
                            <a
                                className="bg-primary/20 dark:bg-primary/[7%] rounded-lg backdrop-blur-[2px] p-1 inline-block relative"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowCartModal(!showCartModal);
                                }}
                            >
                                <img src={CartIcon} width="24" height="24" alt="Cart" />
                                {movieData.cartItems.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-primary text-[#171923] rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                        {movieData.cartItems.length}
                                    </span>
                                )}
                            </a>
                        </li> */}
                        { 
                            isAuthenticated ? (
                                <li>
                                    <UserProfileDropdown user={currentUser} />
                                </li> 
                            ) : (
                                <li>
                                    <Link
                                        to="/signin"
                                        className="bg-primary rounded-lg flex items-center justify-center py-2 px-5 text-[#171923] font-semibold text-sm flex-auto"
                                    >
                                        Sign In
                                    </Link>
                                </li>
                            )
                        }
                         
                    </ul>
                </nav>
            </header>

            {/* Cart Modal */}
            {/* {showCartModal && <MovieCartModal />} */}

            {/* Sign Up Modal */}
            <AuthModal isOpen={showSignUp} onClose={() => setShowSignUp(false)} />
        </>
    );
}
