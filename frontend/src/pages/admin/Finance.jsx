import React, { useState } from "react";
import ChooseBar from "../../modules/components/ChooseBarCarOwner";
import FinanceDetails from "../../modules/components/FinanceDetails";
import FinanceChart from "../../modules/components/FinanceChart";
import "../../styles/admin/Finance.css"; // CSS riêng cho trang này

const financeData = {
  2023: [
    { name: "Jan", uv: 12000 },
    { name: "Feb", uv: 14000 },
    { name: "Mar", uv: 18000 },
    { name: "Apr", uv: 21000 },
    { name: "May", uv: 16000 },
    { name: "Jun", uv: 23000 },
    { name: "Jul", uv: 27000 },
    { name: "Aug", uv: 19000 },
    { name: "Sep", uv: 22000 },
    { name: "Oct", uv: 25000 },
    { name: "Nov", uv: 24000 },
    { name: "Dec", uv: 28000 },
  ],
  2024: [
    { name: "Jan", uv: 10000 },
    { name: "Feb", uv: 7000 },
    { name: "Mar", uv: 15000 },
    { name: "Apr", uv: 8000 },
    { name: "May", uv: 18000 },
    { name: "Jun", uv: 25000 },
    { name: "Jul", uv: 20000 },
    { name: "Aug", uv: 16000 },
    { name: "Sep", uv: 11000 },
    { name: "Oct", uv: 18000 },
    { name: "Nov", uv: 12000 },
    { name: "Dec", uv: 22000 },
  ],
};

const Finance = () => {
  const [selectedYear, setSelectedYear] = useState(2024); // Lưu trữ năm được chọn

  // Hàm xử lý sự kiện khi người dùng chọn năm
  const handleYearChange = (event) => {
    setSelectedYear(Number(event.target.value));
  };

  return (
    <div className="AllPage">
      <div className="LeftSide">
        <ChooseBar />
      </div>
      <div className="RightSide">
        <div className="finance-container">
          <h1 className="title">Finance</h1>
          <div className="filters">
            <div className="filter-item">
              <label>Time interval</label>
              <select>
                <option>Year</option>
                <option>Month</option>
              </select>
            </div>
            <div className="filter-item">
              <label>Time</label>
              <select value={selectedYear} onChange={handleYearChange}>
                <option value={2024}>2024</option>
                <option value={2023}>2023</option>
              </select>
            </div>
          </div>

          {/* Truyền dữ liệu dựa trên năm được chọn */}
          <FinanceChart data={financeData[selectedYear]} />
        </div>
      </div>
    </div>
  );
};
export default Finance;
