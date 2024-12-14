export default function EachDirectors({ director, onEdit , onDelete }) {
    return (
        <tr className="border-t dark:border-gray-700">
            <td className="px-4 py-2">{director.director_name}</td>
            <td className="px-4 py-2">{director.birthdate}</td>
            <td className="px-4 py-2">{director.nationality}</td>
            <td className="px-4 py-2">
                <button
                    className="text-lg text-primary hover:underline"
                    onClick={() => onEdit(director)}
                >
                    Edit
                </button>
                {" | "}
                <button
                    className="text-lg text-red-500 hover:underline"
                    onClick={() => onDelete(director.director_id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
}