export default function Header() {
    return (
        <footer className="py-6 md:py-8 mt-auto">
            <div className="container mx-auto">
                <p className="text-center text-sm text-black/30 dark:text-[#EEEEEE]/60">
                    Copyright ©{new Date().getFullYear()} | All rights reserved by{" "}
                    <a href="http://localhost:5173/" target="_blank" rel="noreferrer" className="text-primary">
                        CinemaExplorer
                    </a>
                </p>
            </div>
        </footer>
    );
}
