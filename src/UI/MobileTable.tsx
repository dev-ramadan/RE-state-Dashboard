// src/components/ui/ResponsiveCardList.tsx
import React from "react";

interface Column<T> {
  label: string; 
  key: keyof T; 
  render?: (item: T) => React.ReactNode; // لو عايز تخصيص
}

interface Props<T> {
  data: T[];
  columns: Column<T>[];
  maxItems?: number; // عدد العناصر اللي تظهر
  emptyMessage?: string;
}

export function MobileTable<T extends { [key: string]: any }>({
  data,
  columns,
  maxItems = 4,
  emptyMessage = "No items found",
}: Props<T>) {
  if (!data?.length) {
    return <p className="text-center text-gray-500 py-6">{emptyMessage}</p>;
  }

  return (
    <div className="grid gap-4 md:hidden">
      {data.slice(0, maxItems).map((item, index) => (
        <div
          key={item[columns[0].key] || index}
          className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
        >
          {columns.map((col) => (
            <div key={String(col.key)} className="mb-1">
              <p className="font-semibold text-gray-800">
                {col.render ? col.render(item) : item[col.key]}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
