export default function EachMovie({ movie, onEdit, onDelete }) {
    return (
        <tr className="border-t dark:border-gray-700">
            <td className="px-4 py-2">{movie.title}</td>
            <td className="px-4 py-2">{movie.genres}</td>
            <td className="px-4 py-2">{movie.release_date}</td>
            <td className="px-4 py-2">
                <button
                    className="text-lg text-primary hover:underline"
                    onClick={() => onEdit(movie)}
                >
                    Edit
                </button>
                {" | "}
                <button
                    className="text-lg text-red-500 hover:underline"
                    onClick={() => onDelete(movie.movie_id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
}