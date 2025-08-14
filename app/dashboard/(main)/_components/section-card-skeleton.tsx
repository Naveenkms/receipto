import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function SectionCardSkeleton() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:bg-gradient-to-t gap-4  grid grid-cols-1 md:grid-cols-2">
      <Card className="@container/card">
        <CardHeader>
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-9 w-1/2 font-semibold tabular-nums @[250px]/card:text-3xl" />
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-5 w-1/2" />
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-9 w-1/2 font-semibold tabular-nums @[250px]/card:text-3xl" />
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-5 w-1/2" />
        </CardFooter>
      </Card>
    </div>
  );
}

export default SectionCardSkeleton;
