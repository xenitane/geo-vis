type BinOp =
    | "&&"
    | "||"
    | "^"
    | "==="
    | "!=="
    | ">"
    | ">="
    | "<"
    | "<="
    | "+"
    | "-"
    | "*"
    | "/"
    | "%"
    | "&"
    | "|"
    | "<<"
    | ">>";

type Expression = ["var", boolean, string] | ["raw", number | boolean] | ["!", Expression] | [BinOp, Expression, Expression];

type LoopOps = ["br" | "ct"];

type Transform<InLoop extends boolean = false> =
    // move
    | ["move"]
    // rotate
    | ["rot", number]
    // scale
    | ["scale", number]
    // state update
    | ["asgn", string, Expression]
    // branch
    | ["brch", Expression, (InLoop extends true ? Transform<true> | LoopOps : Transform<false>)[]]
    | [
          "brch",
          Expression,
          (InLoop extends true ? Transform<true> | LoopOps : Transform<false>)[],
          (InLoop extends true ? Transform<true> | LoopOps : Transform<false>)[],
      ]
    // loop
    | ["loop", string, Expression, Expression, Expression, (Transform<true> | LoopOps)[]]
    //return
    | ["ret"];
type StringTree = string | [string, StringTree[]];

type RuleSet<T> = { I: T; [key: string]: T };

type FractalParams<T> = {
    shift: number;
    state: { [key: string]: number | boolean };
    transforms: RuleSet<T>;
};

type Extend<U, V extends object | undefined = undefined> = V extends object ? U & V : U;

type FractalSet<T, E = undefined> = {
    [key: string]: {
        name: string;
        max_order: number;
        gen: Extend<FractalParams<T>, E>;
    };
};

type LinearInstruction = [true, Transform[]] | [false, Transform[], string];
type BranchingInstruction = [true, Transform[], boolean] | [false, Transform[], boolean, StringTree];
