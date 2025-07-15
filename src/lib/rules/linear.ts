const collection: FractalSet<LinearInstructionSet> = {
    "levy-c-curve": {
        name: "Levy C Curve",
        max_order: 15,
        gen: {
            shift: 1,
            state: {},
            transforms: {
                I: [false, [], "A"],
                A: [false, [["move"]], "FPPG"],
                F: [false, [["move"]], "FPPHN"],
                G: [false, [["move"]], "NHPPG"],
                H: [false, [["move"]], "NHPPHN"],
                P: [true, [["rot", -45]]],
                N: [true, [["rot", 45]]],
            },
        },
    },
    "dragon-curve": {
        name: "Dragon Curve",
        max_order: 15,
        gen: {
            shift: 1,
            state: {},
            transforms: {
                I: [false, [], "F"],
                F: [false, [["move"]], "FPH"],
                H: [false, [["move"]], "FNH"],
                P: [true, [["rot", -90]]],
                N: [true, [["rot", 90]]],
            },
        },
    },
    "gosper-curve": {
        name: "Gosper Curve",
        max_order: 5,
        gen: {
            shift: 1,
            state: {},
            transforms: {
                I: [false, [["move"]], "F"],
                F: [false, [["move"]], "FNHNNHPFPPFFPHN"],
                H: [false, [["move"]], "PFNHHNNHNFPPFPH"],
                P: [true, [["rot", -60]]],
                N: [true, [["rot", 60]]],
            },
        },
    },
    "koch-snowflake": {
        name: "Koch Snowflake",
        max_order: 5,
        gen: {
            shift: 1,
            state: {},
            transforms: {
                I: [false, [], "FNNFNNF"],
                F: [false, [["move"]], "FPFNNFPF"],
                P: [true, [["rot", -60]]],
                N: [true, [["rot", 60]]],
            },
        },
    },
    "koch-anti-snowflake": {
        name: "Koch Anti Snowflake",
        max_order: 5,
        gen: {
            shift: 1,
            state: {},
            transforms: {
                I: [false, [], "FNNFNNF"],
                F: [false, [["move"]], "FPFNNFPF"],
                P: [true, [["rot", -60]]],
                N: [true, [["rot", 60]]],
            },
        },
    },
    "minkowski-island": {
        name: "Minkowski Island",
        max_order: 3,
        gen: {
            shift: 1,
            state: {},
            transforms: {
                I: [false, [], "FNFNFNF"],
                F: [false, [["move"]], "FPFNFNFFPFPFNF"],
                P: [true, [["rot", -90]]],
                N: [true, [["rot", 90]]],
            },
        },
    },
    "hilbert-curve": {
        name: "Hilbert Curve",
        max_order: 6,
        gen: {
            shift: 2,
            state: {},
            transforms: {
                I: [false, [], "A"],
                A: [false, [], "PBFNAFANFBP"],
                B: [false, [], "NAFPBFBPFAN"],
                F: [true, [["move"]]],
                P: [true, [["rot", -90]]],
                N: [true, [["rot", 90]]],
            },
        },
    },
    "peano-curve": {
        name: "Peano Curve",
        max_order: 5,
        gen: {
            shift: 1,
            state: {},
            transforms: {
                I: [false, [], "RF"],
                F: [false, [["move"]], "FPFNFNFNFPFPFPFNF"],
                R: [true, [["rot", -45]]],
                P: [true, [["rot", -90]]],
                N: [true, [["rot", 90]]],
            },
        },
    },
    "vicsek-fractal": {
        name: "Vicsek Fractal",
        max_order: 5,
        gen: {
            shift: 1,
            state: {},
            transforms: {
                I: [false, [], "FPFPFPF"],
                F: [false, [["move"]], "FPFNFNFPF"],
                P: [true, [["rot", -90]]],
                N: [true, [["rot", 90]]],
            },
        },
    },
    "cross-stitch-curve": {
        name: "Cross Stitch Curve",
        max_order: 4,
        gen: {
            shift: 1,
            state: {},
            transforms: {
                I: [false, [], "FPFPFPF"],
                F: [false, [["move"]], "FNFPFPFNF"],
                P: [true, [["rot", -90]]],
                N: [true, [["rot", 90]]],
            },
        },
    },
    "fibonacci-word-fractal": {
        name: "Fibonacci Word Fractal",
        max_order: 20,
        gen: {
            shift: 1,
            state: { turn: false },
            transforms: {
                I: [false, [], "F"],
                F: [false, [["asgn", "turn", ["!", ["var", false, "turn"]]], ["move"]], "H"],
                H: [
                    false,
                    [
                        ["asgn", "turn", ["!", ["var", false, "turn"]]],
                        ["brch", ["var", false, "turn"], [["rot", -90]], [["rot", 90]]],
                        ["move"],
                    ],
                    "HF",
                ],
            },
        },
    },
    "sierpinski-arrow-head": {
        name: "Sierpinski Arrow Head",
        max_order: 10,
        gen: {
            shift: 1,
            state: {},
            transforms: {
                I: [false, [], "A"],
                A: [false, [["move"]], "PBNANBP"],
                B: [false, [["move"]], "NAPBPAN"],
                P: [true, [["rot", -60]]],
                N: [true, [["rot", 60]]],
            },
        },
    },
    "quardratic-koch-Island": {
        name: "Quardratic Koch Island",
        max_order: 4,
        gen: {
            shift: 1,
            state: {},
            transforms: {
                I: [false, [], "FNFNFNF"],
                F: [false, [["move"]], "FNFPFPFFFNFNFPF"],
                P: [true, [["rot", -90]]],
                N: [true, [["rot", 90]]],
            },
        },
    },
    "sierpinski-triangle": {
        name: "Sierpinski Triangle",
        max_order: 7,
        gen: {
            shift: 1,
            state: {},
            transforms: {
                I: [false, [], "FPGPG"],
                F: [false, [["move"]], "FPGNFNGPF"],
                G: [false, [["move"]], "GG"],
                P: [true, [["rot", -120]]],
                N: [true, [["rot", 120]]],
            },
        },
    },
    "gosper-island": {
        name: "Gosper Island",
        max_order: 5,
        gen: {
            shift: 1,
            state: {},
            transforms: {
                I: [false, [], "FNFNFNFNFNF"],
                F: [false, [["move"]], "FPFNF"],
                P: [true, [["rot", -60]]],
                N: [true, [["rot", 60]]],
            },
        },
    },
    "quardratic-island": {
        name: "Quardratic Island",
        max_order: 3,
        gen: {
            shift: 1,
            state: {},
            transforms: {
                I: [false, [], "FNFNFNF"],
                F: [false, [["move"]], "FPFFNFFNFNFPFPFFNFNFPFPFFPFFNF"],
                P: [true, [["rot", -90]]],
                N: [true, [["rot", 90]]],
            },
        },
    },
    "vicsek-fractal-2": {
        name: "Vicsek Fractal 2",
        max_order: 5,
        gen: {
            shift: 1,
            state: {},
            transforms: {
                I: [false, [], "RFNFNFNFN"],
                F: [true, [["move"]]],
                P: [false, [["rot", -90]], "NFPFVFPFVFPFN"],
                N: [false, [["rot", 90]], "NFPFN"],
                V: [false, [], "NFPFVFPFN"],
                R: [true, [["rot", 45]]],
            },
        },
    },
    "hilbert-curve-2": {
        name: "Hilbert Curve 2",
        max_order: 3,
        gen: {
            shift: 2,
            state: {},
            transforms: {
                I: [false, [], "PA"],
                A: [false, [], "AFBFANFNBFAFBPFPAFBFA"],
                B: [false, [], "BFAFBPFPAFBFANFNBFAFB"],
                F: [true, [["move"]]],
                P: [true, [["rot", -90]]],
                N: [true, [["rot", 90]]],
            },
        },
    },
    "t-square": {
        name: "T Square",
        max_order: 6,
        gen: {
            shift: 1,
            state: {},
            transforms: {
                I: [false, [], "NAFBNAFBNAFBNAFB"],
                F: [true, [["move"]]],
                P: [true, [["rot", -90]]],
                N: [false, [["rot", 90]], "PSSAFBGNAFBNAFBNSAFBGGP"],
                A: [false, [], "S"],
                B: [false, [], "G"],
                S: [true, [["scale", 1 / 2]]],
                G: [true, [["scale", 2]]],
            },
        },
    },
};
export default collection;
