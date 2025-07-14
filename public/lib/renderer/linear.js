function parseExpression(expression, state, scope) {
    if (notExists(expression) || Array != expression.constructor) {
        throw new Error("Parse Error: invalid expression");
    }
    const operand = expression[0];

    switch (operand) {
        case "var": {
            const [_, from_scope, var_name] = expression;
            if ("boolean" !== typeof from_scope || "string" !== typeof var_name) {
                throw new Error("Parse Error: invalid expression");
            }
            if (from_scope) {
                if (!isValidVarName(var_name.trim())) {
                    throw new Error("Parse Error: variable does not exist in scope");
                }
                if (!scope.has(var_name.trim())) {
                    throw new Error("Parse Error: variable does not exist in scope0");
                }
                return `(${var_name.trim()})`;
            } else {
                if (notExists(state[var_name])) {
                    throw new Error("Parse Error: variable does not exist in state");
                }
                return `(state["${var_name}"])`;
            }
        }
        case "raw": {
            const [_, value] = expression;
            if ("boolean" !== typeof value && ("number" !== typeof value || isNaN(value) || !isFinite(value))) {
                throw new Error("Parse Error: invalid value");
            }
            return `(${value})`;
        }
        case "!": {
            const [_, expression0] = expression;
            return `(!${parseExpression(expression0, state, scope)})`;
        }

        case "&&":
        case "||":
        case "^":
        case "===":
        case "!==":
        case ">":
        case ">=":
        case "<":
        case "<=":
        case "+":
        case "-":
        case "*":
        case "/":
        case "%":
        case "&":
        case "|":
        case "<<":
        case ">>": {
            const [_, expression0, expression1] = expression;
            return `(${parseExpression(expression0, state, scope)}${operand}${parseExpression(expression1, state, scope)})`;
        }
        default:
            throw new Error("Parse Error: invalid expression");
    }
}

function parseTransformsToFunctionBody(transforms, state, scope, in_loop = false) {
    if (notExists(transforms) || Array !== transforms.constructor) {
        throw new Error("Parse Error: transforms either don't exist or is not an array");
    }

    let res = [];

    for (let i = 0; i < transforms.length; i++) {
        if (notExists(transforms[i]) || Array !== transforms[i].constructor) {
            throw new Error("Parse Error: tramsforms is not in the correct form");
        }
        const opcode = transforms[i][0];
        switch (opcode) {
            case "move": {
                res.push(`{[cursor[0],cursor[1]]=Complex.add(cursor,direction);}`);
                break;
            }
            case "rot": {
                const [_, operand] = transforms[i];
                if ("number" !== typeof operand || isNaN(operand) || !isFinite(operand)) {
                    throw new Error("Parse Error: inavlid/missing operand for rot");
                }
                if (0 !== operand) {
                    res.push(`{[direction[0],direction[1]]=Complex.rotate(direction,${rounder(operand % 360)});}`);
                }
                break;
            }
            case "scale": {
                const [_, operand] = transforms[i];
                if ("number" !== typeof operand || isNaN(operand) || !isFinite(operand) || operand <= 0) {
                    throw new Error("Parse Error: inavlid/missing operand for scale");
                }
                if (1 !== operand) {
                    res.push(`{[direction[0],direction[1]]=Complex.multiply(direction,[${operand},0]);}`);
                }
                break;
            }
            case "asgn": {
                const [_, var_name, expression] = transforms[i];
                if ("string" !== typeof var_name || 0 === var_name.length || notExists(state[var_name])) {
                    throw new Error("Parse Error: invalid state update parameters");
                }
                res.push(`{state["${var_name}"]=${parseExpression(expression, state, scope)};}`);
                break;
            }
            case "brch": {
                const [_, condition, true_branch, false_branch] = transforms[i];
                if (notExists(condition) || notExists(true_branch)) {
                    throw new Error("Parse Error: invalid branch operation");
                }
                res.push("{");
                res.push(`if(${parseExpression(condition, state, scope)})`);
                res.push(`{${parseTransformsToFunctionBody(true_branch, state, scope, in_loop)}}`);
                if (!notExists(false_branch)) {
                    res.push("else");
                    res.push(`{${parseTransformsToFunctionBody(false_branch, state, scope, in_loop)}}`);
                }
                res.push("}");
                break;
            }
            case "loop": {
                const [_, var_name, initial_val, condition, update, body] = transforms[i];
                if (notExists(var_name) || "string" !== typeof var_name || !isValidVarName(var_name.trim())) {
                    throw new Error("Parse Error: invalid loop1");
                }

                res.push("{");
                res.push("for(");
                res.push(`let ${var_name.trim()}=${parseExpression(initial_val, state, scope)};`);
                scope.add(var_name.trim());
                res.push(`${parseExpression(condition, state, scope)};`);
                res.push(`${var_name.trim()}=${parseExpression(update, state, scope)})`);
                res.push(`{${parseTransformsToFunctionBody(body, state, scope, true)}}`);
                res.push("}");
                scope.delete(var_name.trim());
                break;
            }
            case "ret": {
                res.push("{return;}");
                break;
            }
            case "br": {
                if (!in_loop) {
                    throw new Error("Parse Error: unexpected `break' statement");
                }
                res.push("{break;}");
                break;
            }
            case "ct": {
                if (!in_loop) {
                    throw new Error("Parse Error: unexpected `continue' statement");
                }
                res.push("{continue;}");
                break;
            }
            default:
                throw new Error("Parse Error: you have supplied an invalid transformation type");
        }
    }
    return res.join("");
}

function makeTransformFunc(transforms, state) {
    const scope = new Set();
    const function_body = parseTransformsToFunctionBody(transforms, state, scope);
    return new Function("state", "cursor", "direction", function_body);
}

const transformFuncs = {};

function __render__({ order, animate, color }) {
    const { shift, state, transforms } = __newRules__();
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

    let color_generator;
    if (color) {
        color_generator = __newColorGenerator__(points.length - 1);
    }

    if (animate) {
        let i = 1;
        interval = setInterval(() => {
            if (i === points.length) {
                clearInterval(interval);
                return;
            }

            addSVGPathLineElement(drawing_canvas, points[i - 1], points[i], color ? color_generator.next() : "#000000");
            ++i;
        }, 5);
    } else {
        for (let i = 1; i < points.length; ++i) {
            addSVGPathLineElement(drawing_canvas, points[i - 1], points[i], color ? color_generator.next() : "#000000");
        }
    }
    Alpine.store("isCanvasEmpty").unset();
}

function __reset__() {
    Alpine.store("isCanvasEmpty").set();
    drawing_canvas.innerHTML = "";
    if (interval) {
        clearInterval(interval);
    }
    interval = null;
}

function __draw_vis__(order, animate, color) {
    __reset__();
    __render__(order, animate, color);
}
