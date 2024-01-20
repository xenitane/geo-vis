import { LinearFractalInfo } from "@/types";
import { doNothing, moveForward, right45, right60, right90, left45, left60, left90 } from "@/lib/utils";

import {
	crossStitchCurve,
	dragonCurve,
	fibonacciWordFractal,
	gosperCurve,
	gosperIsland,
	hilbertCurve,
	kochAntiSnowFlake,
	kochSnowFlake,
	levyCCurve,
	minkowskiIsland,
	peanoCurve,
	quardraticIsland,
	quardraticKochIsland,
	sierpinskiArrowhead,
	sierpinskiTriangle,
	vicsekFractal,
} from "@/assets/Thumbnails/linear";

// todo: add fractal thumbnails

const LevyCCurveRules: LinearFractalInfo = {
	name: "Levy C Curve",
	image: levyCCurve,
	maxDepth: 15,
	rules: () => {
		return {
			rules: {
				I: [false, doNothing, "A"],
				A: [false, moveForward, "FPPG"],
				F: [false, moveForward, "FPPHN"],
				G: [false, moveForward, "NHPPG"],
				H: [false, moveForward, "NHPPHN"],
				P: [true, right45],
				N: [true, left45],
			},
			shift: 1,
		};
	},
};

const DragonCurveRules: LinearFractalInfo = {
	name: "Dragon Curve",
	maxDepth: 15,
	image: dragonCurve,
	rules: () => ({
		rules: {
			I: [false, doNothing, "F"],
			F: [false, moveForward, "FPH"],
			H: [false, moveForward, "FNH"],
			P: [true, right90],
			N: [true, left90],
		},
		shift: 1,
	}),
};

const GosperCurveRules: LinearFractalInfo = {
	name: "Gosper Curve",
	maxDepth: 5,
	image: gosperCurve,
	rules: () => ({
		rules: {
			I: [false, moveForward, "F"],
			F: [false, moveForward, "FNHNNHPFPPFFPHN"],
			H: [false, moveForward, "PFNHHNNHNFPPFPH"],
			P: [true, right60],
			N: [true, left60],
		},
		shift: 1,
	}),
};

const KochSnowflakeRules: LinearFractalInfo = {
	name: "Koch Snowflake",
	maxDepth: 5,
	image: kochSnowFlake,
	rules: () => ({
		rules: {
			I: [false, doNothing, "FNNFNNF"],
			F: [false, moveForward, "FPFNNFPF"],
			P: [true, right60],
			N: [true, left60],
		},
		shift: 1,
	}),
};

const KochAntiSnowflakeRules: LinearFractalInfo = {
	name: "Koch Anti Snowflake",
	maxDepth: 5,
	image: kochAntiSnowFlake,
	rules: () => ({
		rules: {
			I: [false, doNothing, "FNNFNNF"],
			F: [false, moveForward, "FNFPPFNF"],
			P: [true, right60],
			N: [true, left60],
		},
		shift: 1,
	}),
};

const MinkowskiIslandRules: LinearFractalInfo = {
	name: "Minkowski Island",
	maxDepth: 3,
	image: minkowskiIsland,
	rules: () => ({
		rules: {
			I: [false, doNothing, "FNFNFNF"],
			F: [false, moveForward, "FPFNFNFFPFPFNF"],
			P: [true, right90],
			N: [true, left90],
		},
		shift: 1,
	}),
};

const HilbertCurveRules: LinearFractalInfo = {
	name: "Hilbert Curve",
	maxDepth: 6,
	image: hilbertCurve,
	rules: () => ({
		rules: {
			I: [false, doNothing, "A"],
			A: [false, doNothing, "PBFNAFANFBP"],
			B: [false, doNothing, "NAFPBFBPFAN"],
			F: [true, moveForward],
			P: [true, right90],
			N: [true, left90],
		},
		shift: 2,
	}),
};

const PeanoCurveRules: LinearFractalInfo = {
	name: "Peano Curve",
	maxDepth: 5,
	image: peanoCurve,
	rules: () => ({
		rules: {
			I: [false, doNothing, "RF"],
			F: [false, moveForward, "FPFNFNFNFPFPFPFNF"],
			R: [true, right45],
			P: [true, right90],
			N: [true, left90],
		},
		shift: 1,
	}),
};

const VicsekFractalRules: LinearFractalInfo = {
	name: "Vicsek Fractal",
	maxDepth: 5,
	rules: () => ({
		rules: {
			I: [false, doNothing, "FPFPFPF"],
			F: [false, moveForward, "FPFNFNFPF"],
			P: [true, right90],
			N: [true, left90],
		},
		shift: 1,
	}),
	image: vicsekFractal,
};

