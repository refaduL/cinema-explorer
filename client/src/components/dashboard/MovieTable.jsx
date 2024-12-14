import { useMovieContext } from "../../contexts/MovieContext";
import EachMovie from "./EachMovie";

export default function MovieTable({ onEdit, onDelete }) {

    const { movieData } = useMovieContext();

    return (
        <table className="w-full text-left">
            <thead>
                <tr className="bg-primary/20">
                    <th className="px-4 py-2">Title</th>
                    <th className="px-4 py-2">Genre</th>
                    <th className="px-4 py-2">Release Year</th>
                    <th className="px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {movieData.movies.map((movie) => (
                    <EachMovie key={movie.movie_id} movie={movie} onEdit={onEdit} onDelete={onDelete} />
                ))}
            </tbody>
        </table>
    );
}
