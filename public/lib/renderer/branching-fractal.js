const transformFuncs = {};

function __render__({ order, animate, color }) {
    const { shift, state, stay, transforms } = __newRules__();
    const paths = [];
    const bounds = [
        [0, 0],
        [0, 0],
    ];

    function handleTree(crsr, dirn, n, string_tree) {
        if (notExists(string_tree)) {
            throw new Error("Parse Error: provide a valid expansion tree");
        }
        if ("string" === typeof string_tree) {
            for (let i = 0; i < string_tree.length; ++i) {
                [crsr, dirn] = handleInstruction(crsr, dirn, n, string_tree.charAt(i));
            }
            return [crsr, dirn];
        }
        if (Array !== string_tree.constructor) {
            throw new Error("Parse Error: provide a valid expansion tree");
        }
        const [expansion, children] = string_tree;
        if ("string" !== typeof expansion || notExists(children) || Array !== children.constructor) {
            throw new Error("Parse Error: provide a valid expansion tree");
        }
        for (let i = 0; i < expansion.length; ++i) {
            [crsr, dirn] = handleInstruction(crsr, dirn, n, expansion.charAt(i));
        }
        let tc = [crsr[0], crsr[1]];
        let td = [dirn[0], dirn[1]];
        for (let i = 0; i < children.length; ++i) {
            tc = [crsr[0], crsr[1]];
            td = [dirn[0], dirn[1]];
            [tc, td] = handleTree(tc, td, n, children[i]);
        }
        return stay ? [crsr, dirn] : [tc, td];
    }

    function handleInstruction(crsr, dirn, n, symbol) {
        const [terminal, ruleset, feed, expansion_tree] = transforms[symbol];
        if ("boolean" !== typeof terminal || "boolean" !== typeof feed) {
            throw new Error("Parse Error: instruction kind unclear(terminal/non-terminal)");
        }
        if (n === 0 || terminal) {
            const old_crsr = [crsr[0], crsr[1]];
            if (notExists(transformFuncs[symbol])) {
                transformFuncs[symbol] = makeTransformFunc(ruleset, state);
            }
            transformFuncs[symbol](state, crsr, dirn);
            if (feed && (old_crsr[0] !== crsr[0] || old_crsr[1] !== crsr[1])) {
                paths.push([
                    [old_crsr[0], old_crsr[1]],
                    [crsr[0], crsr[1]],
                ]);
                bounds[0][0] = Math.min(bounds[0][0], crsr[0]);
                bounds[0][1] = Math.min(bounds[0][1], crsr[1]);
                bounds[1][0] = Math.max(bounds[1][0], crsr[0]);
                bounds[1][1] = Math.max(bounds[1][1], crsr[1]);
            }
            return [crsr, dirn];
        }
        return handleTree(crsr, dirn, n - 1, expansion_tree);
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

    const color_generator = new ColorGenerator(color, paths.length);

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
    Alpine.store("isCanvasEmpty").set();
    drawing_canvas.innerHTML = "";
    if (interval) {
        clearInterval(interval);
    }
    interval = null;
}
