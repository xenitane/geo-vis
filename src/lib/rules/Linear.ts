import { doNothing, moveForward, right45, right60, right90, left45, left60, left90, multiply } from "../utils";

const LevyCCurveRules: LinearFractalInfo = {
    name: "Levy C Curve",
    maxOrder: 15,
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
    maxOrder: 15,
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
    maxOrder: 5,
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
    maxOrder: 5,
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
    maxOrder: 5,
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
    maxOrder: 3,
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
    maxOrder: 6,
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
    maxOrder: 5,
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
    maxOrder: 5,
    rules: () => ({
        rules: {
            I: [false, doNothing, "FPFPFPF"],
            F: [false, moveForward, "FPFNFNFPF"],
            P: [true, right90],
            N: [true, left90],
        },
        shift: 1,
    }),
};

const CrossStitchCurveRules: LinearFractalInfo = {
    name: "Cross Stitch Curve",
    maxOrder: 4,
    rules: () => ({
        rules: {
            I: [false, doNothing, "FPFPFPF"],
            F: [false, moveForward, "FNFPFPFNF"],
            P: [true, right90],
            N: [true, left90],
        },
        shift: 1,
    }),
};

const FibonacciWordFractalRules: LinearFractalInfo = {
    name: "Fibonacci Word Fractal",
    maxOrder: 20,
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
};

const SierpinskiArrowHeadRules: LinearFractalInfo = {
    name: "Sierpinski Arrow Head",
    maxOrder: 10,

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
    maxOrder: 4,
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
    maxOrder: 7,
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
    maxOrder: 5,
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
    maxOrder: 3,
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

const VicsekFractal2Rules: LinearFractalInfo = {
    name: "Vicsek Fractal 2",
    maxOrder: 5,
    rules: () => ({
        shift: 1,
        rules: {
            I: [false, doNothing, "RFNFNFNFN"],
            F: [true, moveForward],
            N: [false, left90, "NFPFN"],
            P: [false, right90, "NFPFVFPFVFPFN"],
            V: [false, doNothing, "NFPFVFPFN"],
            R: [true, left45],
        },
    }),
};

const HilbertCurve2Rules: LinearFractalInfo = {
    name: "Hilbert Curve 2",
    maxOrder: 3,
    rules: () => ({
        shift: 2,
        rules: {
            I: [false, doNothing, "PA"],
            A: [false, doNothing, "AFBFANFNBFAFBPFPAFBFA"],
            B: [false, doNothing, "BFAFBPFPAFBFANFNBFAFB"],
            F: [true, moveForward],
            P: [true, right90],
            N: [true, left90],
        },
    }),
};

const TSquareRules: LinearFractalInfo = {
    name: "T Square",
    maxOrder: 6,
    rules: () => ({
        shift: 1,
        rules: {
            I: [false, doNothing, "NAFBNAFBNAFBNAFB"],
            F: [true, moveForward],
            N: [false, left90, "PSSAFBGNAFBNAFBNSAFBGGP"],
            P: [true, right90],
            A: [false, doNothing, "S"],
            B: [false, doNothing, "G"],
            S: [true, (p, f) => [p, multiply([1 / 2, 0], f)]],
            G: [true, (p, f) => [p, multiply([2, 0], f)]],
        },
    }),
};

const LinearFractalRulesSet: Record<string, LinearFractalInfo> = {
    "cross-stitch-curve": CrossStitchCurveRules,
    "dragon-curve": DragonCurveRules,
    "fibonacci-word-fractal": FibonacciWordFractalRules,
    "gosper-curve": GosperCurveRules,
    "gosper-island": GosperIslandRules,
    "hilbert-curve-2": HilbertCurve2Rules,
    "hilbert-curve": HilbertCurveRules,
    "koch-anti-snowflake": KochAntiSnowflakeRules,
    "koch-snowflake": KochSnowflakeRules,
    "levy-c-curve": LevyCCurveRules,
    "minkowski-island": MinkowskiIslandRules,
    "peano-curve": PeanoCurveRules,
    "quardratic-island": QuardraticIslandRules,
    "quardratic-koch-island": QuardraticKochIslandRules,
    "sierpinski-arrow-head": SierpinskiArrowHeadRules,
    "sierpinski-triangle": SierpinskiTriangleRules,
    "t-square": TSquareRules,
    "vicsek-fractal": VicsekFractalRules,
    "vicsek-fractal-2": VicsekFractal2Rules,
};

export default LinearFractalRulesSet;
