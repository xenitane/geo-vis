import { Point } from "@/types";

function rgbToHex(a: [number, number, number]) {
	return ((1 << 24) | (a[0] << 16) | (a[1] << 8) | a[2]).toString(16).slice(1);
}

interface SVGPathLineElementProps {
	width: number;
	color: [number, number, number];
	start: Point;
	end: Point;
}

export function createSVGPathLineElement({ width, color, start, end }: SVGPathLineElementProps) {
	const element = document.createElementNS("http://www.w3.org/2000/svg", "path");
	element.setAttributeNS(null, "stroke", `#${rgbToHex(color)}`);
	element.setAttributeNS(null, "stroke-width", `${width}px`);
	element.setAttributeNS(null, "stroke-linejoin", "round");
	element.setAttributeNS(null, "stroke-linecap", "round");
	element.setAttributeNS(null, "d", `M ${start[0]} ${start[1]} L ${end[0]} ${end[1]}`);
	return element;
}

interface SVGPathPolygonElementProps {
	color: [number, number, number];
	points: Point[];
}

export function createSVGPathPolygonElement({ color, points }: SVGPathPolygonElementProps) {
	const element = document.createElementNS("http://www.w3.org/2000/svg", "path");
	element.setAttributeNS(null, "fill", `#${rgbToHex(color)}`);
	element.setAttributeNS(null, "stroke-width", "0");
	element.setAttributeNS(null, "stroke-linejoin", "round");
	element.setAttributeNS(null, "stroke-linecap", "round");
	element.setAttributeNS(null, "d", `M ${points.map((p) => `${p[0]} ${p[1]}`).join(" L ")} Z`);
	return element;
}

interface SVGCircleElementProps {
	x: number;
	y: number;
	r: number;
	color: [number, number, number];
}

export function createSVGCircleElement({ x, y, r, color }: SVGCircleElementProps) {
	const element = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	element.setAttributeNS(null, "cx", `${x}`);
	element.setAttributeNS(null, "cy", `${y}`);
	element.setAttributeNS(null, "r", `${r}`);
	element.setAttributeNS(null, "fill", `#${rgbToHex(color)}`);
	element.setAttributeNS(null, "stroke-width", "0");

	return element;
}
