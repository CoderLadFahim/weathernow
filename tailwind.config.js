// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	purge: ['./src/**/*.{js, css}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		container: {
			center: true,
		},
		screens: {
			xs: '414px',
			...defaultTheme.screens,
		},
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
