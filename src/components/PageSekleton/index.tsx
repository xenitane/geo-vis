import { Skeleton } from "@/components/ui/skeleton";

const PageSkeleton = () => {
	return (
		<div className="flex flex-col gap-8">
			{Array.apply(null, Array(5)).map((_, i) => (
				<Skeleton key={i} className="h-[33vh] w-full rounded-3xl" />
			))}
		</div>
	);
};

export default PageSkeleton;
