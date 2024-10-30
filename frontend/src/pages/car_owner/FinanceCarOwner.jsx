import React, { useState, useEffect } from "react";
import axios from "axios";
import ChooseBarCarOwner from "../../modules/components/ChooseBarCarOwner";
import FinanceChart from "../../modules/components/FinanceChart";
import "../../styles/admin/Finance.css";

const FinanceCarOwner = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [financeData, setFinanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noData, setNoData] = useState(false);
  const [Accid, setAccID] = useState(0);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.id) {
      setAccID(storedUser.id);
    }
    const fetchFinanceData = async () => {
      setLoading(true);
      setError(null);
      setNoData(false);

      try {
        const response = await axios.get(
          `http://localhost:5000/api/finance/carOwner/${Accid}/${selectedYear}`
        );

        if (response.data && response.data.length > 0 && Accid) {
          const formattedData = response.data.map((item) => ({
            name: new Date(item.Date).toLocaleString("default", {
              month: "short",
            }),
            uv: item.totalMoney,
          }));
          setFinanceData(formattedData);
        } else {
          setNoData(true);
        }
      } catch (err) {
        setError("Unable to fetch financial data");
      } finally {
        setLoading(false);
      }
    };

    fetchFinanceData();
  }, [selectedYear, Accid]);

  const handleYearChange = (event) => {
    setSelectedYear(Number(event.target.value));
  };

  return (
    <div className="AllPage">
      <div className="LeftSide">
        <ChooseBarCarOwner />
      </div>

      <div className="RightSide">
        <div className="finance-container">
          <h1 className="title">My Financial Overview {selectedYear} </h1>
          <div className="filters">
            <div className="filter-item">
              <label>Select Year</label>
              <select value={selectedYear} onChange={handleYearChange}>
                <option value={2024}>2024</option>
                <option value={2023}>2023</option>
                <option value={2022}>2022</option>
                <option value={2021}>2021</option>
                <option value={2020}>2020</option>
              </select>
            </div>
          </div>
          {loading && <div>Loading data...</div>}
          {error && <div className="error-message">Error: {error}</div>}
          {!loading && !error && noData && (
            <div>No data available for this year</div>
          )}
          {!loading && !error && !noData && <FinanceChart data={financeData} />}
        </div>
      </div>
    </div>
  );
};

export default FinanceCarOwner;