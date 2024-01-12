import Logo from "@/assets/Logo";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import footerLinks from "@/lib/data/footerLinks";
import { HTMLProps } from "@/types";
import { FC } from "react";

interface FooterProps extends HTMLProps {
	repo: string;
	user: string;
	appVersion: string;
}

const Footer: FC<FooterProps> = ({ className, repo, user, appVersion }) => {
	return (
		<footer
			className={cn(
				"w-full flex-shrink-0 bg-neutral-50 px-[2%] py-8 text-neutral-900",
				"md:px-[4%]",
				"lg:px-[16%]",
				"dark:bg-neutral-800 dark:text-neutral-100",
				className
			)}
		>
			<span className={cn("flex w-full gap-4 text-nowrap px-2 pb-1 text-3xl", "md:px-8 md:text-4xl")}>
				<Logo className={cn("inline-block h-9 w-9", "md:h-10 md:w-10")} />
				Geo Vis
			</span>
			<div className="py-2">
				<Separator className={cn("h-0.5 bg-neutral-950", "dark:bg-neutral-50")} />
			</div>
			<div className={cn("flex flex-col px-2 py-4", "md:px-8", "lg:flex-row lg:justify-between")}>
				<div className={cn("flex w-full flex-col gap-2", "md:text-xl", "lg:w-1/4")}>
					<div className="flex justify-between gap-2 lg:flex-col">
						<span className="flex-1 text-wrap">
							Designed and Built with all the love in the world by{" "}
							<a href={user} className="font-semibold underline" target="blank">
								Xenitane
							</a>
							.
						</span>
						<div className="flex flex-1 flex-col justify-end gap-2">
							<span>
								Code Under{" "}
								<a href={`${repo}/blob/main/license.md`} className="font-semibold underline" target="blank">
									GPL-3.0
								</a>
							</span>
							<span>Currently v{appVersion}</span>
						</div>
					</div>
				</div>
				<div className={cn("py-2", "lg:hidden")}>
					<Separator className={cn("h-0.5 bg-neutral-950", "dark:bg-neutral-50")} />
				</div>
				<ul
					className={cn(
						"grid w-full grid-cols-2 py-4",
						"md:grid-cols-3",
						"lg:flex  lg:w-min lg:flex-col lg:content-end lg:text-xl"
					)}
				>
					{footerLinks.map(({ Icon, text, link }) => (
						<li key={text} className="w-full text-nowrap">
							<a href={link(repo)} target="_blank" rel="noreferrer">
								<Icon className="inline" />
								<span className="px-1"></span>
								{text}
							</a>
						</li>
					))}
				</ul>
			</div>
			<div className="py-2">
				<Separator className={cn("h-0.5 bg-neutral-950", "dark:bg-neutral-50")} />
			</div>
			<span className={cn("block text-center text-sm", "lg:text-base")}>
				&copy; 2023 Xenitane&trade; All Rights Reserved&reg;.
			</span>
		</footer>
	);
};

export default Footer;
