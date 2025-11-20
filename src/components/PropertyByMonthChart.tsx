import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const MonthChart = ({ data }: any) => {
  return (
    <div className="bg-white shadow rounded-xl p-5">
      <h2 className="text-lg font-semibold mb-3">Properties Listed per Month</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
export default React.memo(MonthChart);
