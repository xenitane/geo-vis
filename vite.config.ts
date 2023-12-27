/** @type {import("vite").UserConfig} */

import { Logger, createLogger, defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import million from "million/compiler";

const root = resolve(process.cwd(), "src");
const logger: Logger = createLogger("info", {
	prefix: "[vite:logs]",
	allowClearScreen: true,
});

// https://vitejs.dev/config/
export default defineConfig({
	base: "/fractals/",
	esbuild: {
		include: "src/**/*.{ts,tsx,js,jsx}",
		loader: "tsx",
	},
	customLogger: logger,
	optimizeDeps: {
		esbuildOptions: {
			loader: {
				".js": "jsx",
				".ts": "tsx",
			},
		},
	},
	css: {
		devSourcemap: true,
		transformer: "postcss",
	},
	define: {
		"process.env.__APP_VERSION__": JSON.stringify((await import("./package.json")).version),
		"process.env.themeKey": JSON.stringify("fractals-theme"),
	},
	plugins: [
		react(),
		million.vite({
			auto: false,
			hmr: true,
			mode: "react",
			optimize: true,
		}),
	],
	preview: {
		port: 4173,
		host: "0.0.0.0",
	},
	server: {
		port: 5173,
		host: "0.0.0.0",
		hmr: true,
	},
	root: root,
	resolve: {
		alias: { "@/": `${root}/` },
	},
	publicDir: resolve(process.cwd(), "public"),
	build: {
		outDir: resolve(process.cwd(), "dist"),
		sourcemap: true,
		minify: "esbuild",
		target: "modules",
		assetsInlineLimit: 4096,
		cssCodeSplit: true,
		cssMinify: "esbuild",
		manifest: true,
		emptyOutDir: true,
		copyPublicDir: true,
		reportCompressedSize: true,
	},
});
