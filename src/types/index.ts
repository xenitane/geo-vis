import { IconType } from "react-icons";

export type Theme = "system" | "light" | "dark";

export type SVGProps = React.SVGProps<SVGSVGElement>;
export type DIVProps = React.HTMLProps<HTMLDivElement>;
export type HTMLProps = React.HTMLProps<HTMLElement>;

type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];
export interface ProjectFooterLiType {
	Icon: IconType;
	text: string;
	link: (repo: string) => string;
}
export type Point = [number, number];

export type LinearOperator = (p: Point, f: Point) => [Point, Point];

export interface GeoObjInfo {
	name: string;
	image: string;
	maxDepth: number;
}
type LinearFractalRule = [true, LinearOperator] | [false, LinearOperator, string];

export interface LinearFractalOptions {
	depth: number;
	colored: boolean;
	animate: boolean;
	FractalInfo: { rules: Record<string, LinearFractalRule>; shift: number };
	interval: { i: NodeJS.Timeout | undefined };
}

export interface LinearFractalInfo extends GeoObjInfo {
	rules: () => PropType<LinearFractalOptions, "FractalInfo">;
}

type FillFractalRule = (centers: Point[], invCenters: Point[]) => [Point[], Point[]];

export interface FillFractalOptions {
	depth: number;
	colored: boolean;
	animate: boolean;
	FractalInfo: {
		origin: Point;
		rules: FillFractalRule;
		polyVGen: (n: number, flip: boolean) => (c: Point) => Point[];
	};
	interval: { up: NodeJS.Timeout | undefined; down: NodeJS.Timeout | undefined };
}

export interface FillFractalInfo extends GeoObjInfo {
	rules: () => PropType<FillFractalOptions, "FractalInfo">;
}

export type IncludeClassName<T> = T & { className?: string };
