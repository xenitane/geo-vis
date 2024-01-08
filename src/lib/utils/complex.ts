import { Point } from "@/types";

export function multiply(a: Point, b: Point): Point {
	const x = Math.round(1000000 * (a[0] * b[0] - a[1] * b[1])) / 1000000;
	const y = Math.round(1000000 * (a[0] * b[1] + a[1] * b[0])) / 1000000;
	return [x, y];
}

export function add(a: Point, b: Point): Point {
	return [a[0] + b[0], a[1] + b[1]];
}
export function subtract(a: Point, b: Point): Point {
	return [a[0] - b[0], a[1] - b[1]];
}

export function real(a: Point) {
	return a[0];
}
export function imag(a: Point) {
	return a[1];
}

export function mod(a: Point) {
	return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
}

export function arg(a: Point) {
	if (a[0] === 0) return (Math.PI * Math.sign(a[1])) / 2;
	let angle = Math.atan(a[1] / a[0]);
	if (a[0] > 0) return angle;
	angle -= Math.PI;
	return Math.sign(-a[1]) * angle;
}

export function compliment(a: Point): Point {
	return [a[0], -a[1]];
}

export function divide(a: Point, b: Point): Point {
	const modb = Math.pow(mod(b), 2);
	if (modb === 0) throw new Error("division by zero not possible.");
	else {
		const [x, y] = multiply(a, compliment(b));
		return [x / modb, y / modb];
	}
}

export function rotate(v: Point, angle: number) {
	return multiply(v, [Math.cos(angle), Math.sin(angle)]);
}
