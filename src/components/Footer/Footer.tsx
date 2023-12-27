import logo from "@/assets/logo.svg";
import { IconType } from "react-icons";
import { BsGithub } from "react-icons/bs";
import { GoCrossReference, GoInfo, GoIssueOpened } from "react-icons/go";
import { LuListTodo } from "react-icons/lu";

const Footer = () => {
	const projectPoints: { icon: IconType; text: string; link: string }[] = [
		{
			link: "https://www.github.com/xenitane/fractals/blob/main/readme.md",
			icon: GoInfo,
			text: "About",
		},
		{
			link: "https://www.github.com/xenitane/fractals/",
			icon: BsGithub,
			text: "Github",
		},
		{
			link: "https://www.github.com/xenitane/fractals/blob/main/references.md",
			icon: GoCrossReference,
			text: "References",
		},
		{
			link: "https://www.github.com/xenitane/fractals/blob/main/changelog.md",
			icon: GoInfo,
			text: "Changelog",
		},
		{
			link: "https://www.github.com/xenitane/fractals/issues",
			icon: GoIssueOpened,
			text: "Issues",
		},
		{
			link: "https://www.github.com/xenitane/fractals/blob/main/todo.md",
			icon: LuListTodo,
			text: "Future Plans",
		},
	];

	return (
		<footer className="absolute bottom-0 w-full">
			<div className="flex justify-between bg-slate-400 px-[24%] pb-16 pt-4">
				<div className=" flex w-1/3 flex-col gap-2 text-xl">
					<div className="flex items-center gap-4 !text-[48px] leading-[1.4]">
						<img src={logo} alt="logo" className="inline-block h-12" />
						<span className="">Fractals</span>
					</div>
					<div>
						Designed and Built with all the love in the world by{" "}
						<a href="https://www.github.com/xenitane" className="font-medium underline" target="blank">
							Xenitane
						</a>
					</div>
					<div>
						Code Licensed{" "}
						<a
							href="https://www.github.com/xenitane/fractals/blob/main/license.md"
							className="font-medium underline"
							target="blank"
						>
							GPL-3.0
						</a>
					</div>

					<div>Currently v{process.env.__APP_VERSION__}</div>
				</div>
				<div className="flex w-1/3 flex-col items-end gap-1 text-xl">
					<div>
						<span className="mb-2 inline-block text-2xl font-medium">Project</span>
						<ul>
							{projectPoints.map(({ icon: Icon, text, link }) => (
								<li key={text}>
									<a href={link} target="blank">
										<Icon className="mr-2 inline" />
										{text}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
