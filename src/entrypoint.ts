import { type Alpine } from "alpinejs";

export default function (Alpine: Alpine) {
    document.addEventListener("alpine:init", function () {
        Alpine.data("theme", function () {
            return {
                __theme__: undefined,
                init() {
                    this.__theme__ = localStorage.getItem("theme") ?? "light";
                },
                __theme__toggle__() {
                    this.__theme__ = this.__theme__ === "light" ? "dark" : "light";
                    localStorage.setItem("theme", this.__theme__);
                },
            } satisfies { __theme__?: string; init(): void; __theme__toggle__(): void };
        });
    });
}
