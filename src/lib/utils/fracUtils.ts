import { type LinearOperator, type Point } from "@/types";
import { add, rotate } from "@/lib/utils";

export const doNothing: LinearOperator = (p, f) => [p, f];
export const moveForward: LinearOperator = (p, f) => [add(p, f), f];
export const left45: LinearOperator = (p, f) => [p, rotate(f, Math.PI / 4)];
export const left60: LinearOperator = (p, f) => [p, rotate(f, Math.PI / 3)];
export const left90: LinearOperator = (p, f) => [p, rotate(f, Math.PI / 2)];
export const left120: LinearOperator = (p, f) => [p, rotate(f, (2 * Math.PI) / 3)];
export const right45: LinearOperator = (p, f) => [p, rotate(f, -Math.PI / 4)];
export const right60: LinearOperator = (p, f) => [p, rotate(f, -Math.PI / 3)];
export const right90: LinearOperator = (p, f) => [p, rotate(f, -Math.PI / 2)];
export const right120: LinearOperator = (p, f) => [p, rotate(f, (2 * -Math.PI) / 3)];

export function genCentersV(centers: Point[], sides: number, i_rad: number, shift = 0) {
	const newCenters = [];
	for (const center of centers) {
		let dir = rotate([0, -i_rad], shift);
		for (let j = 0; j < sides; j++) {
			newCenters.push(add(center, dir));
			dir = rotate(dir, (2 * Math.PI) / sides);
		}
	}
	return newCenters;
}

export function genCentersVC(
	centers: Point[],
	invCenters: Point[],
	sides: number,
	i_rad: number,
	shift = 0
): [Point[], Point[]] {
	const newCenters = [];
	const newInvCenters = [];
	for (const center of centers) {
		newInvCenters.push(center);
		let dir = rotate([0, -i_rad], shift);
		for (let j = 0; j < sides; j++) {
			newCenters.push(add(center, dir));
			dir = rotate(dir, (2 * Math.PI) / sides);
		}
	}
	for (const invCenter of invCenters) {
		newCenters.push(invCenter);
		let dir = rotate([0, i_rad], shift);
		for (let j = 0; j < sides; j++) {
			newInvCenters.push(add(invCenter, dir));
			dir = rotate(dir, (2 * Math.PI) / sides);
		}
	}

	return [newCenters, newInvCenters];
}

export function genCentersVS(centers: Point[], sides: number, i_rad: [number, number]) {
	const newCenters = [];
	for (const center of centers) {
		let dir_0 = rotate([0, -i_rad[0]], -Math.PI / sides);
		let dir_1 = rotate([0, -i_rad[1]], 0);
		for (let j = 0; j < sides; j++) {
			newCenters.push(add(center, dir_0));
			newCenters.push(add(center, dir_1));
			dir_1 = rotate(dir_1, (2 * Math.PI) / sides);
			dir_0 = rotate(dir_0, (2 * Math.PI) / sides);
		}
	}
	return newCenters;
}

export function polyVGen(center: Point, sides: number, o_rad: number, shift = 0) {
	const vertices = [];
	let dir = rotate([0, -o_rad], shift);
	for (let i = 0; i < sides; i++) {
		vertices.push(add(center, dir));
		dir = rotate(dir, (2 * Math.PI) / sides);
	}
	return vertices;
}
