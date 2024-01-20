import {
	hexaflake,
	hexnut,
	hexpool,
	pentaflake,
	sierpinskiCarpet,
	sierpinskiHexagon,
	sierpinskiPentagon,
	sierpinskiTriangle,
	vicsekFractal,
} from "@/assets/Thumbnails/fill";
import { FillFractalInfo, Point } from "@/types";

import { genCentersV, genCentersVC, genCentersVS, polyVGen } from "@/lib/utils";

const SierpinskiTriangle: FillFractalInfo = {
	name: "Sierpinski Triangle",
	image: sierpinskiTriangle,
	maxDepth: 7,
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
const SierpinskiPentagon: FillFractalInfo = {
	name: "Sierpinski Pentagon",
	image: sierpinskiPentagon,
	maxDepth: 5,
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
const SierpinskiHexagon: FillFractalInfo = {
	name: "Sierpinski Hexagon",
	image: sierpinskiHexagon,
	maxDepth: 5,
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
const PentaFlake: FillFractalInfo = {
	name: "Pentaflake",
	image: pentaflake,
	maxDepth: 5,
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
const HexaFlake: FillFractalInfo = {
	name: "Hexaflake",
	image: hexaflake,
	maxDepth: 5,
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
const HexNut: FillFractalInfo = {
	name: "Hex Nut",
	maxDepth: 5,
	image: hexnut,
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

const HexPool: FillFractalInfo = {
	name: "Hex Pool",
	maxDepth: 5,
	image: hexpool,
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

const SierpinskiCarpet: FillFractalInfo = {
	name: "Sierpinski Carpet",
	maxDepth: 5,
	image: sierpinskiCarpet,
	rules: () => {
		const o_rad = 900 * Math.sqrt(2);
		const ratio = 1 / 3;
		const sides = 4;
		let i_rad: [number, number] = [o_rad * (1 - ratio), (o_rad * (1 - ratio)) / Math.sqrt(2)];
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

const VicsekFractal: FillFractalInfo = {
	name: "VicSek Fractal",
	maxDepth: 6,
	image: vicsekFractal,
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

const FillFractalRuleSet: Record<string, FillFractalInfo> = {
	"sierpinski-triangle": SierpinskiTriangle,
	"sierpinski-pentagon": SierpinskiPentagon,
	"penta-flake": PentaFlake,
	"sierpinski-hexagon": SierpinskiHexagon,
	"hexa-flake": HexaFlake,
	"hex-nut": HexNut,
	"hex-pool": HexPool,
	"sierpinski-carpet": SierpinskiCarpet,
	"vicsek-fractal": VicsekFractal,
};

export default FillFractalRuleSet;
