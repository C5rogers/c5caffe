/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
    ],
    theme: {
        extend: {
            fontFamily: {
                Roboto: ['Roboto', 'sans-serif']
            },
            colors: {
                primary: "#0a0a0a",
                secondary: "#f57e16"
            }
        },
    },
    plugins: [],
}