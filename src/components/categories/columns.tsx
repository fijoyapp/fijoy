import { SelectCategory } from "@/types/category";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<SelectCategory>[] = [
  {
    accessorKey: "Name",
    header: "Name",
  },

  {
    accessorKey: "CategoryType",
    header: "Type",
  },
];
