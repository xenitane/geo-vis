import {
    sierpinskiCarpet,
    peanoSierpinskiCarpet,
    sierpinskiTriangleSkeleton,
    tSquare,
    vicsekFractal,
} from "#/Thumbnails/branching";
import { doNothing, left120, left90, moveForward, multiply, right120, right45, right90 } from "%/utils";
import { BranchingFractalInfo } from "?";

const PeanoSierpinskiCarpetRules: BranchingFractalInfo = {
    name: "Peano Sierpinski Carpet",
    maxOrder: 5,
    image: peanoSierpinskiCarpet,
    rules: () => ({
        shift: 1,
        stay: false,
        rules: {
            I: [false, (p, f) => [...doNothing(p, f), true], "RF"],
            F: [false, (p, f) => [...moveForward(p, f), true], ["F", ["PFNFNF", "NFPFPFNF"]]],
            P: [true, (p, f) => [...right90(p, f), true]],
            N: [true, (p, f) => [...left90(p, f), true]],
            R: [true, (p, f) => [...right45(p, f), true]],
        },
    }),
};

const SierpinskiTriangleSkeletonRules: BranchingFractalInfo = {
    name: "Sierpinski Triangle Skeleton",
    maxOrder: 8,
    image: sierpinskiTriangleSkeleton,
    rules: () => ({
        shift: 2,
        stay: false,
        rules: {
            I: [false, (p, f) => [...doNothing(p, f), true], "KA"],
            A: [false, (p, f) => [...doNothing(p, f), true], ["", ["F", "PF", "NF"]]],
            F: [false, (p, f) => [...moveForward(p, f), true], ["MS", ["PF", "F", "NF"]]],
            M: [true, (p, f) => [...moveForward(p, f), true]],
            P: [true, (p, f) => [...right120(p, f), true]],
            N: [true, (p, f) => [...left120(p, f), true]],
            K: [true, (p, f) => [...right90(p, f), true]],
            S: [true, (p, f) => [p, multiply(f, [0.5, 0]), true]],
        },
    }),
};

const TSquareRules: BranchingFractalInfo = {
    name: "T Square",
    maxOrder: 7,
    image: tSquare,
    rules: () => ({
        shift: 2,
        stay: false,
        rules: {
            I: [false, (p, f) => [...doNothing(p, f), true], "KA"],
            A: [false, (p, f) => [...doNothing(p, f), true], ["", ["F", "PF", "PPF", "NF"]]],
            F: [false, (p, f) => [...moveForward(p, f), true], ["MS", ["PF", "F", "NF"]]],
            M: [true, (p, f) => [...moveForward(p, f), true]],
            P: [true, (p, f) => [...right90(p, f), true]],
            N: [true, (p, f) => [...left90(p, f), true]],
            K: [true, (p, f) => [...right45(p, f), true]],
            S: [true, (p, f) => [p, multiply(f, [0.5, 0]), true]],
        },
    }),
};

const VicsekFractalRules: BranchingFractalInfo = {
    name: "Vicsek Fractal",
    maxOrder: 5,
    image: vicsekFractal,
    rules: () => ({
        shift: 2,
        stay: true,
        rules: {
            I: [false, (p, f) => [...doNothing(p, f), true], "KC"],
            C: [false, (p, f) => [...doNothing(p, f), true], ["SCG", ["FSDDCG", "PFSDDCG", "PPFSDDCG", "NFSDDCG"]]],
            S: [true, (p, f) => [p, multiply(f, [1 / 3, 0]), true]],
            G: [true, (p, f) => [p, multiply(f, [3, 0]), true]],
            F: [false, (p, f) => [...moveForward(p, f), true], ""],
            D: [true, (p, f) => [...moveForward(p, f), false]],
            P: [true, (p, f) => [...right90(p, f), true]],
            N: [true, (p, f) => [...left90(p, f), true]],
            K: [true, (p, f) => [...right45(p, f), true]],
        },
    }),
};

const SierpinskiCarpetRules: BranchingFractalInfo = {
    name: "Sierpinski Carpet",
    image: sierpinskiCarpet,
    maxOrder: 5,
    rules: () => ({
        shift: 1,
        stay: false,
        rules: {
            I: [false, (p, f) => [...doNothing(p, f), false], ["", ["ANF", "NBPF"]]],
            F: [false, (p, f) => [...moveForward(p, f), true], "FFF"],
            P: [true, (p, f) => [...right90(p, f), true]],
            N: [true, (p, f) => [...left90(p, f), true]],
            A: [false, (p, f) => [...moveForward(p, f), true], ["A", ["NBPF", ["A", [["NB", ["BPA", "PA"]], "A"]]]]],
            B: [false, (p, f) => [...moveForward(p, f), true], ["B", ["PANF", ["B", [["PA", ["ANB", "NB"]], "B"]]]]],
        },
    }),
};

const BranchingFractalRuleSet: Record<string, BranchingFractalInfo> = {
    "peano-sierpinski-carpet": PeanoSierpinskiCarpetRules,
    "sierpinski-carpet": SierpinskiCarpetRules,
    "sierpinski-triangle-skeleton": SierpinskiTriangleSkeletonRules,
    "t-square": TSquareRules,
    "vicsek-fractal": VicsekFractalRules,
};
export default BranchingFractalRuleSet;
