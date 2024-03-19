import { lazy, Suspense } from "react";
import fractalData from "%/rules/RuleCollection";
import GeoSecSkeleton from "@/GeoSecSkeleton";
import { cn } from "%/utils";
const GeoSection = lazy(() => import("@/GeoSection"));

const Home = () => {
    return (
        <article className={cn("flex flex-col gap-8")}>
            {Object.entries(fractalData).map(([setId, setObj]) => {
                return (
                    <Suspense key={setId} fallback={<GeoSecSkeleton />}>
                        <GeoSection sectionId={setId} objectList={setObj} />
                    </Suspense>
                );
            })}
        </article>
    );
};
export default Home;
