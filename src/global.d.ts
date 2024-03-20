import { IconType } from "react-icons";

declare global {
    type Theme = "system" | "light" | "dark";
    type VisTypes = "linear" | "fill" | "branching" | "attractor";

    type ArrayOfTAndSelf<T> = T | [T, ArrayOfTAndSelf<T>[]];
    type IncludeClassName<T> = T & { className?: string };
    type SVGProps = React.SVGProps<SVGSVGElement>;
    type HTMLProps = React.HTMLProps<HTMLElement>;

    type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

    interface ProjectFooterLiType {
        Icon: IconType;
        text: string;
        link: (repo: string) => string;
    }

    type Point = [number, number];

    interface GeoObjOptions {
        order: number;
        colored: boolean;
        animate: boolean;
        interval: { i?: NodeJS.Timeout };
    }
    interface GeoObjInfo {
        name: string;
        maxOrder: number;
    }

    type LinearOperator = (p: Point, f: Point) => [Point, Point];
    type LinearFractalRule = [true, LinearOperator] | [false, LinearOperator, string];
    interface LinearFractalOptions extends GeoObjOptions {
        FractalInfo: { rules: Record<string, LinearFractalRule>; shift: number };
    }
    interface LinearFractalInfo extends GeoObjInfo {
        rules: () => PropType<LinearFractalOptions, "FractalInfo">;
    }

    type FillFractalRule = (centers: Point[], invCenters: Point[]) => [Point[], Point[]];
    interface FillFractalOptions extends GeoObjOptions {
        FractalInfo: {
            origin: Point;
            rules: FillFractalRule;
            polyVGen: (n: number, flip: boolean) => (c: Point) => Point[];
        };
    }
    interface FillFractalInfo extends GeoObjInfo {
        rules: () => PropType<FillFractalOptions, "FractalInfo">;
    }

    type BranchOperator = (p: Point, f: Point) => [Point, Point, boolean];
    type BranchingFractalRule = [false, BranchOperator, ArrayOfTAndSelf<string>] | [true, BranchOperator];
    interface BranchingFractalOptions extends GeoObjOptions {
        FractalInfo: { shift: number; rules: Record<string, BranchingFractalRule>; stay: boolean };
    }
    interface BranchingFractalInfo extends GeoObjInfo {
        rules: () => PropType<BranchingFractalOptions, "FractalInfo">;
    }

    type AttractorOperator = (p: Point) => Point;
    interface AttractorInfo extends GeoObjInfo {
        symbolNames: [string, number][];
        rules: (symbols: Record<string, number>) => PropType<AttractorOptions, "AttractorInfo">;
    }
    interface AttractorOptions extends GeoObjOptions {
        AttractorInfo: { rules: AttractorOperator; origins: Point[]; scale: Point; shift: Point };
    }
}
