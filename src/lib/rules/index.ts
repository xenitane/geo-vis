import branchingRuleSet from "@/lib/rules/branching-fractal";
import fillRuleSet from "@/lib/rules/fill-fractal";
import linearRuleSet from "@/lib/rules/linear-fractal";

const all_rules: {
    [kind: string]: {
        [id: string]: {
            name: string;
            max_order: number;
            gen: object;
        };
    };
} = {
    "linear-fractal": linearRuleSet,
    "branching-fractal": branchingRuleSet,
    "fill-fractal": fillRuleSet,
};

export default all_rules;
