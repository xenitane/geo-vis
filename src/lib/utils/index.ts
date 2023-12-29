import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";

export function cn(...cls: ClassValue[]): string {
	return twMerge(clsx(cls));
}

export function toTitleCase(str: string): string {
	return str.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
	});
}
