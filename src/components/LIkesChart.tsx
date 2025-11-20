import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const LikesChart = ({ data }: any) => {
  return (
    <div className="bg-white shadow rounded-xl p-5">
      <h2 className="text-lg font-semibold mb-3">Most Liked Properties</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="title" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="likes" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
export default React.memo(LikesChart);

