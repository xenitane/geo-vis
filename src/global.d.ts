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

type FractalSet<T> = {
    [key: string]: {
        name: string;
        max_order: number;
        gen: T;
    };
};

Extend<FractalParams<T>, E>;

type LinearInstruction = [true, Transform[]] | [false, Transform[], string];
type LinearInstructionSet = {
    shift: number;
    state: { [key: string]: number | boolean };
    transforms: RuleSet<LinearInstruction>;
};

type BranchingInstruction = [true, Transform[], boolean] | [false, Transform[], boolean, StringTree];

type BranchingInstructionSet = {
    shift: number;
    state: { [key: string]: number | boolean };
    stay: boolean;
    transforms: RuleSet<BranchingInstruction>;
};

type FillInstruction = {
    sides: number;
    ratio: number;
    shift: number;
    outer_radius: number;
    inner_radius: [number] | [number, number];
    origin: [number, number];
    generator: ["V", number] | ["VC", number] | ["VS"];
    keep_outer_radius: boolean;
};
