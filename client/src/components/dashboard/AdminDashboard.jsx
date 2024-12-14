import { useEffect, useState } from "react";
import { FaChartBar, FaFilm, FaPlus, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../../api";
import { addActor, addDirector, addMovie, deleteActor, deleteDirector, deleteMovie, fetchActors, fetchDirectors, fetchMovies, fetchUsers, updateActor, updateDirector } from "../../api/movie";
import ActorsTable from "./ActorsTable";
import AddActorModal from "./AddActorModal";
import AddMovieModal from "./AddMovieModal";
import AnalyticsOverview from "./AnalyticsOverview";
import DirectorsTable from "./DirectorsTable";
import MovieTable from "./MovieTable";
import UsersTable from "./UsersTable";
import AddDirectorModal from "./AddDirectorModal";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("movies");

    const [users, setUsers] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [actors, setActors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [showAddMovieModal, setShowAddMovieModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const [showAddActorModal, setShowAddActorModal] = useState(false);
    const [selectedActor, setSelectedActor] = useState(null);

    const [showAddDirectorModal, setShowAddDirectorModal] = useState(false);
    const [selectedDirector, setSelectedDirector] = useState(null);


    const handleAddMovie = () => {
        setSelectedMovie(null);
        setShowAddMovieModal(true);
    };
    const handleEditMovie = (movie) => {
        setSelectedMovie(movie);
        setShowAddMovieModal(true);
    };
    const handleDeleteMovie = async (movieId) => {
        if (window.confirm("Are you sure you want to delete this movie?")) {
          try {
            const response = await deleteMovie(movieId);
            console.log("Delete response:", response);
      
            // fetchMovies(); 
          } catch (error) {
            console.error("Failed to delete the movie:", error);
          }
        }
    };

    const handleSubmitMovie = async (formData) => {
        if (selectedMovie) {
            // Update existing movie
            await api.put(`/api/movies/${selectedMovie.movie_id}`, formData);
            toast.success("Movie updated successfully!");
        } else {
            // Add new movie
            await addMovie(formData, formData.poster);
            toast.success("Movie added successfully!");
            setDirectors()
        }
        setShowAddMovieModal(false);
        const updatedMovies = await fetchMovies();
        setActors(updatedMovies.data.payload);
    };


    const handleAddActor = () => {
        setSelectedActor(null);
        setShowAddActorModal(true);
    };
    const handleEditActor = (actor) => {
        console.log("Updating actor:", actor);
        setSelectedActor(actor);
        setShowAddActorModal(true);
    };
    const handleDeleteActor = async (actorId) => {
        await deleteActor(actorId);
        const updatedActors = await fetchActors();
        setActors(updatedActors.data.payload);       
    }
    const handleSubmitActor = async (formData) => {
        if (selectedActor) {
            // Update existing actor
            await updateActor(selectedActor.actor_id, formData);
            console.log("Actor updated successfully!");
        } else {
            // Add new actor
            await addActor(formData);
            console.log("Actor added successfully!");
        }
        setShowAddActorModal(false);
        const updatedActors = await fetchActors();
        setActors(updatedActors.data.payload);
    };

    const handleAddDirector = () => {
        setSelectedDirector(null);
        setShowAddDirectorModal(true);
    };
    const handleEditDirector = (director) => {
        console.log("Updatinggg director:", director);
        setSelectedDirector(director);
        setShowAddDirectorModal(true);
    };
    const handleDeleteDirector = async (directorId) => {
        await deleteDirector(directorId);
        const updatedDirectors = await fetchDirectors();
        setDirectors(updatedDirectors.data.payload);
    }
    const handleSubmitDirector = async (formData) => {
        if (selectedDirector) {
            // Update existing Director
            await updateDirector(selectedDirector.director_id, formData);
            console.log("Director updated successfully!");
        } else {
            // Add new Director
            await addDirector(formData);
            console.log("Director added successfully!");
        }
        setShowAddDirectorModal(false);
        const updatedDirectors = await fetchDirectors();
        setDirectors(updatedDirectors.data.payload);
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [usersRes, directorsRes, actorsRes] = await Promise.all([
                    fetchUsers(),
                    fetchDirectors(),
                    fetchActors(),
                ]);
                setUsers(usersRes.data.payload);
                setDirectors(directorsRes.data.payload);
                setActors(actorsRes.data.payload);
            } catch (error) {
                console.error("Error fetching admin data:", error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);


    return (
        <main className="pt-20 mb-8">
            <div className="min-h-screen bg-white dark:bg-body text-gray-800 dark:text-gray-200">
                {/* Sidebar */}
                <aside className="fixed top-0 left-0 h-full w-60 bg-primary dark:bg-primary/[7%] shadow-lg">
                    <div className="py-6 px-4">
                        <h1 className="pt-20 text-xl font-bold text-white">Admin Dashboard</h1>
                    </div>
                    <nav className="mt-8 space-y-4">
                        <button
                            className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === "movies"
                                ? "bg-primary-dark text-white"
                                : "text-gray-800 dark:text-gray-300 hover:bg-primary/20"
                                }`}
                            onClick={() => setActiveTab("movies")}
                        >
                            <FaFilm className="inline-block mr-2" /> Manage Movies
                        </button>
                        <button
                            className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === "users"
                                ? "bg-primary-dark text-white"
                                : "text-gray-800 dark:text-gray-300 hover:bg-primary/20"
                                }`}
                            onClick={() => setActiveTab("users")}
                        >
                            <FaUser className="inline-block mr-2" /> Manage Users
                        </button>
                        <button
                            className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === "actors"
                                ? "bg-primary-dark text-white"
                                : "text-gray-800 dark:text-gray-300 hover:bg-primary/20"
                                }`}
                            onClick={() => setActiveTab("actors")}
                        >
                            <FaUser className="inline-block mr-2" /> Manage Actors
                        </button>
                        <button
                            className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === "directors"
                                ? "bg-primary-dark text-white"
                                : "text-gray-800 dark:text-gray-300 hover:bg-primary/20"
                                }`}
                            onClick={() => setActiveTab("directors")}
                        >
                            <FaUser className="inline-block mr-2" /> Manage Directors
                        </button>
                        <button
                            className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === "analytics"
                                ? "bg-primary-dark text-white"
                                : "text-gray-800 dark:text-gray-300 hover:bg-primary/20"
                                }`}
                            onClick={() => setActiveTab("analytics")}
                        >
                            <FaChartBar className="inline-block mr-2" /> Analytics
                        </button>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="ml-60 p-6">
                    <header className="flex justify-between items-center pb-6 mx-6">
                        <h2 className="text-2xl font-semibold capitalize">
                            {activeTab === "movies" && "Manage Movies"}
                            {activeTab === "users" && "Manage Users"}
                            {activeTab === "actors" && "Manage Actors"}
                            {activeTab === "directors" && "Manage Directors"}
                            {activeTab === "analytics" && "Analytics Overview"}
                        </h2>
                    </header>

                    <div className="bg-gray-50 dark:bg-[#1F2029] p-6 pt-2 rounded-lg shadow-lg">
                        {activeTab === "movies" && <MovieTable onEdit={handleEditMovie} onDelete={handleDeleteMovie} />}
                        {activeTab === "users" && <UsersTable users={users} />}
                        {activeTab === "actors" && <ActorsTable actors={actors} onEdit={handleEditActor} onDelete={handleDeleteActor} />}
                        {activeTab === "directors" && <DirectorsTable directors={directors} onEdit={handleEditDirector} onDelete={handleDeleteDirector} />}
                        {activeTab === "analytics" && <AnalyticsOverview />}
                    </div>
                    {activeTab === "movies" && (
                        <button
                            className="fixed bottom-16 right-12 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg"
                            onClick={handleAddMovie}
                        >
                            <FaPlus /> Add Movie
                        </button>
                    )}
                    {activeTab === "actors" && (
                        <button
                            className="fixed bottom-16 right-12 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg"
                            onClick={handleAddActor}
                        >
                            <FaPlus /> Add Actors
                        </button>
                    )}
                    {activeTab === "directors" && (
                        <button
                            className="fixed bottom-16 right-12 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg"
                            onClick={handleAddDirector}
                        >
                            <FaPlus /> Add Directors
                        </button>
                    )}
                </main>

                {/* Add Movie Modal */}
                {showAddMovieModal && (
                    <AddMovieModal
                        movie={selectedMovie}
                        onSubmit={handleSubmitMovie}
                        onClose={() => setShowAddMovieModal(false)}
                    />
                )}

                {showAddActorModal && (
                    <AddActorModal
                        actor={selectedActor}
                        isUpdate={!!selectedActor}
                        onSubmit={handleSubmitActor}
                        onClose={() => setShowAddActorModal(false)}
                    />
                )}

                {showAddDirectorModal && (
                    <AddDirectorModal
                        director={selectedDirector}
                        isUpdate={!!selectedDirector}
                        onSubmit={handleSubmitDirector}
                        onClose={() => setShowAddDirectorModal(false)}
                        
                    />
                )}
            </div>
        </main>
    );
}
