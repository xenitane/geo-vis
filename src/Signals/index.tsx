import { signal, effect } from "@preact/signals-react";

enum Theme {
	system = -1,
	light,
	dark,
}

const defaultTheme = Theme[Theme.system];
const theme = signal<Theme>(Theme[(localStorage.getItem(process.env.themeKey!) as keyof typeof Theme) ?? defaultTheme]);

effect(() => {
	const root = window.document.documentElement;
	root.classList.remove("light", "dark");
	if (theme.value < 0)
		root.classList.add(window.matchMedia("(prefers-color-scheme: dark)").matches ? Theme[Theme.dark] : Theme[Theme.light]);
	else root.classList.add(Theme[theme.value]);
	localStorage.setItem(process.env.themeKey!, Theme[theme.value]);
});
export { theme, Theme };
