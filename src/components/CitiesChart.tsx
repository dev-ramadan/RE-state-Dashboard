import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { motion } from "framer-motion";
import React from "react";

const CitiesChart = ({ data }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="
        bg-white
        shadow-md
        rounded-2xl
        p-6
        border
        border-gray-100
        hover:shadow-xl
        transition-all
        duration-300
      "
    >
      {/* Title */}
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-gray-900">Top Cities</h2>
        <p className="text-xs text-gray-500">Most active locations</p>
      </div>

      {/* Chart */}
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} barCategoryGap={25}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />

            <XAxis
              dataKey="city"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
              labelStyle={{ fontWeight: 600, color: "#4b5563" }}
            />

            <Bar
              dataKey="count"
              radius={[12, 12, 0, 0]}
              fill="#4f46e5"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
export default React.memo(CitiesChart);
