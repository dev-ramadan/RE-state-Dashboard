import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const PropertyTypeChart = ({data}:any) => {


  const COLORS = ["#6366F1", "#10B981"];

  return (
    <div className="bg-white shadow rounded-xl p-5">
      <h2 className="text-lg font-semibold mb-3">Properties by Type</h2>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={100}>
            {data.map((_:any, i:number) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
export default React.memo(PropertyTypeChart);

