import LinearFractalRulesSet from "@/lib/rules/Linear";
import FillFractalRuleSet from "@/lib/rules/Fill";
import BranchingFractalRuleSet from "@/lib/rules/Branching";
export default {
	Linear: LinearFractalRulesSet,
	Fill: FillFractalRuleSet,
	Branching: BranchingFractalRuleSet,
	// Linear: "T Square"
	// Fill: "T Square"
	// Branching : "Vicsek fractal", "Fractal Tree"
	// Attractors : "TinkerBell Map", "Strange Attractor", "Lorenz Attractor"
	// Sets : "Mandelbrot Set", "Multibrot Set", "Julia Sets", "Burning Ship"
	// 3d : "Sierpinski pyramid", "meger sponge"
};
