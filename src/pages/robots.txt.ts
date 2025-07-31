import { type APIRoute } from "astro";

const robotsTxt = `
User-agent: *
Disallow: /
`.trim();

export const GET: APIRoute = function () {
    return new Response(robotsTxt, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
        },
    });
};
