/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'kawaii-pink': '#ffc3d1',
                'kawaii-purple': '#dcc3f6',
                'kawaii-mint': '#B2F2BB',
                'retro-blue': '#A2D2FF',      
            },
        },
    },
    plugins: [],
}