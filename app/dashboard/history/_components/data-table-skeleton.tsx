import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function DataTableSkeleton() {
  return (
    <Table className="border">
      <TableHeader>
        <TableRow className="h-10">
          <TableHead>
            <Skeleton className="w-1/3 h-4" />
          </TableHead>
          <TableHead>
            <Skeleton className="w-1/3 h-4" />
          </TableHead>
          <TableHead>
            <Skeleton className="w-1/3 h-4" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 10 }).map((item, index) => (
          <TableRow key={index} className="h-10">
            <TableCell>
              <Skeleton className="h-4 w-1/3" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-1/3" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-1/3" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default DataTableSkeleton;
