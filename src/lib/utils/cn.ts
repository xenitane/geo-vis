import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";

export function cn(...cls: ClassValue[]) {
	return twMerge(clsx(cls));
}
