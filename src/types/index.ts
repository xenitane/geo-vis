import { FC } from "react";
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
	Icon: IconType;
	text: string;
	link: (repo: string) => string;
}
export type Point = [number, number];

export type LinearOperator = (p: Point, f: Point) => [Point, Point];

export interface GeoObjInfo {
	name: string;
	Image?: FC<SVGProps>;
	maxDepth: number;
}
type LinearFractalRule = [true, LinearOperator] | [false, LinearOperator, string];

export interface LinearFractalOptions {
	depth: number;
	colored: boolean;
	animate: boolean;
	rules: Record<string, LinearFractalRule>;
	interval: { i: NodeJS.Timeout | undefined };
}

export interface LinearFractalInfo extends GeoObjInfo {
	rules: () => { rules: Record<string, LinearFractalRule>; shift: number };
}

type FillFractalRule = [true, () => void] | [false, () => void, string];

export interface FillFractalOptions {
	depth: number;
	colored: boolean;
	animate: boolean;
	rules: Record<string, FillFractalRule>;
	interval: { i: NodeJS.Timeout | undefined };
}

export interface FillFractalInfo extends GeoObjInfo {
	rules: () => { rules: Record<string, FillFractalRule>; shift: number };
}

export type IncludeClassName<T> = T & { className?: string };
