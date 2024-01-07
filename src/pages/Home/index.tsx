import GeoSecSkeleton from "@/components/GeoSecSkeleton";
import { lazy, Suspense } from "react";

const GeoSection = lazy(() => import("@/components/GeoSection"));

const fractaldata: { type: string; list: string[] }[] = [
	{
		type: "linear",
		list: ["levy c curve", "dragon curve"],
	},
	{
		type: "fill",
		list: ["pentaflake", "bb", "cc", "dd", "ee"],
	},
	{
		type: "att",
		list: ["aa", "bb", "cc", "dd", "ee", "ff", "gg"],
	},
];

const Home = () => {
	return (
		<article className="flex flex-col gap-8 py-2">
			{fractaldata.map(({ type, list }) => (
				<Suspense fallback={<GeoSecSkeleton />} key={type}>
					<GeoSection id={type} type={type} gvList={list} />
				</Suspense>
			))}
		</article>
	);
};
export default Home;
