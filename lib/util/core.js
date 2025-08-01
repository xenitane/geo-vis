function rounder(a) {
    return Math.round(a * 10000) / 10000;
}

class ColorGenerator {
    order;
    active;

    constructor(active, order) {
        this.active = active;
        this.order = order;
    }
    clone() {
        return new ColorGenerator(this.active, this.order);
    }
    next() {
        return this.active ? "lol" : "#000000";
    }
}

function __saveSVGAsImage__(id, order) {
    if (Alpine.store("isCanvasEmpty").value) {
        return;
    }
    const canvas = document.querySelector("#canvas-for-image");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.onload = function () {
        ctx.drawImage(img, 0, 0);
        (function () {
            const dataURL = canvas.toDataURL("image/png");
            const link = document.querySelector("#link-for-image");
            link.href = dataURL;
            link.download = `${id}-${order}.png`;
            link.click();
        })();
    };
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(drawing_canvas.parentElement.outerHTML)}`;
}

function __saveCanvasAsImage__() {
    if (!Alpine.store("isCanvasEmpty").value) {
    }
}

class Complex {
    static multiply(a, b) {
        const x = rounder(a[0] * b[0] - a[1] * b[1]);
        const y = rounder(a[0] * b[1] + a[1] * b[0]);
        return [x, y];
    }
    static rotate(v, a) {
        const a_rad = (a * Math.PI) / 180;
        return Complex.multiply(v, [Math.cos(a_rad), Math.sin(a_rad)]);
    }
    static add(a, b) {
        return [a[0] + b[0], a[1] + b[1]];
    }
    static scale(a, b) {
        return Complex.multiply(a, [b, 0]);
    }
}

function addSVGPathLineElement(drawing_canvas, start, end, color_code) {
    const element = document.createElementNS("http://www.w3.org/2000/svg", "path");
    element.setAttributeNS(null, "stroke", color_code);
    element.setAttributeNS(null, "stroke-width", "2px");
    element.setAttributeNS(null, "d", `M ${start[0]} ${start[1]} L ${end[0]} ${end[1]}`);
    drawing_canvas.appendChild(element);
}

function addSVGPathPolygonElement(drawing_canvas, points, color_code) {
    const element = document.createElementNS("http://www.w3.org/2000/svg", "path");
    element.setAttributeNS(null, "fill", color_code);
    element.setAttributeNS(null, "stroke-width", "0");
    element.setAttributeNS(
        null,
        "d",
        `M ${points
            .map(function (p) {
                return `${p[0]} ${p[1]}`;
            })
            .join(" L ")} Z`
    );
    drawing_canvas.appendChild(element);
}

function addSVGCircleElement(drawing_canvas, center, radius, color_code) {
    const element = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    element.setAttributeNS(null, "cx", `${center[0]}`);
    element.setAttributeNS(null, "cy", `${center[1]}`);
    element.setAttributeNS(null, "r", "1.5px");
    element.setAttributeNS(null, "fill", color_code);
    element.setAttributeNS(null, "stroke-width", "0");
    drawing_canvas.appendChild(element);
}
