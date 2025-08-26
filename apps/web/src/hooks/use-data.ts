import { DataContext } from "@/data";
import { use } from "react";

export function useData() {
  const context = use(DataContext);
  if (!context) {
    throw new Error("useData must be used within an ProfileProvider");
  }
  return context;
}
