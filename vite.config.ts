/** @type {import("vite").UserConfig} */

import { Logger, createLogger, defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { version, repository, author } from "./package.json";

const path_resolver = (...vars: string[]) => path.join(path.resolve(), ...vars);

const dirs = {
    public: path_resolver("public/"),
    root: path_resolver("views/"),
    out: path_resolver("dist/"),
    src: {
        base: path_resolver("src/"),
        assets: path_resolver("src", "assets/"),
        components: path_resolver("src", "components/"),
        shadComponents: path_resolver("src", "components", "ui/"),
        pages: path_resolver("src", "pages/"),
        lib: path_resolver("src", "lib/"),
    },
};

const logger: Logger = createLogger("info", {
    prefix: "[VITE:LOGS:INFO]",
    allowClearScreen: true,
});

export default defineConfig({
    base: "/geo-vis",
    esbuild: {
        include: ["src/**/*.{ts,tsx}", "pages/**/*.{ts,tsx}"],
        loader: "tsx",
    },
    customLogger: logger,
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                ".ts": "tsx",
            },
        },
    },
    css: {
        devSourcemap: true,
    },
    define: {
        __my_consts__: JSON.stringify({
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
    root: dirs.root,
    resolve: {
        alias: {
            "?/": dirs.src.base,
            "#/": dirs.src.assets,
            "@/": dirs.src.components,
            "$/": dirs.src.shadComponents,
            "%/": dirs.src.lib,
            "&/": dirs.src.pages,
        },
    },
    publicDir: dirs.public,
    build: {
        outDir: dirs.out,
        sourcemap: true,
        manifest: true,
        rollupOptions: {
            input: {
                main: path_resolver("views", "index.html"),
                "404": path_resolver("views", "404.html"),
                linear: path_resolver("views", "linear.html"),
                // fill: path_resolver("pages", "fill", "index.html"),
                // branching: path_resolver("pages", "branching.", "indexhtml"),
                // attractor: path_resolver("pages", "attractor", "index.html"),
                // "3-d": path_resolver("pages", "3-d", "index.html"),
                // sets: path_resolver("pages", "sets", "index.html"),
                // misc: path_resolver("pages", "misc", "index.html"),
                // sandbox: path_resolver("pages", "sandbox", "index.html"),
            },
        },
    },
    appType: "mpa",
});
