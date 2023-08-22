/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "error.vue",
        "./nuxt.config.{js,ts}",
        "./node_modules/tw-elements/dist/js/**/*.{js,ts}"
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                Roboto: ['Roboto', 'sans-serif']
            },
            colors: {
                primary: "#0a0a00",
                secondary: "#f57e16"
            }
        },
    },
    plugins: [process.client ? require("tw-elements/dist/plugin.cjs") : '']
}