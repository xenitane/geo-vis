import { ProjectFooterLiType } from "?";
import { BsGithub } from "react-icons/bs";
import { GoCrossReference, GoInfo, GoIssueOpened } from "react-icons/go";
import { LuListTodo } from "react-icons/lu";
import { TbClockCog } from "react-icons/tb";

const footerLinks: ProjectFooterLiType[] = [
    {
        link: (repo) => `${repo}/blob/main/readme.md`,
        Icon: GoInfo,
        text: "Readme",
    },
    {
        link: (repo) => `${repo}`,
        Icon: BsGithub,
        text: "Code",
    },
    {
        link: (repo) => `${repo}/blob/main/references.md`,
        Icon: GoCrossReference,
        text: "References",
    },
    {
        link: (repo) => `${repo}/blob/main/changelog.md`,
        Icon: TbClockCog,
        text: "Changelog",
    },
    {
        link: (repo) => `${repo}/issues`,
        Icon: GoIssueOpened,
        text: "Issues",
    },
    {
        link: (repo) => `${repo}/blob/main/todo.md`,
        Icon: LuListTodo,
        text: "Goals",
    },
];

export default footerLinks;
