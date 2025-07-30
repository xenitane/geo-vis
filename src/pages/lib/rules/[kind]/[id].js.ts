import type { APIRoute } from "astro";

import allRules from "@/lib/rules";

export function getStaticPaths() {
    return Object.entries(allRules).flatMap(function ([kind, { vis_set }]) {
        return Object.keys(vis_set).map(function (id) {
            return { params: { kind: kind, id }, props: { kind } };
        });
    });
}

export const GET: APIRoute = function ({ params: { id }, props: { kind } }) {
    const response_script = /* javascript */ `function __newRules__(){ return ${JSON.stringify(allRules[kind!].vis_set[id!].gen)} }`;

    return new Response(response_script, {
        headers: {
            "Content-Type": "text/javascript; charset=utf-8",
        },
    });
};
