import { ProjectFooterLiType } from "@/@types";
import { IconType } from "react-icons";
import { BsGithub } from "react-icons/bs";
import { GoCrossReference, GoInfo, GoIssueOpened } from "react-icons/go";
import { LuListTodo } from "react-icons/lu";

const footerLinks: ProjectFooterLiType[] = [
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
		text: "Goals",
	},
];

export default footerLinks;
