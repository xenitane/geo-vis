import { Logo } from "@/assets";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import footerLinks from "@/lib/data/footerLinks";
import { HTMLProps } from "@/@types";

interface FooterProps extends HTMLProps {
	repo: string;
	user: string;
	appVersion: string;
}

const Footer = ({ className, repo, user, appVersion }: FooterProps) => {
	return (
		<footer className={cn("sticky top-[100vh] w-full", className)}>
			<div className="bg-slate-400 px-[16%] py-4">
				<div className="flex  justify-between px-8 ">
					<div className="flex w-1/3 flex-col gap-2 text-xl">
						<div className="w-min">
							<span className="flex gap-4 text-nowrap pb-2 pr-8">
								<Logo fill="#000" className="inline-block h-10 w-10" />
								<span className="text-4xl">Geo Vis</span>
							</span>
							<Separator className="h-0.5" />
						</div>
						<div className="flex flex-col">
							<span>Designed and Built</span>
							<span>with all the love in</span>
							<span>
								the world by&nbsp;
								<a href={user} className="font-medium underline" target="blank">
									Xenitane
								</a>
								.
							</span>
						</div>
						<span>
							Code Licensed&nbsp;
							<a href={`${repo}/blob/main/license.md`} className="font-medium underline" target="blank">
								GPL-3.0
							</a>
						</span>
						<div>Currently v{appVersion}</div>
					</div>
					<div className="flex w-1/3 flex-col items-end gap-1 text-xl">
						<div>
							<span className="inline-block pb-2 text-xl font-medium">Project</span>
							<ul>
								{footerLinks.map(({ icon: Icon, text, link }) => (
									<li key={text}>
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
				</div>
				<div className=" py-2">
					<Separator className="h-0.5" />
				</div>
				<span className="text-md  block text-center">&copy; 2023 Xenitane&trade; All Rights Reserved&reg;.</span>
			</div>
		</footer>
	);
};

export default Footer;
