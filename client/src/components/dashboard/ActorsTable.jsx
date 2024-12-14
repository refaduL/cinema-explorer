import EachActors from "./EachActor";

export default function ActorsTable({ actors, onEdit, onDelete }) { 
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
                {actors.map((actor) => (
                    <EachActors key={actor.actor_id} actor={actor} onEdit={onEdit} onDelete={onDelete}/>
                ))}
            </tbody>
        </table>
    );
}
