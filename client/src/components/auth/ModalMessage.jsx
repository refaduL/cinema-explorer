
export default function ModalMessage({ message, isError, onClose, onBackToHome, onRetry, onSignIn, context }) {
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-[#1F2029] rounded-lg shadow-lg p-6 w-full max-w-md relative">
                <p className="text-center text-gray-700 dark:text-gray-300">{message}</p>
                <button
                    className="absolute top-1 right-1 text-2xl text-gray-500 dark:text-gray-400"
                    onClick={onClose}
                >
                    ✕
                </button>
                {isError ? (
                    <div className="grid lg:grid-cols-2 gap-2 mt-6">
                        <button onClick={onClose} className="btn-hover-transparent">Back to Home</button>
                        <button onClick={onRetry} className="btn-hover">Try Again</button>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-2 gap-2 mt-8 relative">
                        <button onClick={onBackToHome} className="btn-hover-transparent">Back to Home</button>
                        {context === "signup" ? (
                            <>
                            <button onClick={onSignIn} className="btn-hover">Sign In</button>
                            </>
                        ) : context === "signin" ? (
                            <>
                            <button onClick={onSignIn} className="btn-hover">Go to Dashboard</button>
                            
                            
                            </>
                        ) : null}
                    </div>
                )}
            </div>
        </div>
    );
}
