import { HiCalendarDays, HiFire, HiMiniClock, HiMiniHeart, HiOutlineFolderPlus, HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { FaFirefoxBrowser } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { Link } from "react-router-dom";
import { useMovieContext } from "../../contexts/MovieContext";
import MovieSearch from "./MovieSearch";

export default function MovieSidebar() {
    const { movieFilter, setMovieFilter } = useMovieContext();

    return (
        <aside>
            <ul className="space-y-2">
                <li className="mb-5">
                    <MovieSearch />
                </li>
                <li>
                    <a
                        className={`flex items-center space-x-2 px-5 py-3 rounded-lg${movieFilter === "allMovies" && " active-filter"}`}
                        href="#"
                        onClick={(e) => {
                            e.preventDefault;
                            setMovieFilter("allMovies");
                        }}
                    >
                        <HiOutlineSquare3Stack3D size={18} />
                        <span>All Movies</span>
                    </a>
                </li>
                <li>
                <Link
                        to="/browseby"
                        className={`flex items-center space-x-2 px-5 py-3 rounded-lg transition-colors 
                        ${window.location.pathname === "/browseby" ? "bg-primary text-gray-900 font-semibold" : ""}`}
                    >
                        <FaFirefoxBrowser size={18} />
                        <span>Browse By</span>
                </Link>
                </li>
                <li>
                    <a
                        className={`flex items-center space-x-2 px-5 py-3 rounded-lg${movieFilter === "trending" && " active-filter"}`}
                        href="#"
                        onClick={(e) => {
                            e.preventDefault;
                            setMovieFilter("trending");
                        }}
                    >
                        <HiFire size={18} />
                        <span>Trending</span>
                    </a>
                </li>
                <li>
                    <a
                        className={`flex items-center space-x-2 px-5 py-3 rounded-lg${movieFilter === "newReleases" && " active-filter"}`}
                        href="#"
                        onClick={(e) => {
                            e.preventDefault;
                            setMovieFilter("newReleases");
                        }}
                    >
                        <HiOutlineFolderPlus size={18} />
                        <span>New Releases</span>
                    </a>
                </li>
                <li>
                    <a
                        className={`flex items-center space-x-2 px-5 py-3 rounded-lg${movieFilter === "comingSoon" && " active-filter"}`}
                        href="#"
                        onClick={(e) => {
                            e.preventDefault;
                            setMovieFilter("comingSoon");
                        }}
                    >
                        <HiCalendarDays size={18} />
                        <span>Coming Soon</span>
                    </a>
                </li>
                <li>
                    <a
                        className={`flex items-center space-x-2 px-5 py-3 rounded-lg${movieFilter === "favourites" && " active-filter"}`}
                        href="#"
                        onClick={(e) => {
                            e.preventDefault;
                            setMovieFilter("favourites");
                        }}
                    >
                        <HiMiniHeart size={18} />
                        <span>Favourites</span>
                    </a>
                </li>
                <li>
                    <a
                        className={`flex items-center space-x-2 px-5 py-3 rounded-lg${movieFilter === "watchLater" && " active-filter"}`}
                        href="#"
                        onClick={(e) => {
                            e.preventDefault;
                            setMovieFilter("watchLater");
                        }}
                    >
                        <HiMiniClock size={18} />
                        <span>Watch Later</span>
                    </a>
                </li>
                <li>
                    {/* Link to Admin Dashboard */}
                    <Link
                        to="/dashboard"
                        className="flex items-center space-x-2 px-5 py-3 rounded-lg hover:bg-primary/20 dark:hover:bg-primary/[7%] transition-colors"
                    >
                        <MdAdminPanelSettings size={18} />
                        <span>Dashboard</span>
                    </Link>
                </li>
            </ul>
        </aside>
    );
}
