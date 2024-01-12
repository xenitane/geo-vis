import { lazy, Suspense } from "react";
import fractalData from "@/lib/rules/RuleCollection";
import GeoSecSkeleton from "@/components/GeoSecSkeleton";
import { cn } from "@/lib/utils";
const GeoSection = lazy(() => import("@/components/GeoSection"));

const Home = () => {
	return (
		<article className={cn("flex flex-col gap-8")}>
			{Object.entries(fractalData).map(([setId, setObj]) => {
				return (
					<Suspense key={setId} fallback={<GeoSecSkeleton />}>
						<GeoSection sectionId={setId} sectionType={setId} objectList={setObj} />
					</Suspense>
				);
			})}
		</article>
	);
};
export default Home;
