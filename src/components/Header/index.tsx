import { Logo } from "@/assets";
import { CgSun, CgMoon } from "react-icons/cg";
import { theme } from "@/Signals";
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
		<header className={cn("flex h-20 items-center justify-between p-4", className)}>
			<NavLink className="flex cursor-pointer items-center gap-4" to="geo-vis">
				<Logo fill="#000" className="inline-block h-10 w-10" />
				<span className="  text-4xl">Geo Vis</span>
			</NavLink>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						className="flex aspect-square h-10 w-10 cursor-pointer items-center justify-center p-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]"
					>
						<CgSun className="rotate-0 scale-100 text-xl text-black transition-all dark:rotate-90 dark:scale-0" />
						<CgMoon className="absolute rotate-90 scale-0 text-xl transition-all dark:rotate-0 dark:scale-100 dark:text-white  " />
						<span className="sr-only">Toggle Theme</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="p-2">
					{Object.keys(Theme)
						.filter((v) => isNaN(Number(v)))
						.map((key) => {
							return (
								<DropdownMenuItem
									className="text-md "
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
