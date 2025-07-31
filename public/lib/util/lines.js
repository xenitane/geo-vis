function notExists(val) {
    return undefined === val || null === val;
}

function parseExpression(expression, state, scope) {
    const operand = expression[0];

    switch (operand) {
        case "var": {
            const [_, from_scope, var_name] = expression;
            if (from_scope) {
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
    let res = [];

    for (let i = 0; i < transforms.length; i++) {
        const opcode = transforms[i][0];
        switch (opcode) {
            case "move": {
                res.push(`{[cursor[0],cursor[1]]=Complex.add(cursor,direction);}`);
                break;
            }
            case "rot": {
                let [_, operand] = transforms[i];
                if (operand >= 0) {
                    operand %= 360;
                } else {
                    operand *= -1;
                    operand %= 360;
                    operand = (360 - operand) % 360;
                }
                if (0 !== operand) {
                    res.push(`{[direction[0],direction[1]]=Complex.rotate(direction,${rounder(operand % 360)});}`);
                }
                break;
            }
            case "scale": {
                const [_, operand] = transforms[i];
                if (1 !== operand) {
                    res.push(`{[direction[0],direction[1]]=Complex.multiply(direction,[${operand},0]);}`);
                }
                break;
            }
            case "asgn": {
                const [_, var_name, expression] = transforms[i];
                if (notExists(state[var_name])) {
                    throw new Error("Parse Error: invalid state update parameters");
                }
                res.push(`{state["${var_name}"]=${parseExpression(expression, state, scope)};}`);
                break;
            }
            case "brch": {
                const [_, condition, true_branch, false_branch] = transforms[i];
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

document.addEventListener("alpine:init", function () {
    Alpine.store("isCanvasEmpty", {
        value: true,
        set() {
            this.value = true;
        },
        unset() {
            this.value = false;
        },
    });
});
