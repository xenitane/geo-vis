/** @type {import("vite").UserConfig} */

import { Logger, createLogger, defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { version, repository, author } from "./package.json";

const rootDir = resolve(process.cwd(), "src");
const publicDir = resolve(process.cwd(), "public");
const outDir = resolve(process.cwd(), "dist");
const logger: Logger = createLogger("info", {
    prefix: "[vite:logs]",
    allowClearScreen: true,
});

export default defineConfig({
    base: "/geo-vis",
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
    },
    define: {
        "process.env": JSON.stringify({
            __THEME_KEY__: "gv-theme",
            __APP_VERSION__: version,
            __GIT_REPO__: repository.url,
            __USER_PROFILE__: author.url,
        }),
    },
    plugins: [react()],
    preview: {
        port: 4173,
        host: "0.0.0.0",
    },
    server: {
        port: 5173,
        host: "0.0.0.0",
        hmr: true,
    },
    root: rootDir,
    resolve: {
        alias: { "@/": `${rootDir}/` },
    },
    publicDir,
    build: {
        outDir,
        sourcemap: true,
        manifest: true,
    },
});
