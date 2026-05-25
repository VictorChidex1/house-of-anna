import { useContext } from "react";
import { AdminContext, type AdminContextValue } from "../contexts/AdminContext";

export const useAdmin = (): AdminContextValue => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
};
