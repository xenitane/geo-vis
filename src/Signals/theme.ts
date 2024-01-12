import { Theme } from "@/types";
import { signal, effect } from "@preact/signals-react";

const theme = signal<Theme>((localStorage.getItem(process.env.__THEME_KEY__ ?? "gv-theme") ?? "system") as Theme);

effect(() => {
	const root = window.document.documentElement;
	root.classList.remove("light", "dark");
	if (theme.value == "system")
		root.classList.add(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
	else root.classList.add(theme.value);
	localStorage.setItem(process.env.__THEME_KEY__ ?? "gv-theme", theme.value);
});
export { theme };
