import { ArrayOfTAndSelf, BranchingFractalOptions, Point } from "?";
import { createSVGPathLineElement, rounder } from "%/utils";
export function BranchingRenderer(
    SVGRef: SVGSVGElement,
    { order, animate, colored, interval, FractalInfo }: BranchingFractalOptions
) {
    // console.log(SVGRef, depth, animate, colored, interval, FractalInfo);
    let cursor: Point = [0, 0];
    let direction: Point = [1, 0];
    const paths: [Point, Point][] = [];
    const bounds: [Point, Point] = [
        [0, 0],
        [0, 0],
    ];

    function handleBranchNode(crsr: Point, dirn: Point, d: number, branchInfo: ArrayOfTAndSelf<string>): [Point, Point] {
        if (typeof branchInfo === "string") {
            for (const ins of [...branchInfo]) {
                [crsr, dirn] = handleInstruction(crsr, dirn, ins, d);
            }
            return [crsr, dirn];
        } else {
            for (const ins of [...branchInfo[0]]) {
                [crsr, dirn] = handleInstruction(crsr, dirn, ins, d);
            }
            let tc: Point = [crsr[0], crsr[1]];
            let td: Point = [dirn[0], dirn[1]];
            for (const branch of branchInfo[1]) {
                tc = [crsr[0], crsr[1]];
                td = [dirn[0], dirn[1]];
                [tc, td] = handleBranchNode(tc, td, d, branch);
            }
            return FractalInfo.stay ? [crsr, dirn] : [tc, td];
        }
    }

    function handleInstruction(crsr: Point, dirn: Point, ins: string, d: number): [Point, Point] {
        if (d === 0 || FractalInfo.rules[ins][0]) {
            const [newCrsr, newDir, feed] = FractalInfo.rules[ins][1](crsr, dirn);
            if (feed && (newCrsr[0] !== crsr[0] || newCrsr[1] !== crsr[1])) {
                paths.push([
                    [crsr[0], crsr[1]],
                    [newCrsr[0], newCrsr[1]],
                ]);
                bounds[0][0] = Math.min(bounds[0][0], newCrsr[0]);
                bounds[0][1] = Math.min(bounds[0][1], newCrsr[1]);
                bounds[1][0] = Math.max(bounds[1][0], newCrsr[0]);
                bounds[1][1] = Math.max(bounds[1][1], newCrsr[1]);
            }
            return [newCrsr, newDir];
        }
        return handleBranchNode(crsr, dirn, d - 1, FractalInfo.rules[ins][2]!);
    }

    [cursor, direction] = handleInstruction(cursor, direction, "I", order + FractalInfo.shift);

    const origin: Point = [(bounds[1][0] + bounds[0][0]) / 2, (bounds[1][1] + bounds[0][1]) / 2];
    const scale: number = 1800 / Math.max(bounds[1][0] - bounds[0][0], bounds[1][1] - bounds[0][1]);
    for (const path of paths) {
        path[0][0] = rounder((path[0][0] - origin[0]) * scale);
        path[0][1] = rounder((path[0][1] - origin[1]) * scale);
        path[1][0] = rounder((path[1][0] - origin[0]) * scale);
        path[1][1] = rounder((path[1][1] - origin[1]) * scale);
    }

    if (colored) {
        // todo : fill color
    }
    if (animate) {
        let i = 0;
        interval.i = setInterval(() => {
            if (i === paths.length) {
                clearInterval(interval.i);
                return;
            }
            SVGRef.appendChild(
                createSVGPathLineElement({
                    color: [0, 0, 0],
                    start: paths[i][0],
                    end: paths[i][1],
                })
            );
            i++;
        }, 5);
    } else {
        for (const path of paths) {
            SVGRef.appendChild(
                createSVGPathLineElement({
                    color: [0, 0, 0],
                    start: path[0],
                    end: path[1],
                })
            );
        }
    }
}
