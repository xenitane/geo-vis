import { type APIRoute } from "astro";

import linearRuleSet from "@/lib/rules/linear";

export async function getStaticPaths() {
    return Object.keys(linearRuleSet).map(function (item) {
        return { params: { slug: item } };
    });
}

export const GET: APIRoute = function (ctx) {
    const response_script = /* javascript */ `function __newRules__(){ return ${JSON.stringify(linearRuleSet[ctx.params.slug!].gen)}; }`;
    return new Response(response_script, {
        headers: {
            "Content-Type": "text/javascript; charset=utf-8",
        },
    });
};
