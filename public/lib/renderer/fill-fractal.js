const drawing_canvas = document.querySelector("#drawing-canvas");
let interval = null;

function generatePolygon(center, sides, radius, shift) {
    const vertices = [];
    let dir = Complex.rotate([0, -radius], shift);
    for (let i = 0; i < sides; ++i) {
        vertices.push(Complex.add(center, dir));
        dir = Complex.rotate(dir, 360 / sides);
    }
    return vertices;
}

function __render__({ order, animate, color }) {
    const { sides, ratio, shift, outer_radius, inner_radius, origin, generator, keep_outer_radius } = __newRules__();

    let factor = 1;
    const ang = 360 / sides;

    let centers = keep_outer_radius ? [[[origin[0], origin[1]], outer_radius]] : [[origin[0], origin[1]]];
    let invertedCenters = [];

    const generator_func = {
        V(c, ic) {
            const nc = [];
            const ir = -inner_radius[0] * factor;
            const _dir = Complex.rotate([0, ir], generator[1]);
            for (let i = 0; i < c.length; ++i) {
                let dir = [_dir[0], _dir[1]];
                for (let j = 0; j < sides; ++j) {
                    nc.push(Complex.add(c[i], dir));
                    dir = Complex.rotate(dir, ang);
                }
            }
            factor *= ratio;
            return [nc, ic];
        },
        VC(c, ic) {
            const nc = [];
            const nic = [];
            const ir = -inner_radius[0] * factor;
            {
                const _dir = Complex.rotate([0, ir], generator[1]);
                for (let i = 0; i < c.length; ++i) {
                    nic.push(c[i]);
                    const tot = c[i][1] * ratio;
                    let dir = [_dir[0], _dir[1]];
                    for (let j = 0; j < sides; ++j) {
                        if (keep_outer_radius) {
                            nc.push([Complex.add(c[i][0], dir), tot]);
                        } else {
                            nc.push(Complex.add(c[i], dir));
                        }
                        dir = Complex.rotate(dir, ang);
                    }
                }
            }
            {
                const o_dir = Complex.rotate([0, -ir], generator[1]);
                for (let i = 0; i < ic.length; ++i) {
                    nc.push(ic[i]);
                    const tot = ic[i][1] * ratio;
                    let dir = [o_dir[0], o_dir[1]];
                    for (let j = 0; j < sides; ++j) {
                        if (keep_outer_radius) {
                            nic.push([Complex.add(ic[i][0], dir), tot]);
                        } else {
                            nic.push(Complex.add(ic[i], dir));
                        }
                        dir = Complex.rotate(dir, ang);
                    }
                }
            }
            factor *= ratio;
            return [nc, nic];
        },
        VS(c, ic) {
            const nc = [];
            const _ir = -inner_radius[0] * factor;
            const _ir_ = -inner_radius[1] * factor;
            const _dir = Complex.rotate([0, _ir], -ang / 2);
            const _dir_ = [0, _ir_];
            for (let i = 0; i < c.length; ++i) {
                let dir = [_dir[0], _dir[1]];
                let dir_ = [_dir_[0], _dir_[1]];
                for (let j = 0; j < sides; ++j) {
                    nc.push(Complex.add(c[i], dir));
                    nc.push(Complex.add(c[i], dir_));
                    dir = Complex.rotate(dir, ang);
                    dir_ = Complex.rotate(dir_, ang);
                }
            }
            factor *= ratio;
            return [nc, ic];
        },
    };

    for (let i = 0; i < order; i++) {
        [centers, invertedCenters] = generator_func[generator[0]](centers, invertedCenters);
    }

    const or = outer_radius * factor;
    const orf = (1 - ratio) / (1 - factor * ratio);

    const color_generator = new ColorGenerator(color, order + 1);
    if (animate) {
        let i = 0;
        let j = 0;
        interval = setInterval(function () {
            if (centers.length === i && invertedCenters.length === j) {
                clearInterval(interval);
                interval = null;
                Alpine.store("isCanvasEmpty").unset();
                return;
            }
            if (centers.length === i) {
                addSVGPathPolygonElement(
                    drawing_canvas,
                    generatePolygon(
                        keep_outer_radius ? Complex.scale(invertedCenters[j][0], orf) : invertedCenters[j],
                        sides,
                        keep_outer_radius ? invertedCenters[j][1] * orf : or,
                        shift
                    ),
                    color_generator.next()
                );
                ++j;
            } else {
                addSVGPathPolygonElement(
                    drawing_canvas,
                    generatePolygon(
                        keep_outer_radius ? Complex.scale(centers[i][0], orf) : centers[i],
                        sides,
                        keep_outer_radius ? centers[i][1] * orf : or,
                        shift
                    ),
                    color_generator.next()
                );
                ++i;
            }
        }, 5);
    } else {
        for (let i = 0; i < centers.length; ++i) {
            addSVGPathPolygonElement(
                drawing_canvas,
                generatePolygon(
                    keep_outer_radius ? Complex.scale(centers[i][0], orf) : centers[i],
                    sides,
                    keep_outer_radius ? centers[i][1] * orf : or,
                    shift
                ),
                color_generator.next()
            );
        }
        for (let i = 0; i < invertedCenters.length; ++i) {
            addSVGPathPolygonElement(
                drawing_canvas,
                generatePolygon(
                    keep_outer_radius ? Complex.scale(invertedCenters[i][0], orf) : invertedCenters[i],
                    sides,
                    keep_outer_radius ? invertedCenters[i][1] * orf : or,
                    shift
                ),
                color_generator.next()
            );
        }
        Alpine.store("isCanvasEmpty").unset();
    }
}

function __reset__() {
    Alpine.store("isCanvasEmpty").set();
    drawing_canvas.innerHTML = "";
    if (interval) {
        clearInterval(interval);
    }
    interval = null;
}
