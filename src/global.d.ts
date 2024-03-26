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
        readonly Icon: IconType;
        readonly text: string;
        readonly link: (repo: string) => string;
    }

    type Point = [number, number];

    interface GeoObjOptions {
        readonly order: number;
        readonly colored: boolean;
        readonly animate: boolean;
        readonly interval: { i?: NodeJS.Timeout };
    }
    interface GeoObjInfo {
        readonly name: string;
        readonly maxOrder: number;
    }

    type LinearOperator = (p: Point, f: Point) => [Point, Point];
    type LinearFractalRule = [true, LinearOperator] | [false, LinearOperator, string];
    interface LinearFractalOptions extends GeoObjOptions {
        readonly FractalInfo: { readonly rules: Readonly<Record<string, LinearFractalRule>>; readonly shift: number };
    }
    interface LinearFractalInfo extends GeoObjInfo {
        readonly rules: () => PropType<LinearFractalOptions, "FractalInfo">;
    }

    type FillFractalRule = (centers: Point[], invCenters: Point[]) => [Point[], Point[]];
    interface FillFractalOptions extends GeoObjOptions {
        readonly FractalInfo: {
            readonly origin: Point;
            readonly rules: FillFractalRule;
            readonly polyVGen: (n: number, flip: boolean) => (c: Point) => Point[];
        };
    }
    interface FillFractalInfo extends GeoObjInfo {
        readonly rules: () => PropType<FillFractalOptions, "FractalInfo">;
    }

    type BranchOperator = (p: Point, f: Point) => [Point, Point, boolean];
    type BranchingFractalRule = [false, BranchOperator, ArrayOfTAndSelf<string>] | [true, BranchOperator];
    interface BranchingFractalOptions extends GeoObjOptions {
        readonly FractalInfo: {
            readonly shift: number;
            readonly rules: Readonly<Record<string, BranchingFractalRule>>;
            readonly stay: boolean;
        };
    }
    interface BranchingFractalInfo extends GeoObjInfo {
        readonly rules: () => PropType<BranchingFractalOptions, "FractalInfo">;
    }

    type AttractorOperator = (p: Point) => Point;
    interface AttractorInfo extends GeoObjInfo {
        readonly symbolNames: [string, number][];
        readonly rules: (symbols: Record<string, number>) => PropType<AttractorOptions, "AttractorInfo">;
    }
    interface AttractorOptions extends GeoObjOptions {
        readonly AttractorInfo: {
            readonly rules: AttractorOperator;
            readonly origins: Point[];
            readonly scale: Point;
            readonly shift: Point;
        };
    }
    type VisData = Readonly<Record<VisTypes, Readonly<Record<string, { readonly name: string; readonly image: string }>>>>;
}
