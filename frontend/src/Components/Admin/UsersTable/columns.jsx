import * as React from "react";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "../../ui/button";
import { Checkbox } from "../../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
const roleColors = {
  employee: "text-green-900 bg-green-100",
  president: "text-blue-900 bg-blue-100",
  tresorier: "text-yellow-900 bg-yellow-100",
  "vice president": "text-purple-900 bg-purple-100",
  "membre commute": "text-red-900 bg-red-100",
};
export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: () => <div className="text-right">ID</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {row.getValue("id")}
        </div>
      );
    },
  },
  {
    accessorKey: "nom",
    header: () => <div className="text-right">Nom</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {row.getValue("nom")}
        </div>
      );
    },
  },
  {
    accessorKey: "prenom",
    header: () => <div className="text-right">Prenom</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {row.getValue("prenom")}
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <div className="capitalize w-full">
        <div
          className={
            "w-fit p-2 m-1 rounded-lg " +
            roleColors[row.getValue("role").toLowerCase()]
          }
        >
          {row.getValue("role")}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "telephone",
    header: () => <div className="text-right">Telehone</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {row.getValue("telephone")}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
