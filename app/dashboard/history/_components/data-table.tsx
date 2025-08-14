import FallbackText from "@/components/fallback-text";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getReceipts } from "@/lib/data/receipts";
import Delete from "./delete";

async function DataTable() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const { data, error } = await getReceipts();

  if (error)
    return (
      <FallbackText variant="destructive">Something went wrong.</FallbackText>
    );

  if (!data || data?.length === 0) return <FallbackText>No data</FallbackText>;

  return (
    <Table className="border">
      <TableCaption>A list of your receipts.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Receipt Id</TableHead>
          <TableHead className="w-1/2">Date</TableHead>
          <TableHead>Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((receipt) => (
          <TableRow key={receipt.id}>
            <TableCell className="font-medium">{receipt.id}</TableCell>
            <TableCell className=" break-all whitespace-normal">
              {receipt.date}
            </TableCell>
            <TableCell className="break-all whitespace-normal">
              <div className="flex gap-x-2 items-center justify-between">
                <p>{receipt.total || "-"}</p>
                <Delete id={receipt.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default DataTable;
