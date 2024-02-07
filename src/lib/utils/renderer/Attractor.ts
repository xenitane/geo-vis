import { AttractorOptions, Point } from "@/types";
import { add, createSVGCircleElement, multiply } from "@/lib/utils";

export function AttractorRenderer(SVGRef: SVGSVGElement, { order, animate, AttractorInfo, interval }: AttractorOptions) {
	const cap = Math.pow(10, order);
	const scale = AttractorInfo.scale;
	const shift = AttractorInfo.shift;
	const or_qty = AttractorInfo.origins.length;

	if (animate) {
		const points: Point[][] = Array.from({ length: or_qty }, (_, j) =>
			Array.from({ length: cap }, () => {
				return [AttractorInfo.origins[j][0], AttractorInfo.origins[j][1]];
			})
		);
		const pointSvgs: SVGCircleElement[][] = points.map((parr) =>
			parr.map((p) => {
				const [x, y] = multiply(add(p, shift), scale);
				const elm = createSVGCircleElement({
					x,
					y: -y,
					color: [0, 0, 0],
				});
				SVGRef.appendChild(elm);
				return elm;
			})
		);

		let i = 0;
		interval.i = setInterval(() => {
			for (let j = 0; j < or_qty; j++) points[j][(i + 1) % cap] = AttractorInfo.rules(points[j][i]);
			i = (i + 1) % cap;
			for (let j = 0; j < or_qty; j++) {
				const [x, y] = multiply(add(points[j][i], shift), scale);
				if (isNaN(x) || isNaN(y)) {
					throw new Error("wtf");
				}
				pointSvgs[j][i].setAttributeNS(null, "cx", `${x}`);
				pointSvgs[j][i].setAttributeNS(null, "cy", `${-y}`);
			}
		}, 1);
	} else {
		const origins = AttractorInfo.origins;
		for (let i = 0; i < Math.pow(10, order); i++) {
			for (let j = 0; j < or_qty; j++) {
				const [x, y] = multiply(add(origins[j], shift), scale);
				if (isNaN(x) || isNaN(y)) {
					throw new Error("wtf");
				}
				SVGRef.appendChild(createSVGCircleElement({ x, y: -y, color: [0, 0, 0] }));
				origins[j] = AttractorInfo.rules(origins[j]);
			}
		}
	}
}
