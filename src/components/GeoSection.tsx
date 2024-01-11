import { toTitleCase } from "@/lib/utils";
import { FC, Suspense, lazy } from "react";
import Logo from "@/assets/Logo";
import { Separator } from "@/components/ui/separator";
import CardSkeleton from "@/components/CardSkeleton";
import { HTMLProps, GeoObjInfo } from "@/types";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const Card = lazy(() => import("@/components/Card"));

interface GeoSectionProps extends HTMLProps {
	sectionId: string;
	sectionType: string;
	objectList: Record<string, GeoObjInfo>;
}

const GeoSection: FC<GeoSectionProps> = ({ sectionType, objectList, sectionId }) => {
	return (
		<section>
			<h3 className="text-2xl lg:text-3xl" id={sectionId}>
				{toTitleCase(sectionType)}
			</h3>
			<div className="py-4 lg:py-8">
				<Separator className="h-0.5" />
			</div>
			<div className="hidden gap-4 lg:grid lg:grid-cols-3 2xl:grid-cols-5">
				{Object.entries(objectList).map(([objectId, objectInfo]) => {
					return (
						<Suspense fallback={<CardSkeleton />} key={objectId}>
							<Card text={objectInfo.name} Image={objectInfo.Image ?? Logo} uri={`${sectionType}/${objectId}`} />
						</Suspense>
					);
				})}
			</div>
			<div className="px-14">
				<Carousel className="lg:hidden">
					<CarouselContent className="">
						{Object.entries(objectList).map(([objectId, objectInfo]) => {
							return (
								<CarouselItem className="md:basis-1/2" key={objectId}>
									<Suspense fallback={<CardSkeleton />}>
										<Card
											text={objectInfo.name}
											Image={objectInfo.Image ?? Logo}
											uri={`${sectionType}/${objectId}`}
										/>
									</Suspense>
								</CarouselItem>
							);
						})}
					</CarouselContent>
					<CarouselPrevious className="text-gray-900 transition-all duration-500 ease-in-out hover:drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]" />
					<CarouselNext className="text-gray-900 transition-all duration-500 ease-in-out hover:drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]" />
				</Carousel>
			</div>
		</section>
	);
};

export default GeoSection;
