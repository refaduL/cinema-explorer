import { useState, useEffect } from "react";
import { FaFileUpload } from "react-icons/fa";

export default function AddMovieModal({ onClose, movie = null, onSubmit }) {
    const [formData, setFormData] = useState({
        title: "",
        genres: "",
        actors: "",
        directors: "",
        release_date: "",
        duration: "",
        description: "",
        poster: null,
        isUpcoming: false,
        isNewRelease: false,
        isTrending: false,
    });

    // Populate form data if movie prop is provided (for editing)
    useEffect(() => {
        if (movie) {
            setFormData({
                title: movie.title || "",
                genres: movie.genres || "",
                actors: movie.actors || "",
                directors: movie.directors || "",
                release_date: movie.release_date || "",
                duration: movie.duration || "",
                description: movie.description || "",
                poster: movie.poster || "", 
                isNewRelease: movie.isNewRelease || false,
                isUpcoming: movie.isUpcoming || false,
                isTrending: movie.isTrending || false,
            });
        }
    }, [movie]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({
            ...prev,
            poster: file,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
            {/* Clickable Overlay */}
            <div
                className="absolute inset-0"
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
            ></div>

            {/* Modal Content */}
            <div className="relative w-[95%] max-w-2xl bg-white dark:bg-[#1F2029] rounded-lg shadow-lg">
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:text-base btn-hover-transparent"
                    onClick={onClose}
                >
                    &times;
                </button>

                <div className="p-6 max-h-[80vh] overflow-y-auto scrollbar-hidden">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                        {movie ? "Edit Movie" : "Add New Movie"}
                    </h2>
                    <form onSubmit={handleSubmit}>
                        {/* Title */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Movie Title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 dark:bg-[#2B2C37] dark:text-gray-200"
                                required
                            />
                        </div>

                        {/* Genres */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Genres (Comma-separated)
                            </label>
                            <input
                                type="text"
                                name="genres"
                                placeholder="Action, Drama"
                                value={formData.genres}
                                onChange={handleChange}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 dark:bg-[#2B2C37] dark:text-gray-200"
                                required
                            />
                        </div>

                        {/* Actors */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Actors (Comma-separated)
                            </label>
                            <input
                                type="text"
                                name="actors"
                                placeholder="Actor 1, Actor 2"
                                value={formData.actors}
                                onChange={handleChange}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 dark:bg-[#2B2C37] dark:text-gray-200"
                                required
                            />
                        </div>

                        {/* Directors */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Directors
                            </label>
                            <input
                                type="text"
                                name="directors"
                                placeholder="Director Name"
                                value={formData.directors}
                                onChange={handleChange}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 dark:bg-[#2B2C37] dark:text-gray-200"
                                required
                            />
                        </div>

                        {/* Release Year */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Release Year
                            </label>
                            <input
                                type="date"
                                name="release_date"
                                placeholder="YYYY-MM-DD"
                                value={formData.release_date}
                                onChange={handleChange}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 dark:bg-[#2B2C37] dark:text-gray-200"
                                required
                            />
                        </div>

                        {/* Duration */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Duration (Minutes)
                            </label>
                            <input
                                type="number"
                                name="duration"
                                placeholder="120"
                                value={formData.duration}
                                onChange={handleChange}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 dark:bg-[#2B2C37] dark:text-gray-200"
                                required
                            />
                        </div>

                        {/* description */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                description
                            </label>
                            <textarea
                                name="description"
                                placeholder="Enter the movie description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 dark:bg-[#2B2C37] dark:text-gray-200"
                                rows="3"
                                required
                            ></textarea>
                        </div>

                        {/* Poster_url Upload */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Poster
                            </label>
                            <div className="flex items-center gap-4">
                                {/* Hidden Input */}
                                <input
                                    type="file"
                                    name="poster_url"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="posterUpload"
                                />
                                
                                {/* Styled Upload Button */}
                                <label
                                    htmlFor="posterUpload"
                                    className="cursor-pointer px-5 py-3 bg-primary text-white rounded-lg flex items-center gap-2 btn-hover"
                                >
                                    <FaFileUpload />
                                    <span>Upload Poster</span>
                                </label>

                                {/* Display Selected File Name */}
                                {formData.poster_url && (
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate max-w-[200px]">
                                        {formData.poster_url.name}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Is Upcoming */}
                        <div className="mb-4">
                            <label className="flex items-center gap-3">
                                <div className="relative inline-block w-12 h-6 select-none">
                                    {/* Checkbox Input */}
                                    <input
                                        type="checkbox"
                                        name="isUpcoming"
                                        checked={formData.isUpcoming}
                                        onChange={handleChange}
                                        className="absolute opacity-0 w-0 h-0 peer"
                                    />
                                    {/* Toggle Track */}
                                    <div className="peer-checked:bg-primary peer-checked:border-primary dark:peer-checked:bg-primary-dark dark:bg-gray-600 bg-gray-300 rounded-full h-full w-full transition-colors duration-300"></div>
                                    {/* Toggle Knob */}
                                    <div className="absolute top-1/2 left-1 h-4 w-4 bg-white rounded-full border-2 border-gray-300 transform -translate-y-1/2 peer-checked:translate-x-6 peer-checked:border-primary transition-all duration-300"></div>
                                </div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Coming Soon
                                </span>
                            </label>
                        </div>
                        
                        {/* Is New Release */}
                        <div className="mb-4">
                            <label className="flex items-center gap-3">
                                <div className="relative inline-block w-12 h-6 select-none">
                                    {/* Checkbox Input */}
                                    <input
                                        type="checkbox"
                                        name="isNewRelease"
                                        checked={formData.isNewRelease}
                                        onChange={handleChange}
                                        className="absolute opacity-0 w-0 h-0 peer"
                                    />
                                    {/* Toggle Track */}
                                    <div className="peer-checked:bg-primary peer-checked:border-primary dark:peer-checked:bg-primary-dark dark:bg-gray-600 bg-gray-300 rounded-full h-full w-full transition-colors duration-300"></div>
                                    {/* Toggle Knob */}
                                    <div className="absolute top-1/2 left-1 h-4 w-4 bg-white rounded-full border-2 border-gray-300 transform -translate-y-1/2 peer-checked:translate-x-6 peer-checked:border-primary transition-all duration-300"></div>
                                </div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    New Release
                                </span>
                            </label>
                        </div>

                        {/* Is Trending */}
                        <div className="mb-4">
                            <label className="flex items-center gap-3">
                                <div className="relative inline-block w-12 h-6 select-none">
                                    {/* Checkbox Input */}
                                    <input
                                        type="checkbox"
                                        name="isTrending"
                                        checked={formData.isTrending}
                                        onChange={handleChange}
                                        className="absolute opacity-0 w-0 h-0 peer"
                                    />
                                    {/* Toggle Track */}
                                    <div className="peer-checked:bg-primary peer-checked:border-primary dark:peer-checked:bg-primary-dark dark:bg-gray-600 bg-gray-300 rounded-full h-full w-full transition-colors duration-300"></div>
                                    {/* Toggle Knob */}
                                    <div className="absolute top-1/2 left-1 h-4 w-4 bg-white rounded-full border-2 border-gray-300 transform -translate-y-1/2 peer-checked:translate-x-6 peer-checked:border-primary transition-all duration-300"></div>
                                </div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Trending
                                </span>
                            </label>
                        </div>

                        


                        {/* Buttons */}
                        <div className="grid lg:grid-cols-2 gap-2">
                            <button
                                className="border border-[#74766F] rounded-lg py-2 px-5 flex items-center justify-center gap-2 text-[#6F6F6F] dark:text-gray-200 font-semibold text-sm btn-hover-transparent"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="py-2 px-5 bg-primary text-white rounded-lg flex items-center justify-center gap-2 hover:bg-primary-dark transition-all btn-hover"
                            >
                                Add Movie
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
