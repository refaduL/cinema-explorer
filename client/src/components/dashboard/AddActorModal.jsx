import { useEffect, useState } from "react";

export default function AddActorModal({ onClose, onSubmit, actor = {}, isUpdate = false }) {
    const [formData, setFormData] = useState({
        actor_name: "",
        birthdate: "",
        nationality: "",
    });

    useEffect(() => {
        if (isUpdate && actor) {
            setFormData({
                actor_name: actor.actor_name || "",
                birthdate: actor.birthdate || "",
                nationality: actor.nationality || "",
            });
        }
    }, [isUpdate, actor]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
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
                        {isUpdate ? "Update Actor" : "Add New Actor"}
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                name="actor_name"
                                placeholder="Actor Name"
                                value={formData.actor_name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 dark:bg-[#2B2C37] dark:text-gray-200"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                name="birthdate"
                                value={formData.birthdate}
                                onChange={handleChange}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 dark:bg-[#2B2C37] dark:text-gray-200"
                            />
                        </div>

                        {/* nationality */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                nationality
                            </label>
                            <input
                                type="text"
                                name="nationality"
                                placeholder="actor's nationality"
                                value={formData.nationality}
                                onChange={handleChange}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 dark:bg-[#2B2C37] dark:text-gray-200"
                                required
                            />
                        </div>

                        {/* Buttons */}
                        <div className="grid lg:grid-cols-2 gap-2">
                            <button
                                className="border border-[#74766F] rounded-lg py-2 px-5 flex items-center justify-center gap-2 text-[#6F6F6F] dark:text-gray-200 font-semibold text-sm btn-hover-transparent"
                                onClick={onClose}
                                type="button"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="py-2 px-5 bg-primary text-white rounded-lg flex items-center justify-center gap-2 hover:bg-primary-dark transition-all btn-hover"
                            >
                                {isUpdate ? "Update Actor" : "Add Actor"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
