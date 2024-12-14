import EachUser from "./EachUser";

export default function UsersTable({ users }) {
    // const users = [
    //     { id: 1, name: "John Doe", email: "john@example.com", username: "johndoe" },
    //     { id: 2, name: "Jane Smith", email: "jane@example.com", username: "janesmith" },
    // ]; // Replace with dynamic user data
    
    return (
        <table className="w-full text-left">
            <thead>
                <tr className="bg-primary/20">
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Role</th>
                    <th className="px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <EachUser key={user.user_id} user={user} />
                ))}
            </tbody>
        </table>
    );
}
