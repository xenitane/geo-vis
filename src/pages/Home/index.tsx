import GeoSecSkeleton from "@/components/GeoSecSkeleton";
import { lazy, Suspense } from "react";

const GeoSection = lazy(() => import("@/components/GeoSection"));
import fractalData from "@/lib/rules";

const Home = () => {
	return (
		<article className="flex flex-col gap-8 py-2">
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
