import { sierpinskiCarpet, sierpinskiTriangleSkeleton, tSquare } from "@/assets/Thumbnails/branching";
import { doNothing, left120, left90, moveForward, multiply, right120, right45, right90 } from "@/lib/utils";
import { BranchingFractalInfo } from "@/types";

const PeanoSierpinskiCarpetRules: BranchingFractalInfo = {
	name: "Peano Sierpinski Carpet",
	maxDepth: 5,
	image: sierpinskiCarpet,
	rules: () => ({
		shift: 1,
		rules: {
			I: [false, doNothing, "RF"],
			F: [false, moveForward, ["F", ["PFNFNF", "NFPFPFNF"]]],
			P: [true, right90],
			N: [true, left90],
			R: [true, right45],
		},
	}),
};

const SierpinskiTriangleSkeletonRules: BranchingFractalInfo = {
	name: "Sierpinski Triangle Skeleton",
	maxDepth: 8,
	image: sierpinskiTriangleSkeleton,
	rules: () => ({
		shift: 2,
		rules: {
			I: [false, doNothing, "KA"],
			A: [false, doNothing, ["", ["F", "PF", "NF"]]],
			F: [false, moveForward, ["MS", ["PF", "F", "NF"]]],
			M: [true, moveForward],
			P: [true, right120],
			N: [true, left120],
			K: [true, right90],
			S: [true, (p, f) => [p, multiply(f, [0.5, 0])]],
		},
	}),
};

const TSquareRules: BranchingFractalInfo = {
	name: "T Square",
	maxDepth: 7,
	image: tSquare,
	rules: () => ({
		shift: 2,
		rules: {
			I: [false, doNothing, "KA"],
			A: [false, doNothing, ["", ["F", "PF", "PPF", "NF"]]],
			F: [false, moveForward, ["MS", ["PF", "F", "NF"]]],
			M: [true, moveForward],
			P: [true, right90],
			N: [true, left90],
			K: [true, right45],
			S: [true, (p, f) => [p, multiply(f, [0.5, 0])]],
		},
	}),
};

const BranchingFractalRuleSet: Record<string, BranchingFractalInfo> = {
	"peano-sierpinski-carpet": PeanoSierpinskiCarpetRules,
	"sierpinski-triangle-skeleton": SierpinskiTriangleSkeletonRules,
	"t-square": TSquareRules,
};
export default BranchingFractalRuleSet;
