import { FillFractalOptions } from "@/types";

export function FillRenderer(SVGRef: SVGSVGElement, { animate, depth, rules, colored, interval }: FillFractalOptions) {
	console.log(SVGRef, animate, depth, rules, colored, interval);
}
