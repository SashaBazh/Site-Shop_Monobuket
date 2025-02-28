import { CSSProperties } from "react";

interface OrderManagerStylesType {
  container: CSSProperties;
  title: CSSProperties;
  table: CSSProperties;
  th: CSSProperties;
  td: CSSProperties;
  select: CSSProperties;
}

export const OrderManagerStyles: OrderManagerStylesType = {
  container: {
    padding: "1.5rem",
    backgroundColor: "#ffffff",
    borderRadius: "0.5rem",
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "1.5rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "1rem",
  },
  th: {
    backgroundColor: "#f3f4f6",
    padding: "0.75rem",
    textAlign: "left",
    borderBottom: "2px solid #d1d5db",
  },
  td: {
    padding: "0.75rem",
    borderBottom: "1px solid #e5e7eb",
  },
  select: {
    padding: "0.375rem 0.75rem",
    borderRadius: "0.375rem",
    border: "1px solid #d1d5db",
    backgroundColor: "#ffffff",
    fontSize: "1rem",
  },
};