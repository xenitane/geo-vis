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
}

export interface LinearFractalInfo extends GeoObjInfo {
	rules: Record<string, LinearFractalRule>;
}

type FillFractalRule = [true, () => void] | [false, () => void, string];

export interface FillFractalOptions {
	depth: number;
	colored: boolean;
	animate: boolean;
	rules: Record<string, FillFractalRule>;
}

export interface FillFractalInfo extends GeoObjInfo {
	rules: Record<string, FillFractalRule>;
}
