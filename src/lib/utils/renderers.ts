import { LinearFractalOptions, FillFractalOptions, Point } from "@/types";
import { createSVGPathLineElement, createSVGPathPolygonElement } from "@/lib/utils/svgPathGen";
import { rounder } from "@/lib/utils";

export function LinearRenderer(
	SVGRef: SVGSVGElement,
	{ animate, colored, depth, FractalInfo, interval }: LinearFractalOptions
) {
	let cursor: Point = [0, 0];
	let direction: Point = [1, 0];
	const points: Point[] = [[0, 0]];
	const bounds: [Point, Point] = [
		[0, 0],
		[0, 0],
	];

	(function build(n: number, symbol: string) {
		if (FractalInfo.rules[symbol][0] || n === 0) {
			[cursor, direction] = FractalInfo.rules[symbol][1](cursor, direction);
			if (cursor[0] !== points.at(-1)![0] || cursor[1] !== points.at(-1)![1]) points.push(cursor);
			bounds[0][0] = Math.min(bounds[0][0], cursor[0]);
			bounds[0][1] = Math.min(bounds[0][1], cursor[1]);
			bounds[1][0] = Math.max(bounds[1][0], cursor[0]);
			bounds[1][1] = Math.max(bounds[1][1], cursor[1]);
		} else {
			for (let i = 0; i < FractalInfo.rules[symbol][2]!.length; i++)
				build(n - 1, FractalInfo.rules[symbol][2]!.charAt(i));
		}
	})(depth + FractalInfo.shift, "I");
	const origin: Point = [(bounds[1][0] + bounds[0][0]) / 2, (bounds[1][1] + bounds[0][1]) / 2];
	const scale: number = 1800 / Math.max(bounds[1][0] - bounds[0][0], bounds[1][1] - bounds[0][1]);
	for (const point of points) {
		point[0] = rounder((point[0] - origin[0]) * scale);
		point[1] = rounder((point[1] - origin[1]) * scale);
	}

	if (colored) {
		// Todo: fill color
	}
	if (animate) {
		let i = 1;
		interval.i = setInterval(() => {
			if (i === points.length) clearInterval(interval.i);
			else {
				SVGRef.appendChild(
					createSVGPathLineElement({
						color: [0, 0, 0],
						start: points[i - 1],
						end: points[i],
					})
				);
				i++;
			}
		}, 5);
	} else {
		for (let i = 1; i < points.length; i++)
			SVGRef.appendChild(
				createSVGPathLineElement({
					color: [0, 0, 0],
					start: points[i - 1],
					end: points[i],
				})
			);
	}
}

export function FillRenderer(SVGRef: SVGSVGElement, { animate, depth, FractalInfo, colored, interval }: FillFractalOptions) {
	let centers: Point[] = [[FractalInfo.origin[0], FractalInfo.origin[1]]];
	let invCenters: Point[] = [];
	for (let _ = 0; _ < depth; _++) [centers, invCenters] = FractalInfo.rules(centers, invCenters);

	const upPolyVGen = FractalInfo.polyVGen(depth, false);
	const downPolyVGen = FractalInfo.polyVGen(depth, true);

	if (colored) {
		// todo: fill color
	}
	const polygonVertices = [
		...centers.map((center) => upPolyVGen(center)),
		...invCenters.map((invCenter) => downPolyVGen(invCenter)),
	];
	centers = [];
	invCenters = [];
	if (animate) {
		let i = 0;
		interval.up = setInterval(() => {
			if (i === polygonVertices.length) clearInterval(interval.up);
			else {
				SVGRef.appendChild(
					createSVGPathPolygonElement({
						color: [0, 0, 0],
						points: polygonVertices[i],
					})
				);
				i++;
			}
		}, 5);
	} else {
		for (const polygonVertex of polygonVertices)
			SVGRef.appendChild(
				createSVGPathPolygonElement({
					color: [0, 0, 0],
					points: polygonVertex,
				})
			);
	}
}
