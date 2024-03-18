import LinearFractalRulesSet from "@/lib/rules/Linear";
import FillFractalRuleSet from "@/lib/rules/Fill";
import BranchingFractalRuleSet from "@/lib/rules/Branching";
import AttractorRuleSet from "@/lib/rules/Attractor";

export default {
    Linear: LinearFractalRulesSet,
    Fill: FillFractalRuleSet,
    Branching: BranchingFractalRuleSet,
    Attractor: AttractorRuleSet,
    // Fill: "T Square"
    // Branching : "Fractal Tree"
    // Sets : "Mandelbrot Set", "Multibrot Set", "Julia Sets", "Burning Ship"
    // 3d : "Sierpinski pyramid", "meger sponge"
};
