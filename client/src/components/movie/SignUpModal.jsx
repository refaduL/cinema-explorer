export default function SignUpModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-[#1F2029] rounded-lg shadow-lg p-6 w-full max-w-md relative">
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    onClick={onClose}
                >
                    &times;
                </button>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Sign Up</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-[#2B2C37] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-[#2B2C37] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 dark:bg-[#2B2C37] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-primary text-white font-semibold py-2 px-4 rounded-lg w-full hover:bg-primary-dark"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}
