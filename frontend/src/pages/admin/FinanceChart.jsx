import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const FinanceChart = ({ selectedYear }) => {
  const [financeData, setFinanceData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch finance data based on the selected year
    axios
      .get(`http://localhost:5000/api/finance/${selectedYear}`)
      .then((response) => {
        setFinanceData(response.data);
      })
      .catch((err) => {
        setError("Failed to fetch finance data");
        console.error(err);
      });
  }, [selectedYear]); // Refetch data when selectedYear changes

  return (
    <div className="finance-chart-container">
      <h3 className="finance-chart-title">Income Over Time ({selectedYear})</h3>
      {error ? (
        <p>{error}</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={financeData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Income" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default FinanceChart;
