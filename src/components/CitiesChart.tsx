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

export default function CitiesChart({ data }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-2xl p-6 border border-gray-100"
    >
      <h2 className="text-xl font-bold text-gray-800">Top Cities</h2>
      <p className="text-sm text-gray-500 -mt-1 mb-4">Most active locations</p>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} barCategoryGap={20}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="city" tick={{ fill: "#6b7280" }} />
            <YAxis tick={{ fill: "#6b7280" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
              }}
            />

            <Bar
              dataKey="count"
              radius={[10, 10, 0, 0]}
              fill="#6366f1" 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
