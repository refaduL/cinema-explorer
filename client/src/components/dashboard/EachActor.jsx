export default function EachActors({ actor, onEdit, onDelete }) {
    return (
        <tr className="border-t dark:border-gray-700">
            <td className="px-4 py-2">{actor.actor_name}</td>
            <td className="px-4 py-2">{actor.birthdate}</td>
            <td className="px-4 py-2">{actor.nationality}</td>
            <td className="px-4 py-2">
                <button
                    className="text-lg text-primary hover:underline"
                    onClick={() => onEdit(actor)}
                >
                    Edit
                </button>
                {" | "}
                <button
                    className="text-lg text-red-500 hover:underline"
                    onClick={() => onDelete(actor.actor_id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
}