import { cn } from "!/utils/cn";
import { FC, Suspense, lazy } from "react";
import { Separator } from "$/separator";
import CardSkeleton from "./CardSkeleton";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "$/carousel";

const Card = lazy(() => import("./Card"));

interface GeoSectionProps extends HTMLProps {
    sectionId: string;
    objectList: Record<string, { name: string; image: string }>;
}

const GeoSection: FC<GeoSectionProps> = ({ objectList, sectionId }) => {
    return (
        <section>
            <h3 className={cn("text-2xl", "lg:text-3xl")} id={sectionId}>
                {`${sectionId.charAt(0).toUpperCase()}${sectionId.slice(1).toLowerCase()}`}
            </h3>
            <div className={cn("py-4", "lg:py-8")}>
                <Separator className={cn("h-0.5 bg-neutral-950", "dark:bg-neutral-50")} />
            </div>
            {Object.keys(objectList).length > 0 && (
                <div className="px-14">
                    <Carousel>
                        <CarouselContent>
                            {Object.entries(objectList).map(([objectId, objectInfo]) => {
                                return (
                                    <CarouselItem
                                        className={cn("md:basis-1/2", "lg:basis-1/3", "xl:basis-1/4", "2xl:basis-1/5")}
                                        key={objectId}
                                    >
                                        <Suspense fallback={<CardSkeleton />}>
                                            <Card
                                                text={objectInfo.name}
                                                image={objectInfo.image}
                                                uri={`/geo-vis/${sectionId}?id=${objectId}`}
                                            />
                                        </Suspense>
                                    </CarouselItem>
                                );
                            })}
                        </CarouselContent>
                        <CarouselPrevious
                            className={cn(
                                "transition-all duration-500 ease-in-out",
                                "hover:drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]",
                                "dark:bg-neutral-700"
                            )}
                        />
                        <CarouselNext
                            className={cn(
                                "transition-all duration-500 ease-in-out",
                                "hover:drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]",
                                "dark:bg-neutral-700"
                            )}
                        />
                    </Carousel>
                </div>
            )}
        </section>
    );
};

export default GeoSection;
