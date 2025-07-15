const collection: FractalSet<BranchingInstructionSet> = {
    "peano-sierpinski-carpet": {
        name: "Peano Sierpinski Carpet",
        max_order: 5,
        gen: {
            shift: 1,
            state: {},
            stay: false,
            transforms: {
                I: [false, [], true, "RF"],
                F: [false, [["move"]], true, ["F", ["PFNFNF", "NFPFPFNF"]]],
                P: [true, [["rot", -90]], true],
                N: [true, [["rot", 90]], true],
                R: [true, [["rot", -45]], true],
            },
        },
    },
    "sierpinski-triangle-skeleton": {
        name: "Sierpinski Triangle Skeleton",
        max_order: 8,
        gen: {
            shift: 2,
            state: {},
            stay: false,
            transforms: {
                I: [false, [], true, "KA"],
                A: [false, [], true, ["", ["F", "PF", "NF"]]],
                F: [false, [["move"]], true, ["MS", ["PF", "F", "NF"]]],
                M: [true, [["move"]], true],
                P: [true, [["rot", -120]], true],
                N: [true, [["rot", 120]], true],
                K: [true, [["rot", -90]], true],
                S: [true, [["scale", 1 / 2]], true],
            },
        },
    },
    "t-square": {
        name: "T-Square",
        max_order: 7,
        gen: {
            shift: 2,
            state: {},
            stay: false,
            transforms: {
                I: [false, [], true, "KA"],
                A: [false, [], true, ["", ["F", "PF", "PPF", "NF"]]],
                F: [false, [["move"]], true, ["MS", ["PF", "F", "NF"]]],
                M: [true, [["move"]], true],
                P: [true, [["rot", -90]], true],
                N: [true, [["rot", 90]], true],
                K: [true, [["rot", -45]], true],
                S: [true, [["scale", 1 / 2]], true],
            },
        },
    },
    "vicsek-fractal": {
        name: "Vicsek Fractal",
        max_order: 5,
        gen: {
            shift: 2,
            state: {},
            stay: true,
            transforms: {
                I: [false, [], true, "KC"],
                C: [false, [], true, ["SCG", ["FSDDCG", "PFSDDCG", "PPFSDDCG", "NFSDDCG"]]],
                S: [true, [["scale", 1 / 3]], true],
                G: [true, [["scale", 3]], true],
                F: [false, [["move"]], true, ""],
                D: [true, [["move"]], false],
                P: [true, [["rot", -90]], true],
                N: [true, [["rot", 90]], true],
                K: [true, [["rot", -90]], true],
            },
        },
    },
    "sierpinski-carpet": {
        name: "Sierpinski Carpet",
        max_order: 5,
        gen: {
            shift: 1,
            state: {},
            stay: false,
            transforms: {
                I: [false, [], false, ["", ["ANF", "NBPF"]]],
                F: [false, [["move"]], true, "FFF"],
                P: [true, [["rot", -90]], true],
                N: [true, [["rot", 90]], true],
                A: [false, [["move"]], true, ["A", ["NBPF", ["A", [["NB", ["BPA", "PA"]], "A"]]]]],
                B: [false, [["move"]], true, ["B", ["PANF", ["B", [["PA", ["ANB", "NB"]], "B"]]]]],
            },
        },
    },
    "fractal-tree": {
        name: "Fractal Tree",
        max_order: 10,
        gen: {
            shift: 1,
            state: {},
            stay: true,
            transforms: {
                I: [false, [], true, "KA"],
                A: [false, [["move"]], true, ["B", ["PA", "NA"]]],
                B: [false, [["move"]], true, "BB"],
                P: [true, [["rot", -45]], true],
                N: [true, [["rot", 45]], true],
                K: [true, [["rot", -90]], true],
            },
        },
    },
    "barnsley-fern": {
        name: "Barnsley Fern",
        max_order: 6,
        gen: {
            shift: 2,
            state: {},
            stay: true,
            transforms: {
                I: [false, [], true, "RNX"],
                P: [true, [["rot", -25]], true],
                N: [true, [["rot", 25]], true],
                X: [
                    false,
                    [],
                    true,
                    [
                        "FP",
                        [
                            ["", ["X", "NX"]],
                            ["NF", ["NFX", "PX"]],
                        ],
                    ],
                ],
                F: [false, [["move"]], true, "FF"],
                R: [true, [["rot", -90]], true],
            },
        },
    },
};

export default collection;
