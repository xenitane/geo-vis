import { genCentersV, genCentersVC, genCentersVS, polyVGen } from "!/utils/fracUtils";

const SierpinskiTriangleRules: FillFractalInfo = {
    name: "Sierpinski Triangle",
    maxOrder: 7,
    rules: () => {
        const sides = 3;
        const ratio = 1 / 2;
        const o_rad = 900 / Math.sin((2 * Math.PI) / 3);
        let i_rad = o_rad * (1 - ratio);
        return {
            origin: [0, (o_rad * (1 - Math.cos(Math.PI / sides))) / 2],
            rules: (centers, invCenters) => {
                const newCenters = genCentersV(centers, sides, i_rad);
                i_rad *= ratio;
                return [newCenters, invCenters];
            },
            polyVGen: (d) => (c) => polyVGen(c, sides, o_rad * Math.pow(ratio, d)),
        };
    },
};
const SierpinskiPentagonRules: FillFractalInfo = {
    name: "Sierpinski Pentagon",
    maxOrder: 5,
    rules: () => {
        const sides = 5;
        const ratio = 1 / (1 + 2 * Math.cos(Math.PI / sides));
        const o_rad = 900 / Math.sin((2 * Math.PI) / sides);
        let i_rad = o_rad * (1 - ratio);
        return {
            origin: [0, (o_rad * (1 - Math.cos(Math.PI / sides))) / 2],
            rules: (centers, invCenters) => {
                const newCenters = genCentersV(centers, sides, i_rad);
                i_rad *= ratio;
                return [newCenters, invCenters];
            },
            polyVGen: (d) => (c) => polyVGen(c, sides, o_rad * Math.pow(ratio, d)),
        };
    },
};
const SierpinskiHexagonRules: FillFractalInfo = {
    name: "Sierpinski Hexagon",
    maxOrder: 5,
    rules: () => {
        const sides = 6;
        const ratio = 1 / 3;
        const o_rad = 900;
        let i_rad = o_rad * (1 - ratio);
        return {
            origin: [0, 0],
            rules: (centers, invCenters) => {
                const newCenters = genCentersV(centers, sides, i_rad);
                i_rad *= ratio;
                return [newCenters, invCenters];
            },
            polyVGen: (d) => (c) => polyVGen(c, sides, o_rad * Math.pow(ratio, d)),
        };
    },
};
const PentaFlakeRules: FillFractalInfo = {
    name: "Pentaflake",
    maxOrder: 5,
    rules: () => {
        const sides = 5;
        const ratio = 1 / (1 + 2 * Math.cos(Math.PI / sides));
        const o_rad = 900 / Math.sin((2 * Math.PI) / sides);
        let i_rad = o_rad * (1 - ratio);
        return {
            origin: [0, (o_rad * (1 - Math.cos(Math.PI / sides))) / 2],
            rules: (centers: Point[], invCenters: Point[]) => {
                const allCenters = genCentersVC(centers, invCenters, sides, i_rad);
                i_rad *= ratio;
                return allCenters;
            },
            polyVGen: (d, flip) => (c: Point) => polyVGen(c, sides, o_rad * Math.pow(ratio, d), flip ? Math.PI : 0),
        };
    },
};
const HexaFlakeRules: FillFractalInfo = {
    name: "Hexaflake",
    maxOrder: 5,
    rules: () => {
        const sides = 6;
        const ratio = 1 / 3;
        const o_rad = 900;
        let i_rad = o_rad * (1 - ratio);
        return {
            origin: [0, (o_rad * (1 - Math.cos(Math.PI / sides))) / 2],
            rules: (centers: Point[], invCenters: Point[]) => {
                const allCenters = genCentersVC(centers, invCenters, sides, i_rad);
                i_rad *= ratio;
                return allCenters;
            },
            polyVGen: (d, flip) => (c: Point) => polyVGen(c, sides, o_rad * Math.pow(ratio, d), flip ? Math.PI : 0),
        };
    },
};
const HexNutRules: FillFractalInfo = {
    name: "Hex Nut",
    maxOrder: 5,
    rules: () => {
        const sides = 6;
        const ratio = 1 / 3;
        const o_rad = 900;
        let i_rad = o_rad * (1 - ratio) * Math.cos(Math.PI / 6);
        return {
            origin: [0, 0],
            rules: (centers, invCenters) => {
                const newCenters = genCentersV(centers, sides, i_rad, Math.PI / 6);
                i_rad *= ratio;
                return [newCenters, invCenters];
            },
            polyVGen: (d, flip) => (c: Point) => polyVGen(c, sides, o_rad * Math.pow(ratio, d), flip ? Math.PI : 0),
        };
    },
};

