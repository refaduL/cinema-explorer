import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useThemeContext() {
    return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(true);

    return (
        <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
            <div className={`bg-white font-[Sora] text-dark w-full min-h-screen flex flex-col ${darkMode ? "dark" : ""}`}>{children}</div>
        </ThemeContext.Provider>
    );
}
