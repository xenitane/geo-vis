import { createSVGPathPolygonElement } from "..";

export function FillRenderer(SVGRef: SVGSVGElement, { animate, order, FractalInfo, colored, interval }: FillFractalOptions) {
    let centers: Point[] = [[FractalInfo.origin[0], FractalInfo.origin[1]]];
    let invCenters: Point[] = [];

    const downPolyVGen = FractalInfo.polyVGen(order, true);
    const upPolyVGen = FractalInfo.polyVGen(order, false);

    while (order--) [centers, invCenters] = FractalInfo.rules(centers, invCenters);

    if (colored) {
        // todo: fill color
    }
    const polygonVertices = [
        ...centers.map((center) => upPolyVGen(center)),
        ...invCenters.map((invCenter) => downPolyVGen(invCenter)),
    ];

    centers = [];
    invCenters = [];

    if (animate) {
        let i = 0;
        interval.i = setInterval(() => {
            if (i === polygonVertices.length) clearInterval(interval.i);
            else {
                SVGRef.appendChild(
                    createSVGPathPolygonElement({
                        color: [0, 0, 0],
                        points: polygonVertices[i],
                    })
                );
                i++;
            }
        }, 5);
    } else {
        for (const polygonVertex of polygonVertices)
            SVGRef.appendChild(
                createSVGPathPolygonElement({
                    color: [0, 0, 0],
                    points: polygonVertex,
                })
            );
    }
}
