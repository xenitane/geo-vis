import { LinearFractalOptions, Point } from "@/types";
import { createSVGPathLineElement } from "@/lib/utils/svgPathGen";

export function LinearRenderer(SVGRef: SVGSVGElement, { animate, colored, depth, rules, interval }: LinearFractalOptions) {
	let cursor: Point = [0, 0];
	let direction: Point = [1, 0];
	const points: Point[] = [[0, 0]];
	const bounds: [Point, Point] = [
		[0, 0],
		[0, 0],
	];

	(function build(n: number, symbol: string) {
		if (rules[symbol][0] || n === 0) {
			[cursor, direction] = rules[symbol][1](cursor, direction);
			if (cursor[0] !== points.at(-1)![0] || cursor[1] !== points.at(-1)![1]) points.push(cursor);
			bounds[0][0] = Math.min(bounds[0][0], cursor[0]);
			bounds[0][1] = Math.min(bounds[0][1], cursor[1]);
			bounds[1][0] = Math.max(bounds[1][0], cursor[0]);
			bounds[1][1] = Math.max(bounds[1][1], cursor[1]);
		} else [...rules[symbol][2]!].forEach((s) => build(n - 1, s));
	})(depth, "I");
	const origin: Point = [(bounds[1][0] + bounds[0][0]) / 2, (bounds[1][1] + bounds[0][1]) / 2];
	const scale: number = 1800 / Math.max(bounds[1][0] - bounds[0][0], bounds[1][1] - bounds[0][1]);
	points.forEach((p) => {
		p[0] = (p[0] - origin[0]) * scale;
		p[1] = (p[1] - origin[1]) * scale;
	});

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
						width: 2,
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
					width: 2,
					color: [0, 0, 0],
					start: points[i - 1],
					end: points[i],
				})
			);
	}
}
