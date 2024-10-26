import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const FinanceChart = ({ data }) => {
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            stroke="#8884d8"
            label={{ value: "Month", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            stroke="#8884d8"
            label={{
              value: "Total Money",
              angle: -90,
              position: "insideLeft",
              offset: -10,
            }}
          />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;
