import { Theme } from "?";
import { signal, effect } from "@preact/signals-react";

const theme = signal<Theme>((localStorage.getItem(__my_consts__.__THEME_KEY__) ?? "system") as Theme);

effect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (theme.value == "system")
        root.classList.add(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    else root.classList.add(theme.value);
    localStorage.setItem(__my_consts__.__THEME_KEY__, theme.value);
});
export { theme };
