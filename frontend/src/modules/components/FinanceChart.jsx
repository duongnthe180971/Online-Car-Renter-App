import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const FinanceChart = ({ data }) => {
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={400}>
        {" "}
        {/* Chỉnh lại width và height */}
        <LineChart data={data} style={{ backgroundColor: "#fff" }}>
          {" "}
          {/* Nền trắng cho biểu đồ */}
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />{" "}
          {/* Màu lưới xám nhạt */}
          <XAxis dataKey="name" stroke="#8884d8" />{" "}
          {/* Trục X với màu tím nhạt */}
          <YAxis stroke="#8884d8" /> {/* Trục Y với màu tím nhạt */}
          <Tooltip />
          <Line type="monotone" dataKey="uv" stroke="#ffa500" />{" "}
          {/* Màu đường biểu đồ */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;
