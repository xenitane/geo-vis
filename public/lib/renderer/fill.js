function generatePolygon(a, b, c, d) {
    const vertices = [];
    let dir = Complex.rotate([0, -c], d);
    for (let i = 0; i < b; ++i) {
        vertices.push(Complex.add(a, dir));
        dir = Complex.rotate(dir, 360 / b);
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
                    const tot = c[i][1];
                    let dir = [_dir[0], _dir[1]];
                    for (let j = 0; j < sides; ++j) {
                        if (keep_outer_radius) {
                            nc.push([Complex.add(c[i][0], dir), tot * ratio]);
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
                    const tot = ic[i][1];
                    let dir = [o_dir[0], o_dir[1]];
                    for (let j = 0; j < sides; ++j) {
                        if (keep_outer_radius) {
                            nic.push([Complex.add(ic[i][0], dir), tot * ratio]);
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
                        keep_outer_radius ? invertedCenters[j][0] : invertedCenters[j],
                        sides,
                        keep_outer_radius ? invertedCenters[j][1] : or,
                        shift + 180
                    ),
                    color_generator.next()
                );
                ++j;
            } else {
                addSVGPathPolygonElement(
                    drawing_canvas,
                    generatePolygon(
                        keep_outer_radius ? centers[i][0] : centers[i],
                        sides,
                        keep_outer_radius ? centers[i][1] : or,
                        shift + 180
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
                    keep_outer_radius ? centers[i][0] : centers[i],
                    sides,
                    keep_outer_radius ? centers[i][1] : or,
                    shift + 180
                ),
                color_generator.next()
            );
        }
        for (let i = 0; i < invertedCenters.length; ++i) {
            addSVGPathPolygonElement(
                drawing_canvas,
                generatePolygon(
                    keep_outer_radius ? invertedCenters[i][0] : invertedCenters[i],
                    sides,
                    keep_outer_radius ? invertedCenters[i][1] : or,
                    shift + 180
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
