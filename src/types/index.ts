import { IconType } from "react-icons";

export enum Theme {
	system = -1,
	light,
	dark,
}

export type SVGProps = React.SVGProps<SVGSVGElement>;
export type DIVProps = React.HTMLProps<HTMLDivElement>;
export type HTMLProps = React.HTMLProps<HTMLElement>;

export interface ProjectFooterLiType {
	icon: IconType;
	text: string;
	link: (repo: string) => string;
}
export type Point = [number, number];

export type LinearOperator = (p: Point, f: Point) => [Point, Point];

export interface GeoObjInfo {
	name: string;
	Image?: (props: SVGProps) => JSX.Element;
}

export interface LinearFractalOptions {
	depth: number;
	colored: boolean;
	animate: boolean;
	// id: string;
	rules: Record<string, [boolean, LinearOperator, string?]>;
}

type LinearFractalRule = [true, LinearOperator] | [false, LinearOperator, string];

export interface LinearFractalInfo extends GeoObjInfo {
	maxDepth: number;
	rules: Record<string, LinearFractalRule>;
}
export interface FillFractalInfo extends GeoObjInfo {
	maxDepth: number;
}
