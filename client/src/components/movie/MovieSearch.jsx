import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useMovieContext } from "../../contexts/MovieContext";

export default function MovieSearch() {
    const { seachKeyword, setSeachKeyword } = useMovieContext();

    return (
        <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <HiOutlineMagnifyingGlass />
            </div>
            <input
                type="search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary focus:border-primary focus:outline-none dark:bg-dark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                placeholder="Search Movies..."
                value={seachKeyword}
                onChange={(e) => {
                    setSeachKeyword(e.target.value);
                }}
            />
        </div>
    );
}
