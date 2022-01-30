const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    darkMode: 'class',
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        fontFamily: {
            sans: ['"Inter var"', ...defaultTheme.fontFamily.sans],
        },
        extend: {
            fontSize: {
                'md': ['.9rem', "1.25rem"],
            },
            width: {
                "160": "40rem"
            },

        },
    },
    plugins: [],
}
