const thumbResolver = (kind: VisTypes, image: string) => `/geo-vis/thumbs/${kind}/${image}`;

const visualData: VisData = {
    linear: {
        "cross-stitch-curve": { name: "Cross Stitch Curve", image: thumbResolver("linear", "cross-stitch-curve.svg") },
        "dragon-curve": { name: "Dragon Curve", image: thumbResolver("linear", "dragon-curve.svg") },
        "fibonacci-word-fractal": {
            name: "Fibonacci Word Fractal",
            image: thumbResolver("linear", "fibonacci-word-fractal.svg"),
        },
        "gosper-curve": { name: "Gosper Curve", image: thumbResolver("linear", "gosper-curve.svg") },
        "gosper-island": { name: "Gosper Island", image: thumbResolver("linear", "gosper-island.svg") },
        "hilbert-curve-2": { name: "Hilbert Curve 2", image: thumbResolver("linear", "hilbert-curve-2.svg") },
        "hilbert-curve": { name: "Hilbert Curve", image: thumbResolver("linear", "hilbert-curve.svg") },
        "koch-anti-snowflake": { name: "Koch Anti Snowflake", image: thumbResolver("linear", "koch-anti-snow-flake.svg") },
        "koch-snowflake": { name: "Koch Snowflake", image: thumbResolver("linear", "koch-snow-flake.svg") },
        "levy-c-curve": { name: "Levy C Curve", image: thumbResolver("linear", "levy-c-curve.svg") },
        "minkowski-island": { name: "Minkowski Island", image: thumbResolver("linear", "minkowski-island.svg") },
        "peano-curve": { name: "Peano Curve", image: thumbResolver("linear", "peano-curve.svg") },
        "quardratic-island": { name: "Quardratic Island", image: thumbResolver("linear", "quardratic-island.svg") },
        "quardratic-koch-island": {
            name: "Quardratic Koch Island",
            image: thumbResolver("linear", "quardratic-koch-island.svg"),
        },
        "sierpinski-arrow-head": {
            name: "Sierpinski Arrow Head",
            image: thumbResolver("linear", "sierpinski-arrowhead.svg"),
        },
        "sierpinski-triangle": { name: "Sierpinski Triangle", image: thumbResolver("linear", "sierpinski-triangle.svg") },
        "t-square": { name: "T Square", image: thumbResolver("linear", "t-square.svg") },
        "vicsek-fractal": { name: "Vicsek Fractal", image: thumbResolver("linear", "vicsek-fractal.svg") },
        "vicsek-fractal-2": { name: "Vicsek Fractal 2", image: thumbResolver("linear", "vicsek-fractal-2.svg") },
    },
    fill: {
        "hex-nut": { name: "Hex Nut", image: thumbResolver("fill", "hexnut.svg") },
        "hex-pool": { name: "Hex Pool", image: thumbResolver("fill", "hexpool.svg") },
        "hexa-flake": { name: "Hexaflake", image: thumbResolver("fill", "hexaflake.svg") },
        "penta-flake": { name: "Pentaflake", image: thumbResolver("fill", "pentaflake.svg") },
        "sierpinski-carpet": { name: "Sierpinski Triangle", image: thumbResolver("fill", "sierpinski-carpet.svg") },
        "sierpinski-hexagon": { name: "Sierpinksi Hexagon", image: thumbResolver("fill", "sierpinski-hexagon.svg") },
        "sierpinski-pentagon": { name: "Sierpinski Pentagon", image: thumbResolver("fill", "sierpinski-pentagon.svg") },
        "sierpinski-triangle": { name: "Sierpinski Triangle", image: thumbResolver("fill", "sierpinski-triangle.svg") },
        "vicsek-fractal": { name: "Vicsek Fractal", image: thumbResolver("fill", "vicsek-fractal.svg") },
        "vicsek-fractal-2": { name: "Vicsek Fractal 2", image: thumbResolver("fill", "vicsek-fractal-2.svg") },
    },
    branching: {
        "peano-sierpinski-carpet": {
            name: "Peano Sierpinski Carpet",
            image: thumbResolver("branching", "peano-sierpinski-carpet.svg"),
        },
        "sierpinski-carpet": { name: "Sierpinski Carpet", image: thumbResolver("branching", "sierpinski-carpet.svg") },
        "sierpinski-triangle-skeleton": {
            name: "Sierpinski Triangle Skeleton",
            image: thumbResolver("branching", "sierpinski-triangle-skeleton.svg"),
        },
        "t-square": { name: "T Square", image: thumbResolver("branching", "t-square.svg") },
        "vicsek-fractal": { name: "Vicsek Fractal", image: thumbResolver("branching", "vicsek-fractal.svg") },
    },
    attractor: {
        "gingerbread-man": { name: "Gingerbread Man", image: thumbResolver("attractor", "gingerbread-man.svg") },
        "tinker-bell": { name: "Tinker Bell Attractor", image: thumbResolver("attractor", "tinkerbell-map.svg") },
    },
};
export default visualData;
