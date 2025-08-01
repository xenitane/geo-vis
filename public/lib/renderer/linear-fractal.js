const drawing_canvas = document.querySelector("#drawing-canvas");
let interval = null;
const transformFuncs = {};

function __render__({ order, animate, color }) {
    Alpine.stopObservingMutations();
    const { shift, state, transforms } = __newRules__();
    validateSchema(transforms);
    const cursor = [0, 0];
    const direction = [1, 0];
    const points = [[0, 0]];
    const bounds = [
        [0, 0],
        [0, 0],
    ];

    (function build(n, symbol) {
        const [terminal, ruleset, expansion] = transforms[symbol];
        if ("boolean" !== typeof terminal) {
            throw new Error("Parse Error: instruction kind unclear(terminal/non-terminal)");
        }
        if (0 === n || terminal) {
            if (notExists(transformFuncs[symbol])) {
                transformFuncs[symbol] = makeTransformFunc(ruleset, state);
            }
            transformFuncs[symbol](state, cursor, direction);
            if (cursor[0] !== points.at(-1)[0] || cursor[1] !== points.at(-1)[1]) {
                points.push([cursor[0], cursor[1]]);
            }
            bounds[0][0] = Math.min(bounds[0][0], cursor[0]);
            bounds[0][1] = Math.min(bounds[0][1], cursor[1]);
            bounds[1][0] = Math.max(bounds[1][0], cursor[0]);
            bounds[1][1] = Math.max(bounds[1][1], cursor[1]);
            return;
        }
        if ("string" !== typeof expansion) {
            throw new Error("Parse Error: provide a valid expansion string");
        }
        for (let i = 0; i < expansion.length; ++i) {
            build(n - 1, expansion.charAt(i));
        }
    })(order + shift, "I");

    const origin = [(bounds[1][0] + bounds[0][0]) / 2, (bounds[1][1] + bounds[0][1]) / 2];
    const scale = 1800 / Math.max(bounds[1][0] - bounds[0][0], bounds[1][1] - bounds[0][1]);
    for (let i = 0; i < points.length; ++i) {
        points[i][0] = rounder((points[i][0] - origin[0]) * scale);
        points[i][1] = rounder((points[i][1] - origin[1]) * scale);
    }

    const color_generator = new ColorGenerator(color, Math.ceil(Math.log2(points.length - 1) / 3));

    if (animate) {
        let i = 1;
        interval = setInterval(function () {
            if (i === points.length) {
                clearInterval(interval);
                interval = null;
                Alpine.store("isCanvasEmpty").unset();
                return;
            }

            addSVGPathLineElement(drawing_canvas, points[i - 1], points[i], color_generator.next());
            ++i;
        }, 5);
    } else {
        for (let i = 1; i < points.length; ++i) {
            addSVGPathLineElement(drawing_canvas, points[i - 1], points[i], color_generator.next());
        }
        Alpine.store("isCanvasEmpty").unset();
    }
}

function __reset__() {
    Alpine.startObservingMutations();
    Alpine.store("isCanvasEmpty").set();
    drawing_canvas.innerHTML = "";
    if (interval) {
        clearInterval(interval);
    }
    interval = null;
}
