import { AttractorOptions, Point } from "?";
import { add, multiply } from "%/utils";

export function AttractorRenderer(
    CanvasCtx: CanvasRenderingContext2D,
    { order, animate, AttractorInfo, interval }: AttractorOptions
) {
    const cap = Math.pow(10, order);
    const scale = AttractorInfo.scale;
    const shift = AttractorInfo.shift;
    const or_qty = AttractorInfo.origins.length;

    if (animate) {
        const points: Point[][] = Array.from({ length: or_qty }, (_, j) =>
            Array.from({ length: cap }, () => {
                return [AttractorInfo.origins[j][0], AttractorInfo.origins[j][1]];
            })
        );
        points.forEach((parr) =>
            parr.forEach((p) => {
                const [x, y] = multiply(add(p, shift), scale);
                CanvasCtx.fillRect(x - 1, 999 - y, 2, 2);
            })
        );

        let i = 0;
        interval.i = setInterval(() => {
            for (let j = 0; j < or_qty; j++) {
                const [x, y] = points[j][i + 1];
                CanvasCtx.clearRect(x + 999, 999 - y, 2, 2);
                points[j][(i + 1) % cap] = AttractorInfo.rules(points[j][i]);
            }
            i = (i + 1) % cap;
            for (let j = 0; j < or_qty; j++) {
                const [x, y] = multiply(add(points[j][i], shift), scale);
                if (isNaN(x) || isNaN(y)) {
                    throw new Error("wtf");
                }
                CanvasCtx.fillRect(x - 1, 999 - y, 2, 2);
            }
        }, 1);
    } else {
        const origins = AttractorInfo.origins;
        for (let i = 0; i < Math.pow(10, order); i++) {
            for (let j = 0; j < or_qty; j++) {
                const [x, y] = multiply(add(origins[j], shift), scale);
                if (isNaN(x) || isNaN(y)) {
                    throw new Error("wtf");
                }
                CanvasCtx.fillRect(x + 999, 999 - y, 2, 2);
                origins[j] = AttractorInfo.rules(origins[j]);
            }
        }
    }
}
