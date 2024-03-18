import { Skeleton } from "@/components/ui/skeleton";

const PageSkeleton = () => {
    return (
        <div className="flex flex-col gap-8">
            <Skeleton className="h-screen w-full rounded-3xl" />
        </div>
    );
};

export default PageSkeleton;
