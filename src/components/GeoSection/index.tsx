import { toTitleCase } from "@/lib/utils";
import { Suspense, lazy } from "react";
import { Logo } from "@/assets";
import { Separator } from "@/components/ui/separator";
import CardSkeleton from "../CardSkeleton";

const Card = lazy(() => import("@/components/Card"));

export interface GeoSectionProps extends React.HTMLProps<HTMLElement> {
	type: string;
	gvList: string[];
}

const GeoSection = ({ type, gvList }: GeoSectionProps) => {
	return (
		<section>
			<h3 className="text-3xl">{toTitleCase(type)}</h3>
			<div className="py-8">
				<Separator className="h-0.5" />
			</div>
			<div className="grid grid-cols-3 gap-4 2xl:grid-cols-5">
				{gvList.map((li) => (
					<Suspense fallback={<CardSkeleton />} key={li}>
						<Card text={li} Image={Logo} uri={`${type}/${li.replaceAll(" ", "-")}`} />
					</Suspense>
				))}
			</div>
		</section>
	);
};

export default GeoSection;
