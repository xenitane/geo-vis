import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { CgSun, CgMoon } from "react-icons/cg";
import { GoDotFill } from "react-icons/go";
import { cn } from "../lib/utils";
import { effect, useSignal } from "@preact/signals-react";

const ThemeSelector = () => {
    const theme = useSignal<Theme>((localStorage.getItem(__my_consts__.__THEME_KEY__) ?? "system") as Theme);
    const handleSelect = (selectedTheme: Theme) => {
        theme.value = selectedTheme;
    };
    effect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        if (theme.value == "system")
            root.classList.add(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        else root.classList.add(theme.value);
        localStorage.setItem(__my_consts__.__THEME_KEY__, theme.value);
    });
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "flex aspect-square h-9 w-9  items-center justify-center p-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)] focus-visible:ring-0 focus-visible:ring-offset-0",
                        "md:h-10 md:w-10",
                        "dark:text-white dark:hover:bg-neutral-900"
                    )}
                >
                    <CgSun
                        className={cn("absolute rotate-0 scale-100 text-xl  transition-all", "dark:rotate-90 dark:scale-0")}
                    />
                    <CgMoon
                        className={cn("absolute rotate-90 scale-0 text-xl transition-all", "dark:rotate-0 dark:scale-100")}
                    />
                    <span className="sr-only">Toggle Theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={cn("p-1", "md:p-2", "dark:bg-neutral-900")}>
                <DropdownMenuItem
                    className={cn("flex justify-between text-sm", "md:text-md")}
                    onClick={() => handleSelect("system")}
                >
                    System
                    <GoDotFill className={cn("hidden", { block: theme.value === "system" })} />
                </DropdownMenuItem>
                <DropdownMenuItem
                    className={cn("flex justify-between text-sm", "md:text-md")}
                    onClick={() => handleSelect("light")}
                >
                    Light
                    <GoDotFill className={cn("hidden", { block: theme.value === "light" })} />
                </DropdownMenuItem>
                <DropdownMenuItem
                    className={cn("flex justify-between text-sm", "md:text-md")}
                    onClick={() => handleSelect("dark")}
                >
                    Dark
                    <GoDotFill className={cn("hidden", { block: theme.value === "dark" })} />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ThemeSelector;
