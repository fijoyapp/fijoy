import { DataContext } from "@/data";
import { useContext } from "react";

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within an ProfileProvider");
  }
  return context;
}
