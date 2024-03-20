import Logo from "../assets/Logo";
import { cn } from "../lib/utils";
import { FC } from "react";
import ThemeSelector from "./ThemeSelector";

const Header: FC<HTMLProps> = ({ className }) => {
    return (
        <header
            className={cn(
                "flex h-20 items-center justify-between bg-neutral-50 p-4 text-neutral-900",
                "dark:bg-neutral-800 dark:text-neutral-100",
                className
            )}
        >
            <a href="/geo-vis" className={cn("flex items-center gap-4 text-3xl ", "md:text-4xl")}>
                <Logo className={cn("inline-block h-9 w-9", "md:h-10 md:w-10")} />
                Geo Vis
            </a>

            <ThemeSelector />
        </header>
    );
};

export default Header;
