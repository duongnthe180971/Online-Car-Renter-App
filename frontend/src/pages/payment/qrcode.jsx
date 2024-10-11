import React, { useState } from "react";
import logo from "../../assets/icon/logo.png";
import "../../styles/payment/qrcode.css";
import qrcode from "../../assets/icon/qrcode.png";
import {
  vietcombank,
  vietinbank,
  acb,
  bidv,
  hdbank,
  lienvietpostbank,
  mbbank,
  sacombank,
  techcombank,
  tpbank,
  vib,
  vpbank,
} from "../../assets/icon";

function App() {
  const [activeMenu, setActiveMenu] = useState("qr-code");

  const showBankCard = () => {
    setActiveMenu("bank-card");
  };

  const showQRCode = () => {
    setActiveMenu("qr-code");
  };

  return (
    <div className="body-payment">
      <div className="payment-container">
        <div className="sidebar-payment">
          <div
            className={`menu-item ${activeMenu === "qr-code" ? "active" : ""}`}
            id="qr-code-menu"
            onClick={showQRCode}
          >
            <i className="fas fa-qrcode"></i>
            <span>QR Code</span>
          </div>
          <div
            className={`menu-item ${
              activeMenu === "bank-card" ? "active" : ""
            }`}
            id="bank-card-menu"
            onClick={showBankCard}
          >
            <i className="fas fa-credit-card"></i>
            <span>Bank card</span>
          </div>
          <div className="footer">
            <p>Powered by</p>
            <img alt="Cardio Logo" src={logo} />
          </div>
        </div>
        <div className="content-payment" id="content-payment">
          <h1>You are about to pay</h1>
          <h2>Pay 1.499.000 to BookCar</h2>
          {activeMenu === "qr-code" && (
            <>
              <div className="info">
                <i className="fas fa-info-circle"></i>
                <span>
                  Open your Bank mobile payment app on your phone and scan the
                  QR code to pay
                </span>
              </div>
              <div className="qr-code">
                <img alt="Qr Code" src={qrcode} />
              </div>
              <div className="footer-text">
                <span>Compartible parter apps</span>
              </div>
              <div className="partners">
                <img src={vietcombank} alt="vietcombank" />
                <img src={techcombank} alt="techcombank" />
                <img src={bidv} alt="bidv" />
                <img src={tpbank} alt="tpbank" />
                <img src={vietinbank} alt="vietinbank" />
                <img src={vib} alt="vib" />
                <img src={hdbank} alt="hdbank" />
                <img src={vpbank} alt="vpbank" />
                <img src={acb} alt="acb" />
                <img src={lienvietpostbank} alt="lienvietpostbank" />
                <img src={mbbank} alt="mbbank" />
                <img src={sacombank} alt="sacombank" />
              </div>
            </>
          )}
          {activeMenu === "bank-card" && (
            <>
              <div className="info">
                <i className="fas fa-info-circle"></i>
                <span>
                  Open your Bank mobile payment app on your phone and pay to
                  account number below
                </span>
              </div>
              <div class="payment-details">
                <p>
                  Payment account number (VA):
                  <span class="highlight">0000000000</span>
                </p>
                <p>
                  Account name:
                  <span class="highlight">Fukume</span>
                </p>
                <p>
                  Bank notes:
                  <span class="highlight">xxxxxx</span>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
