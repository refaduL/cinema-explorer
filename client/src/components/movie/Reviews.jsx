import { HiStar } from "react-icons/hi2";
import tagIcon from "../../assets/icons/tag.svg";
import { useState } from "react";

export default function UpdateReview({ allreview }) {
    const [reviews, setReviews] = useState([
        {
            id: 1,
            user: "John Doe",
            rating: 5,
            comment: "This review may contain spoilers. I can handle the truth.",
            date: "2024-11-20",
        },
        {
            id: 2,
            user: "Jane Smith",
            rating: 4.5,
            comment: "it seems i share the same diet as a (fictional) psychopath",
            date: "2024-11-18",
        },
    ]);
    const [newReview, setNewReview] = useState({ user: "", rating: "", comment: "" });

    const handleAddReview = (e) => {
        e.preventDefault();
        if (newReview.user && newReview.rating && newReview.comment) {
            setReviews([
                ...reviews,
                {
                    id: reviews.length + 1,
                    ...newReview,
                    date: new Date().toISOString().split("T")[0],
                },
            ]);
            setNewReview({ user: "", rating: "", comment: "" });
        }
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold dark:text-white">User Reviews</h3>

            {/* Review List */}
            <div className="space-y-4">
                {allreview.map((review) => (
                    <div
                        key={review.review_id}
                        className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-[#1F2029] shadow-sm"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{review.name}</h4>
                                <span className="text-xs text-g ray-500">{review.date}</span>
                            </div>
                            <div className="flex items-center">
                                <HiStar size={16} className="text-yellow-500 mr-1" />
                                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{review.rating}/5</span>
                            </div>
                        </div>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{review.review}</p>
                    </div>
                ))}
            </div>

            {/* Add New Review Form */}
            <form onSubmit={handleAddReview} className="space-y-4 bg-gray-50 dark:bg-[#2B2C37] p-4 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold dark:text-gray-200">Add Your Review</h4>
                <div className="space-y-2">
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={newReview.user}
                        onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-[#1F2029] dark:text-gray-200"
                        required
                    />
                    <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        placeholder="Rating (0-5)"
                        value={newReview.rating}
                        onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-[#1F2029] dark:text-gray-200"
                        required
                    />
                    <textarea
                        placeholder="Write your review"
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-[#1F2029] dark:text-gray-200"
                        rows={3}
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-dark"
                >
                    Submit Review
                </button>
            </form>
        </div>
    );
}


