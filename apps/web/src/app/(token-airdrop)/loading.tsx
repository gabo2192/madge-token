import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <Skeleton className="max-w-sm mx-auto w-full h-12 mb-4" />
      <Skeleton className="max-w-sm mx-auto w-full h-12 mb-8" />
      <Skeleton className="max-w-sm mx-auto w-full h-[92px] mb-8" />
    </>
  );
}
