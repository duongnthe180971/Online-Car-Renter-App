import React from "react";
import aboutus from "../../assets/icon/aboutus.gif";
import "../../styles/home/aboutus.css";
import HomeHeader from "./homeheader";

function App() {
  return (
    <div className="aboutus-body">
      <HomeHeader></HomeHeader>
      <div className="aboutus-container">
        <div className="image-section">
          <img alt="Ảnh GIF động" src={aboutus} />
        </div>
        <div className="form-section">
          <div className="toggle-switch">
            <input type="checkbox" id="dark-mode-toggle" />
          </div>
          <h1>CONTACT US</h1>
          <p>
            <h5>
              Mỗi chuyến đi là một hành trình khám phá cuộc sống và thế giới
              xung quanh, là cơ hội học hỏi và chinh phục những điều mới lạ của
              mỗi cá nhân để trở nên tốt hơn. Do đó, chất lượng trải nghiệm của
              khách hàng là ưu tiên hàng đầu và là nguồn cảm hứng của đội ngũ
              CARDIO.
            </h5>
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
          <div class="social-icons">
            <a href="./aboutus" title="Contact">
              <i class="fas fa-phone"></i> 1900.1234
            </a>
            <a href="https://facebook.com/" title="Facebook">
              <i class="fab fa-facebook-f"></i> Facebook
            </a>
            <a href="./aboutus" title="Zalo">
              <i class="fas fa-comment-dots"></i> Message
            </a>
            <a href="https://tiktok.com/" title="TikTok">
              <i class="fab fa-tiktok"></i> Tiktok
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
