import React from "react";

export interface Column<T> {
  key: keyof T;
  header: string;
  className?: string;
  render?: (value: any, row: T) => React.ReactNode; 
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  sliceCount?: number; 
  noDataMessage?: string;
}

export function DesktopTable<T extends { [key: string]: any }>({
  data,
  columns,
  sliceCount,
  noDataMessage = "No data found",
}: TableProps<T>) {
  const rows = sliceCount ? data.slice(0, sliceCount) : data;

  return (
    <div className="overflow-x-auto w-full hidden md:block">
      <table className="min-w-full text-sm text-left border-collapse">
        <thead>
          <tr className="border-b bg-gray-50 text-gray-600">
            {columns.map((col, idx) => (
              <th key={idx} className={`py-3 px-4 ${col.className || ""}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length ? (
            rows.map((row, idx) => (
              <tr
                key={row.id || idx}
                className="border-b last:border-none hover:bg-gray-50 transition"
              >
                {columns.map((col, cIdx) => (
                  <td
                    key={cIdx}
                    className={`py-3 px-4 text-gray-700 truncate max-w-[120px]`}
                  >
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="py-6 text-center text-gray-500 font-medium"
              >
                {noDataMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
