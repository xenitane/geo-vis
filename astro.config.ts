/** @type {import("astro").AstroUserConfig} */

import alpinejs from "@astrojs/alpinejs";
import tailwindcss from "@tailwindcss/vite";
import AstroPWA from "@vite-pwa/astro";
import { defineConfig, envField } from "astro/config";

export default defineConfig({
    site: "https://xenitane.xyz",
    base: "/geo-vis",
    trailingSlash: "never",
    build: { assets: "assets", format: "file" },
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
            CDN_URL: envField.string({ context: "client", access: "public", optional: false, url: true }),
            DOMAIN_NAME: envField.string({ context: "client", access: "public", optional: false }),
        },
    },
    vite: {
        plugins: [tailwindcss()],
    },
    integrations: [
        alpinejs({ entrypoint: "/src/entrypoint.ts" }),
        AstroPWA({
            registerType: "autoUpdate",
            mode: "development",
            manifest: {
                name: "Geometric Visualizer",
                short_name: "Geo Vis",
                icons: [
                    {
                        src: "https://cdn.xenitane.xyz/geo-vis/logo.png",
                        type: "image/png",
                        sizes: "512x512",
                    },
                ],
            },
            workbox: {
                navigateFallback: "/",
                globPatterns: ["**/*.{css,js,html,svg,png,ico,txt}"],
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/xenitane\.xyz\/assets\/*.woff2?$/,
                        handler: "StaleWhileRevalidate",
                        options: {
                            cacheName: "fonts",
                        },
                    },
                    {
                        urlPattern: /^https:\/\/cdn\.xenitane\.xyz\/thumbs/,
                        handler: "StaleWhileRevalidate",
                        options: {
                            cacheName: "thumbs",
                        },
                    },
                    {
                        urlPattern: /^https:\/\/xenitane\.xyz\/lib\rules/,
                        handler: "StaleWhileRevalidate",
                        options: {
                            cacheName: "rules",
                        },
                    },
                ],
            },
        }),
    ],
});
