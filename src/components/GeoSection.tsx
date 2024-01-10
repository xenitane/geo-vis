import { toTitleCase } from "@/lib/utils";
import { FC, Suspense, lazy } from "react";
import Logo from "@/assets/Logo";
import { Separator } from "@/components/ui/separator";
import CardSkeleton from "@/components/CardSkeleton";
import { HTMLProps, GeoObjInfo } from "@/types";

const Card = lazy(() => import("@/components/Card"));

interface GeoSectionProps extends HTMLProps {
	sectionId: string;
	sectionType: string;
	objectList: Record<string, GeoObjInfo>;
}

const GeoSection: FC<GeoSectionProps> = ({ sectionType, objectList, sectionId }) => {
	return (
		<section>
			<h3 className="text-3xl" id={sectionId}>
				{toTitleCase(sectionType)}
			</h3>
			<div className="py-8">
				<Separator className="h-0.5" />
			</div>
			<div className="grid grid-cols-3 gap-4 2xl:grid-cols-5">
				{Object.entries(objectList).map(([objectId, objectInfo]) => {
					return (
						<Suspense fallback={<CardSkeleton />} key={objectId}>
							<Card text={objectInfo.name} Image={objectInfo.Image ?? Logo} uri={`${sectionType}/${objectId}`} />
						</Suspense>
					);
				})}
			</div>
		</section>
	);
};

export default GeoSection;
