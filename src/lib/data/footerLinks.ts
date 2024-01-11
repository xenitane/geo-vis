import { ProjectFooterLiType } from "@/types";
import { IconType } from "react-icons";
import { BsGithub } from "react-icons/bs";
import { GoCrossReference, GoInfo, GoIssueOpened } from "react-icons/go";
import { LuListTodo } from "react-icons/lu";
import { TbClockCog } from "react-icons/tb";

const footerLinks: ProjectFooterLiType[] = [
	{
		link: (repo) => `${repo}/blob/main/readme.md`,
		Icon: GoInfo as IconType,
		text: "Readme",
	},
	{
		link: (repo) => `${repo}`,
		Icon: BsGithub as IconType,
		text: "Github",
	},
	{
		link: (repo) => `${repo}/blob/main/references.md`,
		Icon: GoCrossReference as IconType,
		text: "References",
	},
	{
		link: (repo) => `${repo}/blob/main/changelog.md`,
		Icon: TbClockCog as IconType,
		text: "Changelog",
	},
	{
		link: (repo) => `${repo}/issues`,
		Icon: GoIssueOpened as IconType,
		text: "Issues",
	},
	{
		link: (repo) => `${repo}/blob/main/todo.md`,
		Icon: LuListTodo as IconType,
		text: "Goals",
	},
];

export default footerLinks;
