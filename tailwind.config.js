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
                menu: ["13px"]
            },
            width: {
                "160": "40rem",
                "144": "36rem"
            },
            margin:{
                "144": "38rem"
            },
            colors:{
                "side-indigo": "rgb(130, 142, 241)"
            },
            // typography: (theme) => ({
            //     DEFAULT: {
            //         css: {
            //             color: theme('colors.gray.700'),
            //         },
            //     },
            //     invert:{
            //         css:{
            //             color: theme('colors.gray.200'),
            //         }
            //     },
            // })
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
