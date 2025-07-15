import branchingRuleSet from "@/lib/rules/branching";
import fillRuleSet from "@/lib/rules/fill";
import linearRuleSet from "@/lib/rules/linear";

const all_rules: {
    [kind: string]: {
        vis_set: {
            [id: string]: {
                name: string;
                max_order: number;
                gen: object;
            };
        };
        canvas_kind: "SVG" | "Canvas";
    };
} = {
    "linear-fractals": { vis_set: linearRuleSet, canvas_kind: "SVG" },
    "branching-fractals": { vis_set: branchingRuleSet, canvas_kind: "SVG" },
    "fill-fractals": { vis_set: fillRuleSet, canvas_kind: "SVG" },
};

export default all_rules;
