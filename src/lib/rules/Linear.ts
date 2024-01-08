import { LinearFractalInfo, LinearOperator } from "@/@types";
import Levy from "@/assets/Levy";
import { add, rotate } from "@/lib/utils/complex";

const doNothing: LinearOperator = (p, f) => [p, f];
const moveForward: LinearOperator = (p, f) => [add(p, f), f];
const left45: LinearOperator = (p, f) => [p, rotate(f, Math.PI / 4)];
const left60: LinearOperator = (p, f) => [p, rotate(f, Math.PI / 3)];
const left90: LinearOperator = (p, f) => [p, rotate(f, Math.PI / 2)];
const right45: LinearOperator = (p, f) => [p, rotate(f, -Math.PI / 4)];
const right60: LinearOperator = (p, f) => [p, rotate(f, -Math.PI / 3)];
const right90: LinearOperator = (p, f) => [p, rotate(f, -Math.PI / 2)];

const LevyCCurveRules: LinearFractalInfo = {
	name: "Levy C Curve",
	rules: {
		I: [false, moveForward, "FPPG"],
		F: [false, moveForward, "FPPHN"],
		G: [false, moveForward, "NHPPG"],
		H: [false, moveForward, "NHPPHN"],
		P: [true, right45],
		N: [true, left45],
	},
	maxDepth: 15,
	Image: Levy,
};

const DragonCurveRules: LinearFractalInfo = {
	name: "Dragon Curve",
	rules: {
		I: [false, moveForward, "FPH"],
		F: [false, moveForward, "FPH"],
		H: [false, moveForward, "FNH"],
		P: [true, right90],
		N: [true, left90],
	},
	maxDepth: 15,
};

const GosperCurveRules: LinearFractalInfo = {
	name: "Gosper Curve",
	rules: {
		I: [false, moveForward, "FNHNNHPFPPFFPHN"],
		F: [false, moveForward, "FNHNNHPFPPFFPHN"],
		H: [false, moveForward, "PFNHHNNHNFPPFPH"],
		P: [true, right60],
		N: [true, left60],
	},
	maxDepth: 5,
};

const KochSnowflakeRules: LinearFractalInfo = {
	name: "Koch Snowflake",
	maxDepth: 5,
	rules: {
		I: [false, doNothing, "FNNFNNF"],
		F: [false, moveForward, "FPFNNFPF"],
		P: [true, right60],
		N: [true, left60],
	},
};

const KochAntiSnowflakeRules: LinearFractalInfo = {
	name: "Koch Anti Snowflake",
	maxDepth: 5,
	rules: {
		I: [false, doNothing, "FNNFNNF"],
		F: [false, moveForward, "FNFPPFNF"],
		P: [true, right60],
		N: [true, left60],
	},
};

const MinkowskiSausageRules: LinearFractalInfo = {
	name: "Minkowski Sausage",
	maxDepth: 3,
	rules: {
		I: [false, doNothing, "FNFNFNF"],
		F: [false, moveForward, "FPFNFNFFPFPFNF"],
		P: [true, right90],
		N: [true, left90],
	},
};

const HilbertCurveRules: LinearFractalInfo = {
	name: "Hilbert Curve",
	maxDepth: 8,
	rules: {
		I: [false, doNothing, "A"],
		A: [false, doNothing, "PBFNAFANFBP"],
		B: [false, doNothing, "NAFPBFBPFAP"],
		F: [true, moveForward],
		P: [true, right90],
		N: [true, left90],
	},
};

const PeanoCurveRules: LinearFractalInfo = {
	name: "Peano Curve",
	maxDepth: 5,
	rules: {
		I: [false, doNothing, "RF"],
		F: [false, moveForward, "FPFNFNFNFPFPFPFNF"],
		R: [true, right45],
		P: [true, right90],
		N: [true, left90],
	},
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
};

export default LinearFractalRulesSet;
