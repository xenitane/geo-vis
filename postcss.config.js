/** @type {import('postcss-load-config').Config} */
import tailwindConfig from "./tailwind.config.js";
export default {
	plugins: {
		tailwindcss: {},
		autoprefixer: tailwindConfig,
	},
};
