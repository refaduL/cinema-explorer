import { useState } from "react";
import { TbDatabaseSearch } from "react-icons/tb";
import MovieCard from "../components/movie/MovieCard";
import MovieModal from "../components/movie/MovieModal";
import MovieSidebar from "../components/movie/MovieSidebar";
import { useMovieContext } from "../contexts/MovieContext";

export default function BrowseBy() {
    const { movieData, seachKeyword, movieFilter, setMovieFilter } = useMovieContext();

    // Local state for filtering
    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedRating, setSelectedRating] = useState("");
    const [selectedYear, setSelectedYear] = useState("");

    // Genres for dropdown
    const genres = [...new Set(movieData.movies.map((movie) => movie.genre.split(", ").flat()).flat())];
    const years = ["2020s", "2010s", "2000s", "1990s", "1980s"]; // Decades

    // Filter movies by search and dropdowns
    const searchMovies = movieData.movies.filter((movie) => {
        return movie.title.toLowerCase().includes(seachKeyword.toLowerCase());
    });

    const moviesWithFilter = searchMovies.filter((movie) => {
        if (movieFilter === "trending") return movie.isTrending;
        if (movieFilter === "newReleases") return movie.isNewRelease;
        if (movieFilter === "comingSoon") return movie.isUpcoming;
        if (movieFilter === "favourites") return movie.isFavorite;
        if (movieFilter === "watchLater") return movie.isWatchLater;

        // Genre Filter
        if (selectedGenre && !movie.genre.toLowerCase().includes(selectedGenre.toLowerCase())) return false;

        // Rating Filter
        if (selectedRating === "highest" && movie.rating < 4) return false;
        if (selectedRating === "lowest" && movie.rating > 2) return false;

        // Year Filter
        if (selectedYear && !movie.release_year.toString().startsWith(selectedYear.slice(0, 3))) return false;

        return true;
    });

    return (
        <main className="pt-32 mb-8">
            <div className="container grid lg:grid-cols-[218px_1fr] gap-[3.5rem]">
                {/* Sticky Sidebar */}
                <div className="lg:sticky top-32 self-start">
                    <MovieSidebar />
                </div>

                {/* Main Content */}
                <div className="content">
                    {/* Filtering Bar */}
                    <div className="sticky top-0 z-10 bg-gray-100 dark:bg-[#2B2C37] p-4 rounded-lg shadow-md mb-6">
                        <div className="flex flex-wrap items-center gap-4">
                            <span className="font-medium text-gray-700 dark:text-gray-300">Browse By:</span>

                            {/* Genres Dropdown */}
                            <select
                                className="rounded-md py-2 px-4 bg-white dark:bg-[#1F2029] border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 focus:outline-none"
                                value={selectedGenre}
                                onChange={(e) => setSelectedGenre(e.target.value)}
                            >
                                <option value="">All Genres</option>
                                {genres.map((genre) => (
                                    <option key={genre} value={genre}>
                                        {genre}
                                    </option>
                                ))}
                            </select>

                            {/* Rating Dropdown */}
                            <select
                                className="rounded-md py-2 px-4 bg-white dark:bg-[#1F2029] border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 focus:outline-none"
                                value={selectedRating}
                                onChange={(e) => setSelectedRating(e.target.value)}
                            >
                                <option value="">Rating</option>
                                <option value="highest">Highest First</option>
                                <option value="lowest">Lowest First</option>
                            </select>

                            {/* Year Dropdown */}
                            <select
                                className="rounded-md py-2 px-4 bg-white dark:bg-[#1F2029] border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 focus:outline-none"
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                            >
                                <option value="">Year</option>
                                {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {moviesWithFilter.length > 0 ? (
                        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-7">
                            {moviesWithFilter.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                    ) : (
                        <p className="bg-primary text-dark py-3 px-5 rounded-md flex gap-2 items-center">
                            <TbDatabaseSearch size={20} />
                            No Movie Found
                        </p>
                    )}

                    {movieData.showMovieModal && <MovieModal />}
                </div>
            </div>
        </main>
    );
}
