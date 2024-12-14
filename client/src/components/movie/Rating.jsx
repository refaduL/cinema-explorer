import { HiStar } from "react-icons/hi2";

export default function Rating({ value }) {
    const normalizedValue = Math.max(0, Math.min(value, 5));
    const numberOfStars = Math.ceil((normalizedValue / 10) * 10);

    return (
        <div className="flex items-center space-x-1 mb-5 text-primary">
            {Array.from({ length: numberOfStars }, (_, index) => (
                <HiStar key={index} size={14} />
            ))}
        </div>
    );
}
