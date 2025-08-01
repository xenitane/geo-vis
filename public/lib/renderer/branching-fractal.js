const drawing_canvas = document.querySelector("#drawing-canvas");
let interval = null;

const transformFuncs = {};

function __render__({ order, animate, color }) {
    Alpine.stopObservingMutations();
    const { shift, state, stay, transforms } = __newRules__();
    validateSchema(transforms);
    const paths = [];
    const bounds = [
        [0, 0],
        [0, 0],
    ];

    function handleTree(cursor, direction, n, string_tree) {
        if ("string" === typeof string_tree) {
            for (let i = 0; i < string_tree.length; ++i) {
                [cursor, direction] = handleInstruction(cursor, direction, n, string_tree.charAt(i));
            }
            return [cursor, direction];
        }
        const [expansion, children] = string_tree;
        for (let i = 0; i < expansion.length; ++i) {
            [cursor, direction] = handleInstruction(cursor, direction, n, expansion.charAt(i));
        }
        let tc = [cursor[0], cursor[1]];
        let td = [direction[0], direction[1]];
        for (let i = 0; i < children.length; ++i) {
            tc = [cursor[0], cursor[1]];
            td = [direction[0], direction[1]];
            [tc, td] = handleTree(tc, td, n, children[i]);
        }
        return stay ? [cursor, direction] : [tc, td];
    }

    function handleInstruction(cursor, direction, n, symbol) {
        const [terminal, ruleset, feed, expansion_tree] = transforms[symbol];
        if (n === 0 || terminal) {
            const old_cursor = [cursor[0], cursor[1]];
            if (notExists(transformFuncs[symbol])) {
                transformFuncs[symbol] = makeTransformFunc(ruleset, state);
            }
            transformFuncs[symbol](state, cursor, direction);
            if (feed && (old_cursor[0] !== cursor[0] || old_cursor[1] !== cursor[1])) {
                paths.push([
                    [old_cursor[0], old_cursor[1]],
                    [cursor[0], cursor[1]],
                ]);
                bounds[0][0] = Math.min(bounds[0][0], cursor[0]);
                bounds[0][1] = Math.min(bounds[0][1], cursor[1]);
                bounds[1][0] = Math.max(bounds[1][0], cursor[0]);
                bounds[1][1] = Math.max(bounds[1][1], cursor[1]);
            }
            return [cursor, direction];
        }
        return handleTree(cursor, direction, n - 1, expansion_tree);
    }

    handleInstruction([0, 0], [1, 0], order + shift, "I");

    const origin = [(bounds[1][0] + bounds[0][0]) / 2, (bounds[1][1] + bounds[0][1]) / 2];
    const scale = 1800 / Math.max(bounds[1][0] - bounds[0][0], bounds[1][1] - bounds[0][1]);
    for (let i = 0; i < paths.length; ++i) {
        paths[i][0][0] = rounder((paths[i][0][0] - origin[0]) * scale);
        paths[i][0][1] = rounder((paths[i][0][1] - origin[1]) * scale);
        paths[i][1][0] = rounder((paths[i][1][0] - origin[0]) * scale);
        paths[i][1][1] = rounder((paths[i][1][1] - origin[1]) * scale);
    }

    const color_generator = new ColorGenerator(color, Math.ceil(Math.log2(paths.length) / 3));

    if (animate) {
        let i = 0;
        interval = setInterval(function () {
            if (i === paths.length) {
                clearInterval(interval);
                interval = null;
                Alpine.store("isCanvasEmpty").unset();
                return;
            }

            addSVGPathLineElement(drawing_canvas, paths[i][0], paths[i][1], color_generator.next());
            ++i;
        }, 5);
    } else {
        for (let i = 0; i < paths.length; ++i) {
            addSVGPathLineElement(drawing_canvas, paths[i][0], paths[i][1], color_generator.next());
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
