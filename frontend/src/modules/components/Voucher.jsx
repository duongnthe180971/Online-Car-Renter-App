import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/payment/voucher.css";

const Voucher = () => {
  const navigate = useNavigate();
  const [unclaimedVouchers, setUnclaimedVouchers] = useState([]);
  const [claimedVouchers, setClaimedVouchers] = useState([]);

  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/voucher");
      setUnclaimedVouchers(response.data.filter((v) => !v.IsClaimed));
      setClaimedVouchers(response.data.filter((v) => v.IsClaimed));
    } catch (error) {
      console.error("Error fetching vouchers:", error);
    }
  };

  const claimVoucher = async (voucherId) => {
    const userId = JSON.parse(localStorage.getItem("user")).id;
    try {
      await axios.put(`http://localhost:5000/api/voucher/claim/${voucherId}`, {
        userId,
      });
      fetchVouchers(); // Refresh vouchers
    } catch (error) {
      console.error("Error claiming voucher:", error);
    }
  };

  return (
    <div className="voucher-body">
      <button className="voucher-back" onClick={() => navigate("/")}>
        &lt; Back
      </button>

      {/* Unclaimed Vouchers */}
      <div className="voucher-section">
        <h2>Unclaimed Vouchers</h2>
        <div className="voucher-container">
          {unclaimedVouchers.map((voucher) => (
            <div className="voucher" key={voucher.VoucherID}>
              <img
                src={voucher.image}
                alt="Voucher"
                height="150"
                width="200"
                onError={(e) => (e.target.src = "/default-image.jpg")}
              />
              <p>{voucher.VoucherCode}</p>
              <p>{voucher.DiscountAmount}% off</p>
              <button
                className="voucher-choose-button"
                onClick={() => claimVoucher(voucher.VoucherID)}
              >
                Claim
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Claimed Vouchers */}
      <div className="voucher-section">
        <h2>Claimed Vouchers</h2>
        <div className="voucher-container">
          {claimedVouchers.map((voucher) => (
            <div className="voucher" key={voucher.VoucherID}>
              <img
                src={voucher.image}
                alt="Voucher"
                height="150"
                width="200"
                onError={(e) => (e.target.src = "/default-image.jpg")}
              />
              <p>{voucher.VoucherCode}</p>
              <p>{voucher.DiscountAmount}% off</p>
              <p className="claimed-text">Claimed</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Voucher;
