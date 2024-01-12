import Logo from "@/assets/Logo";
import { CgSun, CgMoon } from "react-icons/cg";
import { theme } from "@/Signals/theme";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { HTMLProps, Theme } from "@/types";
import { FC } from "react";
import { GoDotFill } from "react-icons/go";

const handleSelect = (selectedTheme: Theme) => {
	theme.value = selectedTheme;
};
const Header: FC<HTMLProps> = ({ className }) => {
	return (
		<header
			className={cn(
				"flex h-20 items-center justify-between bg-neutral-50 p-4 text-neutral-900",
				"dark:bg-neutral-800 dark:text-neutral-100",
				className
			)}
		>
			<NavLink className={cn("flex items-center gap-4 text-3xl ", "md:text-4xl")} to="">
				<Logo className={cn("inline-block h-9 w-9", "md:h-10 md:w-10")} />
				Geo Vis
			</NavLink>

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
		</header>
	);
};

export default Header;
