import { tinkerbellMap, gingerbreadMan } from "#/Thumbnails/attractor";
import { AttractorInfo } from "?";

const TinkerBellAttractorRules: AttractorInfo = {
    name: "Tinker Bell Attractor",
    maxOrder: 5,
    image: tinkerbellMap,
    symbolNames: [
        ["a", 0.9],
        ["b", -0.6013],
        ["c", 2.0],
        ["d", 0.5],
    ],
    rules: (symbols) => ({
        origins: [[-Math.random(), -Math.random()]],
        scale: [600, 0],
        shift: [0.5, 0.5],
        rules: ([x, y]) => {
            const x1 = x * x - y * y + symbols.a * x + symbols.b * y;
            const y1 = 2 * x * y + symbols.c * x + symbols.d * y;
            return [x1, y1];
        },
    }),
};

const GingerbreadManRules: AttractorInfo = {
    name: "Gingerbread Man",
    maxOrder: 3,
    image: gingerbreadMan,
    symbolNames: [],
    rules: () => ({
        origins: Array.from({ length: 100 }, () => [Math.random() * 5, Math.random() * 5]),
        scale: [-120 * Math.SQRT1_2, -120 * Math.SQRT1_2],
        shift: [-3, -3],
        rules: ([x, y]) => {
            const x1 = 1 - y + Math.abs(x);
            const y1 = x;
            return [x1, y1];
        },
    }),
};

const Attractors: Record<string, AttractorInfo> = {
    "gingerbread-man": GingerbreadManRules,
    "tinker-bell": TinkerBellAttractorRules,
};

export default Attractors;
