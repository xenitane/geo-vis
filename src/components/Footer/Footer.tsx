import { Logo } from "@/assets";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons";
import { BsGithub } from "react-icons/bs";
import { GoCrossReference, GoInfo, GoIssueOpened } from "react-icons/go";
import { LuListTodo } from "react-icons/lu";

interface ProjectFooterLiType<T> {
	icon: T;
	text: string;
	link: (repo: string) => string;
}

const projectPoints: ProjectFooterLiType<IconType>[] = [
	{
		link: (repo) => `${repo}/blob/main/readme.md`,
		icon: GoInfo as IconType,
		text: "About",
	},
	{
		link: (repo) => `${repo}`,
		icon: BsGithub as IconType,
		text: "Github",
	},
	{
		link: (repo) => `${repo}/blob/main/references.md`,
		icon: GoCrossReference as IconType,
		text: "References",
	},
	{
		link: (repo) => `${repo}/blob/main/changelog.md`,
		icon: GoInfo as IconType,
		text: "Changelog",
	},
	{
		link: (repo) => `${repo}/issues`,
		icon: GoIssueOpened as IconType,
		text: "Issues",
	},
	{
		link: (repo) => `${repo}/blob/main/todo.md`,
		icon: LuListTodo as IconType,
		text: "Future Plans",
	},
];

export interface FooterProps extends React.ComponentPropsWithRef<"footer"> {
	appVresion: string;
	repo: string;
	user: string;
}

const Footer = ({ className, repo, user, appVresion, ...props }: FooterProps) => {
	return (
		<footer className={cn("sticky top-[100vh] w-full", className)} {...props}>
			<div className="bg-slate-400 px-[16%] py-8">
				<div className="flex justify-between  ">
					<div className=" flex w-1/4 flex-col gap-2 text-xl">
						<div className="flex items-center gap-4 !text-[48px] leading-[1.4]">
							<Logo fill="#000" className="inline-block, h-16 w-16" />
							{/* <img src={logo} alt="logo" className="inline-block h-12" /> */}
							<span className="">Geo Vis</span>
						</div>
						<div>
							Designed and Built with all the love in the world by{" "}
							<a href={user} className="font-medium underline" target="blank">
								Xenitane
							</a>
						</div>
						<div>
							Code Licensed{" "}
							<a href={`${repo}/blob/main/license.md`} className="font-medium underline" target="blank">
								GPL-3.0
							</a>
						</div>

						<div>Currently v{appVresion}</div>
					</div>
					<div className="flex w-1/4 flex-col items-end gap-1 text-xl">
						<div>
							<span className="mb-2 inline-block text-2xl font-medium">Project</span>
							<ul>
								{projectPoints.map(({ icon: Icon, text, link }) => (
									<li key={text}>
										<a href={link(repo)} target="blank">
											<Icon className="mr-2 inline" />
											{text}
										</a>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
				<hr className="my-2 border-gray-200  dark:border-gray-700" />
				<span className="block  text-center text-lg">&copy; 2023 Xenitane&trade; . All Rights Reserved.</span>
			</div>
		</footer>
	);
};

export default Footer;
