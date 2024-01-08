import { Theme } from "@/types";
import { signal, effect } from "@preact/signals-react";

const theme = signal<Theme>(
	Theme[(localStorage.getItem(process.env.__THEME_KEY__ ?? "gv-theme") ?? Theme[Theme.light]) as keyof typeof Theme],
);

effect(() => {
	const root = window.document.documentElement;
	root.classList.remove("light", "dark");
	if (theme.value == Theme.system)
		root.classList.add(window.matchMedia("(prefers-color-scheme: dark)").matches ? Theme[Theme.dark] : Theme[Theme.light]);
	else root.classList.add(Theme[theme.value]);
	localStorage.setItem(process.env.__THEME_KEY__ ?? "gv-theme", Theme[theme.value]);
});
export { theme };
