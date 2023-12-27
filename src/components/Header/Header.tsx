import logo from "@/assets/logo.svg";
import { CgSun, CgMoon } from "react-icons/cg";
import { theme, Theme } from "@/Signals";
import { cn, toTitleCase } from "@/lib/utils";
import { signal } from "@preact/signals-react";
import { NavLink } from "react-router-dom";

const dropDownClose = signal<boolean>(true);
const Header = () => {
	const handleSelect = (key: keyof typeof Theme) => {
		theme.value = Theme[key];
		dropDownClose.value = false;
	};

	return (
		<header className="flex h-28 items-center justify-between px-8 pb-4 pt-8">
			<NavLink to="/">
				<div className="flex items-center gap-6">
					<img src={logo} alt="logo" className="inline-block h-16" />
					<span className="text-[60px]">Fractals</span>
				</div>
			</NavLink>

			<div className="inline-block text-left">
				<button
					onClick={() => (dropDownClose.value = !dropDownClose.value)}
					id="dropdown-button"
					className="flex aspect-square w-full items-center  justify-center rounded-md border border-gray-300 bg-white p-4 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
				>
					<CgMoon className="hidden text-[24px] dark:block" />
					<CgSun className="text-[24px] dark:hidden" />
				</button>
				<div
					id="dropdown-menu"
					className={cn(
						"absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5",
						{ hidden: dropDownClose.value },
					)}
				>
					<div className="p-2 py-2" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-button">
						{Object.keys(Theme)
							.filter((v) => isNaN(Number(v)))
							.map((key) => (
								<div
									key={key}
									className="text-md flex cursor-pointer rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100"
									role="menuitem"
									onClick={() => handleSelect(key as keyof typeof Theme)}
								>
									{toTitleCase(key)}
								</div>
							))}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