const HexPoolRules: FillFractalInfo = {
    name: "Hex Pool",
    maxOrder: 5,
    rules: () => {
        const sides = 6;
        const ratio = 1 / 3;
        const o_rad = 900;
        let i_rad = o_rad * (1 - ratio) * Math.cos(Math.PI / 6);
        return {
            origin: [0, 0],
            rules: (centers, invCenters) => {
                const allcenters = genCentersVC(centers, invCenters, sides, i_rad, Math.PI / 6);
                i_rad *= ratio;
                return allcenters;
            },
            polyVGen: (d, flip) => (c: Point) => polyVGen(c, sides, o_rad * Math.pow(ratio, d), flip ? Math.PI : 0),
        };
    },
};

const SierpinskiCarpetRules: FillFractalInfo = {
    name: "Sierpinski Carpet",
    maxOrder: 5,
    rules: () => {
        const o_rad = 900 * Math.sqrt(2);
        const ratio = 1 / 3;
        const sides = 4;
        const i_rad: [number, number] = [o_rad * (1 - ratio), (o_rad * (1 - ratio)) / Math.sqrt(2)];
        return {
            origin: [0, 0],
            polyVGen: (d) => (c) => polyVGen(c, 4, o_rad * Math.pow(ratio, d), Math.PI / 4),
            rules: (centers, invCenters) => {
                const newCenters = genCentersVS(centers, sides, i_rad);
                i_rad[0] *= ratio;
                i_rad[1] *= ratio;
                return [newCenters, invCenters];
            },
        };
    },
};

const VicsekFractalRules: FillFractalInfo = {
    name: "VicSek Fractal",
    maxOrder: 6,
    rules: () => {
        const o_rad = 900 * Math.sqrt(2);
        const ratio = 1 / 3;
        const sides = 4;
        let i_rad = o_rad * (1 - ratio);
        return {
            origin: [0, 0],
            polyVGen: (d) => (c) => polyVGen(c, 4, o_rad * Math.pow(ratio, d), Math.PI / 4),
            rules: (centers, invCenter) => {
                const allCenters = genCentersVC(centers, invCenter, sides, i_rad, Math.PI / 4);
                i_rad *= ratio;
                return allCenters;
            },
        };
    },
};

const VicsekFractal2Rules: FillFractalInfo = {
    name: "VicSek Fractal 2",
    maxOrder: 6,
    rules: () => {
        const o_rad = 900 * Math.sqrt(2);
        const ratio = 1 / 3;
        const sides = 4;
        let i_rad = (o_rad * (1 - ratio)) / Math.sqrt(2);
        return {
            origin: [0, 0],
            polyVGen: (d) => (c) => polyVGen(c, 4, o_rad * Math.pow(ratio, d), Math.PI / 4),
            rules: (centers, invCenter) => {
                const allCenters = genCentersVC(centers, invCenter, sides, i_rad);
                i_rad *= ratio;
                return allCenters;
            },
        };
    },
};

const FillFractalRuleSet: Record<string, FillFractalInfo> = {
    "hex-nut": HexNutRules,
    "hex-pool": HexPoolRules,
    "hexa-flake": HexaFlakeRules,
    "penta-flake": PentaFlakeRules,
    "sierpinski-carpet": SierpinskiCarpetRules,
    "sierpinski-hexagon": SierpinskiHexagonRules,
    "sierpinski-pentagon": SierpinskiPentagonRules,
    "sierpinski-triangle": SierpinskiTriangleRules,
    "vicsek-fractal": VicsekFractalRules,
    "vicsek-fractal-2": VicsekFractal2Rules,
};

export default FillFractalRuleSet;