const CrossStitchCurveRules: LinearFractalInfo = {
	name: "Cross Stitch Curve",
	maxDepth: 4,
	rules: () => ({
		rules: {
			I: [false, doNothing, "FPFPFPF"],
			F: [false, moveForward, "FNFPFPFNF"],
			P: [true, right90],
			N: [true, left90],
		},
		shift: 1,
	}),
	image: crossStitchCurve,
};

const FibonacciWordFractalRules: LinearFractalInfo = {
	name: "Fibonacci Word Fractal",
	maxDepth: 20,
	rules: () => {
		let i = false;
		return {
			shift: 1,
			rules: {
				I: [false, doNothing, "F"],
				F: [
					false,
					(p, f) => {
						i = !i;
						return moveForward(p, f);
					},
					"H",
				],
				H: [
					false,
					(p, f) => {
						i = !i;
						return moveForward(...(i ? right90(p, f) : left90(p, f)));
					},
					"HF",
				],
			},
		};
	},
	image: fibonacciWordFractal,
};

const SierpinskiArrowHeadCurveRules: LinearFractalInfo = {
	name: "Sierpinski Arrow Head curve",
	maxDepth: 10,
	image: sierpinskiArrowhead,
	rules: () => ({
		shift: 1,
		rules: {
			I: [false, doNothing, "A"],
			A: [false, moveForward, "PBNANBP"],
			B: [false, moveForward, "NAPBPAN"],
			N: [true, left60],
			P: [true, right60],
		},
	}),
};

const QuardraticKochIslandRules: LinearFractalInfo = {
	name: "Quardratic Koch Island",
	maxDepth: 4,
	image: quardraticKochIsland,
	rules: () => ({
		shift: 1,
		rules: {
			I: [false, doNothing, "FNFNFNF"],
			F: [false, moveForward, "FNFPFPFFFNFNFPF"],
			P: [true, right90],
			N: [true, left90],
		},
	}),
};

const SierpinskiTriangleRules: LinearFractalInfo = {
	name: "Sierpinski Tiangle",
	maxDepth: 7,
	image: sierpinskiTriangle,
	rules: () => ({
		shift: 1,
		rules: {
			I: [false, doNothing, "NFFNNFXFNNFFN"],
			F: [false, moveForward, "FF"],
			X: [false, doNothing, "NNFXFPPFXFPPFXFNN"],
			P: [true, right60],
			N: [true, left60],
		},
	}),
};

const GosperIslandRules: LinearFractalInfo = {
	name: "Gosper Island",
	maxDepth: 5,
	image: gosperIsland,
	rules: () => ({
		shift: 1,
		rules: {
			I: [false, doNothing, "FPFPFPFPFPF"],
			F: [false, moveForward, "FNFPF"],
			P: [true, left60],
			N: [true, right60],
		},
	}),
};

const QuardraticIslandRules: LinearFractalInfo = {
	name: "Quardratic Island",
	maxDepth: 3,
	image: quardraticIsland,
	rules: () => ({
		shift: 1,
		rules: {
			I: [false, doNothing, "FNFNFNF"],
			N: [true, left90],
			P: [true, right90],
			F: [false, moveForward, "FPFFNFFNFNFPFPFFNFNFPFPFFPFFNF"],
		},
	}),
};

const LinearFractalRulesSet: Record<string, LinearFractalInfo> = {
	"cross-stitch-curve": CrossStitchCurveRules,
	"dragon-curve": DragonCurveRules,
	"fibonacci-word-fractal": FibonacciWordFractalRules,
	"gosper-curve": GosperCurveRules,
	"gosper-island": GosperIslandRules,
	"hilbert-curve": HilbertCurveRules,
	"koch-anti-snowflake": KochAntiSnowflakeRules,
	"koch-snowflake": KochSnowflakeRules,
	"levy-c-curve": LevyCCurveRules,
	"minkowski-island": MinkowskiIslandRules,
	"peano-curve": PeanoCurveRules,
	"quardratic-island": QuardraticIslandRules,
	"quardratic-koch-island": QuardraticKochIslandRules,
	"sierpinski-arrow-head-curve": SierpinskiArrowHeadCurveRules,
	"sierpinski-triangle": SierpinskiTriangleRules,
	"vicsek-fractal": VicsekFractalRules,
};

export default LinearFractalRulesSet;
