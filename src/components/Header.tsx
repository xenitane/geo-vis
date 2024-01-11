import Logo from "@/assets/Logo";
import { CgSun, CgMoon } from "react-icons/cg";
import { theme } from "@/Signals/theme";
import { cn, toTitleCase } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { HTMLProps, Theme } from "@/types";
import { FC } from "react";

const handleSelect = (selectedTheme: keyof typeof Theme) => {
	theme.value = Theme[selectedTheme];
};
const Header: FC<HTMLProps> = ({ className }) => {
	return (
		<header className={cn("flex h-20 items-center justify-between bg-slate-600 p-4", className)}>
			<NavLink className="flex items-center gap-4 text-gray-900" to="">
				<Logo fill="#111827" className={cn("inline-block h-9 w-9", "md:h-10 md:w-10")} />
				<span className="text-3xl md:text-4xl">Geo Vis</span>
			</NavLink>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						className={cn(
							"flex aspect-square h-9 w-9  items-center justify-center p-0 text-gray-900 drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)] focus-visible:ring-0 focus-visible:ring-offset-0",
							"md:h-10 md:w-10",
							"dark:text-white",
						)}
					>
						<CgSun className={cn("rotate-0 scale-100 text-xl  transition-all", "dark:rotate-90 dark:scale-0")} />
						<CgMoon
							className={cn("absolute rotate-90 scale-0 text-xl transition-all", "dark:rotate-0 dark:scale-100")}
						/>
						<span className="sr-only">Toggle Theme</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className={cn("p-1", "md:p-2")}>
					{Object.keys(Theme)
						.filter((v) => isNaN(Number(v)))
						.map((key) => {
							return (
								<DropdownMenuItem
									className={cn("text-sm", "md:text-md")}
									onClick={() => handleSelect(key as keyof typeof Theme)}
									key={key}
								>
									{toTitleCase(key)}
								</DropdownMenuItem>
							);
						})}
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	);
};

export default Header;
