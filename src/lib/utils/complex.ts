export function rounder(a: number) {
    return Math.round(a * 10000) / 10000;
}

export function multiply(a: Point, b: Point): Point {
    const x = rounder(a[0] * b[0] - a[1] * b[1]);
    const y = rounder(a[0] * b[1] + a[1] * b[0]);
    return [x, y];
}

export function add(a: Point, b: Point): Point {
    return [a[0] + b[0], a[1] + b[1]];
}

export function rotate(v: Point, angle: number) {
    return multiply(v, [Math.cos(angle), Math.sin(angle)]);
}
