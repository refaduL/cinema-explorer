import EachDirectors from "./EachDirectors";


export default function DirectorsTable({ directors, onEdit, onDelete }) {
    return (
        <table className="w-full text-left">
            <thead>
                <tr className="bg-primary/20">
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Birthdate</th>
                    <th className="px-4 py-2">Nationality</th>
                    <th className="px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {directors.map((director) => (
                    <EachDirectors key={director.director_id} director={director} onEdit={onEdit} onDelete={onDelete} />
                ))}
            </tbody>
        </table>
    );
}
