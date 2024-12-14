import withMT from "@material-tailwind/react/utils/withMT";

/** @type {import('tailwindcss').Config} */
export default withMT({
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            container: {
                center: true,
                padding: "1.25rem",
            },
            colors: {
                primary: "#00D991",
                dark: "#171923",
                light: "#fff",
                body: "#1D1E28",
            },
            // added after something
            boxShadow: {
                glow: "0 0 5px 2px rgba(72,187,120,0.7)",
                logoglow: "0 0 5px 1px rgba(72,187,120,0.7)",
            },
            scale: {
                100: "1.00",
                102: "1.02",
                105: "1.05", // Slightly larger scaling
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                fadeOut: {
                    '0%': { opacity: '1', transform: 'scale(1)' },
                    '100%': { opacity: '0', transform: 'scale(0.9)' },
                },
                dropdown: {
                    "0%": { opacity: "0", transform: "translateY(-10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
            },
            animation: {
                fadeIn: 'fadeIn 300ms ease-out',
                fadeOut: 'fadeOut 300ms ease-out',
                dropdown: "dropdown 300ms ease-out",
            },
        },
    },
    plugins: [],
});

