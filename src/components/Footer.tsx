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
		<footer className={cn("sticky top-[100vh] w-full  text-gray-900 ", className)}>
			<div className={cn("bg-slate-400 px-[2%] pb-8 pt-4", "md:px-[4%]", "lg:px-[16%]")}>
				<span className="flex w-full gap-4 text-nowrap px-6 pb-1 lg:px-8">
					<Logo
						fill="#111827"
						className="inline-bl
					ock h-9 w-9 md:h-10 md:w-10"
					/>
					<span className="text-3xl md:text-4xl">Geo Vis</span>
				</span>
				<Separator className="h-0.5 bg-[#111827]" />
				<div className="px-4 md:px-8">
					<div className="flex flex-col px-2 lg:flex-row lg:justify-between lg:px-0">
						<div className="flex w-full flex-col gap-2 md:text-xl lg:w-1/3">
							<div className="flex justify-between lg:flex-col lg:gap-2">
								<div className="flex flex-col">
									<span>Designed and Built</span>
									<span>with all the love in</span>
									<span>
										the world by&nbsp;
										<a href={user} className="font-semibold underline" target="blank">
											Xenitane
										</a>
										.
									</span>
								</div>
								<div className="flex flex-col lg:gap-2">
									<span>
										Code Licensed&nbsp;
										<a
											href={`${repo}/blob/main/license.md`}
											className="font-semibold underline"
											target="blank"
										>
											GPL-3.0
										</a>
									</span>
									<span>Currently v{appVersion}</span>
								</div>
							</div>
						</div>
						<div className="py-2 lg:hidden">
							<Separator className="h-0.5 bg-[#111827]" />
						</div>
						<ul className="grid w-full grid-cols-2 md:grid-cols-3 lg:flex  lg:w-min lg:flex-col lg:content-end lg:text-xl">
							{footerLinks.map(({ Icon, text, link }) => (
								<li key={text} className="w-full text-nowrap">
									<a href={link(repo)} target="blank">
										<Icon className="inline" />
										<span className="px-1"></span>
										{text}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className=" py-2">
					<Separator className="h-0.5 bg-[#1e293b]" />
				</div>
				<div className="block text-center text-sm lg:text-[1rem]">
					&copy; 2023 Xenitane&trade; All Rights Reserved&reg;.
				</div>
			</div>
		</footer>
	);
};

export default Footer;
