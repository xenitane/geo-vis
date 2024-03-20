/** @type {import("vite").UserConfig} */

import { Logger, createLogger, defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { version, repository, author } from "./package.json";

const path_resolver = (...vars: string[]) => path.join(path.resolve(), ...vars);

const dirs = {
    public: path_resolver("public/"),
    root: {
        base: path_resolver("src/"),
        assets: path_resolver("src", "assets/"),
        components: path_resolver("src", "components/"),
        shad: path_resolver("src", "components", "ui/"),
        content: path_resolver("src", "content/"),
        lib: path_resolver("src", "lib/"),
    },
    out: path_resolver("dist/"),
};

const logger: Logger = createLogger("info", {
    prefix: "[VITE:LOGS:INFO]",
    allowClearScreen: true,
});

export default defineConfig({
    base: "/geo-vis",
    esbuild: {
        include: ["src/**/*.{ts,tsx}"],
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
    root: dirs.root.base,
    publicDir: dirs.public,
    build: {
        outDir: dirs.out,
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: path_resolver("src", "index.html"),
                "404": path_resolver("src", "404.html"),
                linear: path_resolver("src", "linear.html"),
                fill: path_resolver("src", "fill.html"),
                branching: path_resolver("src", "branching.html"),
                attractor: path_resolver("src", "attractor.html"),
                // "3-d": path_resolver("pages", "3-d", "index.html"),
                // sets: path_resolver("pages", "sets", "index.html"),
                // misc: path_resolver("pages", "misc", "index.html"),
                // sandbox: path_resolver("pages", "sandbox", "index.html"),
            },
        },
    },
    appType: "mpa",
    resolve: {
        alias: {
            "?/": dirs.root.base,
            "#/": dirs.root.assets,
            "@/": dirs.root.content,
            "&/": dirs.root.components,
            "$/": dirs.root.shad,
            "!/": dirs.root.lib,
        },
    },
});
