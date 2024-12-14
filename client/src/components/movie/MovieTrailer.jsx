
export default function MovieTrailer({ movie, onClose }) {
    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
            {/* Clickable Overlay: Clicking Outside of the Modal */}
            <div
                className="absolute inset-0"
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
            ></div>

            {/* Modal Content */}
            <div className="relative w-[90%] max-w-4xl bg-white dark:bg-[#1F2029] rounded-lg shadow-lg overflow-hidden z-10">
                {/* Close Button */}
                <button
                    className="absolute top-3 right-3 p-1 text-3xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-grey-200 z-20"
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                >
                    &times;
                </button>
                <button
                    className="absolute bottom-3 right-3 border border-[#74766F] rounded-lg py-2 px-5 flex items-center justify-center gap-2 text-[#6F6F6F] dark:text-gray-200 font-semibold text-sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                >
                    Cancel
                </button>

                {/* Video Trailer */}
                <div className="w-full h-0 pb-[56.25%] relative">
                    {/* The 56.25% padding ensures the 16:9 aspect ratio */}
                    <iframe
                        src={movie.trailer_url}
                        title={`${movie.title} Trailer`}
                        className="absolute top-0 left-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>

                {/* Movie Title */}
                <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {console.log(movie.title)}
                        {movie.title} - Trailer
                    </h2>
                </div>
            </div>
        </div>
    );
}
