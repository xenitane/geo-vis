/** @type {import("astro").AstroUserConfig} */

import alpinejs from "@astrojs/alpinejs";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";

export default defineConfig({
    site: "https://xenitane.xyz",
    base: "/geo-vis",
    trailingSlash: "never",
    build: { assets: "assets" },
    devToolbar: { enabled: false },
    output: "static",
    server: function ({ command }) {
        return {
            host: "0.0.0.0",
            port: 4173 + ("dev" === command ? 1000 : 0),
        };
    },
    env: {
        schema: {
            SITE_URL: envField.string({ context: "client", access: "public", optional: false, url: true }),
            CDN_URL: envField.string({ context: "client", access: "public", optional: false, url: true }),
            DOMAIN_NAME: envField.string({ context: "client", access: "public", optional: false }),
        },
    },
    vite: {
        plugins: [tailwindcss()],
    },
    integrations: [alpinejs({ entrypoint: "/src/entrypoint.ts" })],

    build: {
        format: "file",
    },
});
