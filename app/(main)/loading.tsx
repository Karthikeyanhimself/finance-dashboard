import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="w-full space-y-8">
            {/* Summary Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-32 w-full rounded-xl bg-card/50" />
                ))}
            </div>

            {/* Chart Skeleton Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Skeleton className="h-[400px] w-full rounded-xl bg-card/50" />
                <Skeleton className="h-[400px] w-full rounded-xl bg-card/50" />
            </div>
        </div>
    );
}