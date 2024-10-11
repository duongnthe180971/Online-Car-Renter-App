import React from "react";
import aboutus from "../../assets/icon/aboutus.gif";
import "../../styles/home/aboutus.css";
import HomeHeader from "./homeheader";

function App() {
  return (
    <div className="body-aboutus">
      <HomeHeader></HomeHeader>
      <div className="container-aboutus">
        <div className="image-section">
          <img alt="Ảnh GIF động" src={aboutus} />
        </div>
        <div className="form-section">
          <div className="toggle-switch">
            <input type="checkbox" id="dark-mode-toggle" />
          </div>
          <h1>CONTACT US</h1>
          <p>
            Planning to visit Indonesia soon? Get insider tips on where to go,
            things to do and find best deals for your next adventure.
          </p>
          <form>
            <label htmlFor="name">FULL NAME</label>
            <input type="text" id="name" placeholder="Your Full Name" />
            <label htmlFor="email">EMAIL ADDRESS</label>
            <input type="email" id="email" placeholder="Your Email Address" />
            <label htmlFor="message">MESSAGE</label>
            <textarea
              id="message"
              rows="4"
              placeholder="Your Message"
            ></textarea>
            <button type="submit">SEND</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
