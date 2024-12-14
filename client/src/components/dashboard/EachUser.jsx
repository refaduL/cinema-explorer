export default function EachUser({ user }) {
    return (
        <tr key={user.id} className="border-t dark:border-gray-700">
            <td className="px-4 py-2">{user.name}</td>
            <td className="px-4 py-2">{user.email}</td>
            <td className="px-4 py-2">{user.role}</td>
            <td className="px-4 py-2">
                <button
                    className="text-sm text-primary hover:underline"
                    onClick={() => console.log(`View ${user.name}`)}
                >
                    View
                </button>
            </td>
        </tr>
    );
}