module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    theme: {
        container: {
            center: true,
        },
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [require("@tailwindcss/aspect-ratio")],
};
