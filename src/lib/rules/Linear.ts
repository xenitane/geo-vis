import { LinearFractalInfo, LinearOperator } from "@/types";
import { add, rotate } from "@/lib/utils";
import {
	antiTSquare,
	dragonCurve,
	fibonacciWordFractal,
	gosperCurve,
	hilbertCurve,
	kochAntiSnowFlake,
	kochSnowFlake,
	levyCCurve,
	minkowskiSausage,
	peanoCurve,
	tSquare,
} from "@/assets/Thumbnails";

const doNothing: LinearOperator = (p, f) => [p, f];
const moveForward: LinearOperator = (p, f) => [add(p, f), f];
const left45: LinearOperator = (p, f) => [p, rotate(f, Math.PI / 4)];
const left60: LinearOperator = (p, f) => [p, rotate(f, Math.PI / 3)];
const left90: LinearOperator = (p, f) => [p, rotate(f, Math.PI / 2)];
const right45: LinearOperator = (p, f) => [p, rotate(f, -Math.PI / 4)];
const right60: LinearOperator = (p, f) => [p, rotate(f, -Math.PI / 3)];
const right90: LinearOperator = (p, f) => [p, rotate(f, -Math.PI / 2)];

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

const MinkowskiSausageRules: LinearFractalInfo = {
	name: "Minkowski Sausage",
	maxDepth: 3,
	image: minkowskiSausage,
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

const TSquareRules: LinearFractalInfo = {
	name: "T Square",
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
	image: tSquare,
};

const AntiTSquareRules: LinearFractalInfo = {
	name: "Anti T Square",
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
	image: antiTSquare,
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

const LinearFractalRulesSet: Record<string, LinearFractalInfo> = {
	"levy-c-curve": LevyCCurveRules,
	"dragon-curve": DragonCurveRules,
	"gosper-curve": GosperCurveRules,
	"koch-snowflake": KochSnowflakeRules,
	"koch-anti-snowflake": KochAntiSnowflakeRules,
	"minkowski-sausage": MinkowskiSausageRules,
	"hilbert-curve": HilbertCurveRules,
	"peano-curve": PeanoCurveRules,
	"t-square": TSquareRules,
	"anti-t-square": AntiTSquareRules,
	"fibonacci-word-fractal": FibonacciWordFractalRules,
};

export default LinearFractalRulesSet;
