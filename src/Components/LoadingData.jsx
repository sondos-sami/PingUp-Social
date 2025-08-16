import { Card, Skeleton } from "@heroui/react";

function LoadingData({times}) {
    return (
        <div className="space-y-4">
            {[...Array(times)].map((_, i) => (
                <Card key={i} className="w-full p-4" radius="lg">
                    {/* Author Skeleton */}
                    <div className="flex items-center space-x-3 mb-4">
                        <Skeleton className="rounded-full">
                            <div className="w-10 h-10 rounded-full bg-default-300" />
                        </Skeleton>
                        <div className="space-y-2">
                            <Skeleton className="w-32 h-4 rounded-md" />
                            <Skeleton className="w-24 h-3 rounded-md" />
                        </div>
                    </div>

                    {/* Content Skeleton */}
                    <div className="space-y-3">
                        <Skeleton className="w-full h-4 rounded-md" />
                        <Skeleton className="w-4/5 h-4 rounded-md" />
                        <Skeleton className="w-3/5 h-4 rounded-md" />
                        
                        {/* Image Skeleton */}
                        <Skeleton className="w-full rounded-xl mt-3">
                            <div className="h-64 rounded-xl bg-default-200" />
                        </Skeleton>

                        {/* Divider */}
                        <div className="border-t border-gray-200 my-3"></div>

                        {/* Actions Skeleton */}
                        <Skeleton className="w-24 h-6 rounded-md" />
                    </div>
                </Card>
            ))}
        </div>
    )
}

export default LoadingData;