import React, { useState, useEffect } from "react";
import "../../styles/General.css";
import "../../styles/customer/RentalDetail.css";

const RentalDetail = () => {
    const [name, setName] = useState("Toyota");
    const [bookDate, setBookDate] = useState("19/10/2024");
    const [startDate, setStartDate] = useState("20/10/2024");
    const [returnDate, setReturnDate] = useState("24/10/2024");
    const [price, setPrice] = useState("16666000");
    const [phone, setPhone] = useState("123456789");
    const [email, setEmail] = useState("aaaa@gmail.com");

    return (
        <div className="car-container">
            <div className="car-header">
                <button className="backButton">&lt; Back</button>
                <h1 className="heading">Rental Detail</h1>
            </div>

            <div className="formContainer">
                <form className="form">
                    <p className="info">Car Name: {name}</p>
                    <p className="info">Book Date: {bookDate}</p>
                    <p className="info">Start Date: {startDate}</p>
                    <p className="info">Return Date: {returnDate}</p>
                    <p className="info">Price: {price} vnd</p>

                    <div className="input-container">
                        <p className="info">Phone: </p>
                        <input
                            type="text"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="input"
                        />
                    </div>
                    <div className="input-container">
                        <p className="info">Email: </p>
                        <input
                            type="text"
                            placeholder="Phone"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input"
                        />
                    </div>




                    <div className="confirmButtonContainer">
                        <button type="submit" className="confirmButton">
                            Confirm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RentalDetail;
