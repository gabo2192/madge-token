"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

const transactions = [
  {
    date: "06/27/2024",
    user: "0x1234567890abcdef",
    amount: 20,
    status: "Pending",
  },
  {
    date: "06/27/2024",
    user: "0x1234567890abcdef",
    amount: -15,
    status: "Completed",
  },
  {
    date: "06/27/2024",
    user: "0x1234567890abcdef",
    amount: 30,
    status: "Completed",
  },
  {
    date: "06/27/2024",
    user: "0x1234567890abcdef",
    amount: 5,
    status: "Completed",
  },
  {
    date: "06/27/2024",
    user: "0x1234567890abcdef",
    amount: 150,
    status: "Completed",
  },
  {
    date: "06/27/2024",
    user: "0x1234567890abcdef",
    amount: 20,
    status: "Pending",
  },
  {
    date: "06/27/2024",
    user: "0x1234567890abcdef",
    amount: -15,
    status: "Completed",
  },
  {
    date: "06/27/2024",
    user: "0x1234567890abcdef",
    amount: 30,
    status: "Completed",
  },
  {
    date: "06/27/2024",
    user: "0x1234567890abcdef",
    amount: 5,
    status: "Completed",
  },
  {
    date: "06/27/2024",
    user: "0x1234567890abcdef",
    amount: 150,
    status: "Completed",
  },
  {
    date: "06/27/2024",
    user: "0x1234567890abcdef",
    amount: 20,
    status: "Pending",
  },
  {
    date: "06/27/2024",
    user: "0x1234567890abcdef",
    amount: -15,
    status: "Completed",
  },
  {
    date: "06/27/2024",
    user: "0x1234567890abcdef",
    amount: 30,
    status: "Completed",
  },
  {
    date: "06/27/2024",
    user: "0x1234567890abcdef",
    amount: 5,
    status: "Completed",
  },
  {
    date: "06/27/2024",
    user: "0x1234567890abcdef",
    amount: 150,
    status: "Completed",
  },
];

export function TransactionsTable() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const tx = isDesktop ? transactions : transactions.slice(0, 5);

  return (
    <Table>
      <TableCaption>A list of recent transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Date</TableHead>
          <TableHead className="w-[120px]">User</TableHead>
          <TableHead className="hidden md:table-cell">Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tx.map((transaction, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{transaction.date}</TableCell>
            <TableCell className="">{transaction.user}</TableCell>
            <TableCell className="hidden md:table-cell">
              {transaction.status}
            </TableCell>
            <TableCell
              className={cn("text-right", {
                "text-brand": transaction.amount > 0,
                "text-red-500": transaction.amount < 0,
              })}
            >
              {transaction.amount.toLocaleString() + " $MAD"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
