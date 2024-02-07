import { IconType } from "react-icons";

export type Theme = "system" | "light" | "dark";

export type ArrayOfTAndSelf<T> = T | [T, ArrayOfTAndSelf<T>[]];
export type IncludeClassName<T> = T & { className?: string };
export type SVGProps = React.SVGProps<SVGSVGElement>;
export type DIVProps = React.HTMLProps<HTMLDivElement>;
export type HTMLProps = React.HTMLProps<HTMLElement>;

export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

export interface ProjectFooterLiType {
	Icon: IconType;
	text: string;
	link: (repo: string) => string;
}

export type Point = [number, number];

export interface GeoObjOptions {
	order: number;
	colored: boolean;
	animate: boolean;
	interval: { i?: NodeJS.Timeout };
}
export interface GeoObjInfo {
	name: string;
	image: string;
	maxOrder: number;
}

export type LinearOperator = (p: Point, f: Point) => [Point, Point];
type LinearFractalRule = [true, LinearOperator] | [false, LinearOperator, string];
export interface LinearFractalOptions extends GeoObjOptions {
	FractalInfo: { rules: Record<string, LinearFractalRule>; shift: number };
}
export interface LinearFractalInfo extends GeoObjInfo {
	rules: () => PropType<LinearFractalOptions, "FractalInfo">;
}

type FillFractalRule = (centers: Point[], invCenters: Point[]) => [Point[], Point[]];
export interface FillFractalOptions extends GeoObjOptions {
	FractalInfo: {
		origin: Point;
		rules: FillFractalRule;
		polyVGen: (n: number, flip: boolean) => (c: Point) => Point[];
	};
}
export interface FillFractalInfo extends GeoObjInfo {
	rules: () => PropType<FillFractalOptions, "FractalInfo">;
}

type BranchOperator = (p: Point, f: Point) => [Point, Point, boolean];
export type BranchingFractalRule = [false, BranchOperator, ArrayOfTAndSelf<string>] | [true, BranchOperator];
export interface BranchingFractalOptions extends GeoObjOptions {
	FractalInfo: { shift: number; rules: Record<string, BranchingFractalRule>; stay: boolean };
}
export interface BranchingFractalInfo extends GeoObjInfo {
	rules: () => PropType<BranchingFractalOptions, "FractalInfo">;
}

type AttractorOperator = (p: Point) => Point;
export interface AttractorInfo extends GeoObjInfo {
	symbolNames: [string, number][];
	rules: (symbols: Record<string, number>) => PropType<AttractorOptions, "AttractorInfo">;
}
export interface AttractorOptions extends GeoObjOptions {
	AttractorInfo: { rules: AttractorOperator; origins: Point[]; scale: Point; shift: Point };
}
