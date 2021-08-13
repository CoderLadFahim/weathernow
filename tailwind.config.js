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
		scale: {
			175: '2',
			200: '2.5',
			...defaultTheme.scale,
		},
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
