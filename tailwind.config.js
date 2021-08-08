// tailwind.config.js
module.exports = {
	purge: ['./src/**/*.{js, css}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		container: {
			center: true,
		},
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
