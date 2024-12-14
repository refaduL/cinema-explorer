import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthModal from "./components/auth/AuthModal";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MovieContainer from "./components/MovieContainer";
import AuthProvider from "./contexts/AuthContext";
import MovieProvider from "./contexts/MovieContext";
import ThemeProvider from "./contexts/ThemeContext";
import BrowseBy from "./pages/BrowseBy";


function App() {
    return (
        <>
            <ThemeProvider>
                <AuthProvider>
                <MovieProvider>
                    <Router>
                        <Header />
                        <Routes>
                            <Route path="/" element={<MovieContainer />} />
                            <Route path="/signup" element={<AuthModal isOpen={true} />} />
                            <Route path="/signin" element={<AuthModal isOpen={true} isSignUp={false}/>}/>
                            <Route path="/dashboard" element={<AdminDashboard />} />
                            <Route path="/browseby" element={<BrowseBy />} />
                        </Routes>
                    </Router>
                </MovieProvider>
                </AuthProvider>
                <Footer />
                <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick draggable theme="dark" />
            </ThemeProvider>
        </>
    );
}

export default App;
