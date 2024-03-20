import { Skeleton } from "./ui/skeleton";

const GeoSecSkeleton = () => {
    return (
        <div className=" space-y-4">
            <Skeleton className="h-9 w-64 rounded-2xl" />
            <Skeleton className="h-0.5 w-full" />
        </div>
    );
};

export default GeoSecSkeleton;
