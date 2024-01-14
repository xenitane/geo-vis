import { Point } from "@/types";

export function multiply(a: Point, b: Point): Point {
	const x = Math.round(1000000 * (a[0] * b[0] - a[1] * b[1])) / 1000000;
	const y = Math.round(1000000 * (a[0] * b[1] + a[1] * b[0])) / 1000000;
	return [x, y];
}

export function add(a: Point, b: Point): Point {
	return [a[0] + b[0], a[1] + b[1]];
}

export function rotate(v: Point, angle: number) {
	return multiply(v, [Math.cos(angle), Math.sin(angle)]);
}
