import { fibonacciWordFractal } from "@/assets/Thumbnails";
import { FillFractalInfo, Point } from "@/types";
import { add, rotate } from "../utils";

function genCentersV(centers: Point[], sides: number, i_rad: number, shift = 0) {
	const newCenters: Point[] = [];
	for (const center of centers) {
		let dir: Point = rotate([0, -i_rad], shift);
		for (let j = 0; j < sides; j++) {
			newCenters.push(add(center, dir));
			dir = rotate(dir, (2 * Math.PI) / sides);
		}
	}
	return newCenters;
}

function genCentersVC(centers: Point[], invCenters: Point[], sides: number, i_rad: number): [Point[], Point[]] {
	const newCenters: Point[] = [];
	const newInvCenters: Point[] = [];
	for (const center of centers) {
		newInvCenters.push(center);
		let dir: Point = [0, -i_rad];
		for (let j = 0; j < sides; j++) {
			newCenters.push(add(center, dir));
			dir = rotate(dir, (2 * Math.PI) / sides);
		}
	}
	for (const invCenter of invCenters) {
		newCenters.push(invCenter);
		let dir: Point = [0, i_rad];
		for (let j = 0; j < sides; j++) {
			newInvCenters.push(add(invCenter, dir));
			dir = rotate(dir, (2 * Math.PI) / sides);
		}
	}

	return [newCenters, newInvCenters];
}

function polyVGen(center: Point, sides: number, o_rad: number, shift = 0) {
	const vertices: Point[] = [];
	let dir: Point = rotate([0, -o_rad], shift);
	for (let i = 0; i < sides; i++) {
		vertices.push(add(center, dir));
		dir = rotate(dir, (2 * Math.PI) / sides);
	}
	return vertices;
}

const SierpinskiTriangle: FillFractalInfo = {
	name: "Sierpinski Triangle",
	image: fibonacciWordFractal,
	maxDepth: 7,
	rules: () => {
		const sides = 3;
		const ratio = 1 / 2;
		const o_rad = 900 / Math.sin((2 * Math.PI) / 3);
		let i_rad = o_rad * (1 - ratio);
		return {
			origin: [0, (o_rad * (1 - Math.cos(Math.PI / sides))) / 2],
			rules: (centers: Point[], invCenters: Point[]) => {
				const newCenters: Point[] = genCentersV(centers, sides, i_rad);
				i_rad *= ratio;
				return [newCenters, invCenters];
			},
			polyVGen: (d) => (c: Point) => polyVGen(c, sides, o_rad * Math.pow(ratio, d)),
		};
	},
};
const SierpinskiPentagon: FillFractalInfo = {
	name: "Sierpinski Pentagon",
	image: fibonacciWordFractal,
	maxDepth: 5,
	rules: () => {
		const sides = 5;
		const ratio = 1 / (1 + 2 * Math.cos(Math.PI / sides));
		const o_rad = 900 / Math.sin((2 * Math.PI) / sides);
		let i_rad = o_rad * (1 - ratio);
		return {
			origin: [0, (o_rad * (1 - Math.cos(Math.PI / sides))) / 2],
			rules: (centers: Point[], invCenters: Point[]) => {
				const newCenters: Point[] = genCentersV(centers, sides, i_rad);
				i_rad *= ratio;
				return [newCenters, invCenters];
			},
			polyVGen: (d) => (c: Point) => polyVGen(c, sides, o_rad * Math.pow(ratio, d)),
		};
	},
};
const SierpinskiHexagon: FillFractalInfo = {
	name: "Sierpinski Hexagon",
	image: fibonacciWordFractal,
	maxDepth: 5,
	rules: () => {
		const sides = 6;
		const ratio = 1 / 3;
		const o_rad = 900;
		let i_rad = o_rad * (1 - ratio);
		return {
			origin: [0, 0],
			rules: (centers: Point[], invCenters: Point[]) => {
				const newCenters: Point[] = genCentersV(centers, sides, i_rad);
				i_rad *= ratio;
				return [newCenters, invCenters];
			},
			polyVGen: (d) => (c: Point) => polyVGen(c, sides, o_rad * Math.pow(ratio, d)),
		};
	},
};
const PentaFlake: FillFractalInfo = {
	name: "Pentaflake",
	image: fibonacciWordFractal,
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
	image: fibonacciWordFractal,
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
	image: fibonacciWordFractal,
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

const FillFractalRuleSet: Record<string, FillFractalInfo> = {
	"sierpinski-triangle": SierpinskiTriangle,
	"sierpinski-pentagon": SierpinskiPentagon,
	"sierpinski-hexagon": SierpinskiHexagon,
	"penta-flake": PentaFlake,
	"hexa-flake": HexaFlake,
	"hex-nut": HexNut,
};

export default FillFractalRuleSet;
