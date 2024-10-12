import React, {useState} from 'react'
import ChooseBarCustomer from '../../modules/components/ChooseBarCustomer'
import carData from "../../assets/data/carData"
import rentalData from "../../assets/data/rentalData"
import {formatPrice} from "../../assets/format/numberFormat"
import "../../styles/customer/CarStatus.css"

const CarOrderDetails = ({ car, rental, handleCancel }) => {
    const { imgUrl, carName, rating, price } = car;
    const { bookDate, startDate, returnDate, status } = rental;
    return (
        <div className="car-order-container">
            <div className="title">My Renting Car:</div>
            <div className="car-order-content">
                <div className="car-image-section">
                    <img
                        className="car-image"
                        src={imgUrl}
                        alt={carName}
                    />
                </div>

                <div className="car-details-section">
                    <h1>{carName}</h1>
                    <div className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={star <= (rating) ? 'filled' : 'empty'}
                            >
                                {star <= (rating) ? '★' : '☆'}
                            </span>
                        ))}
                    </div>
                    <div className="car-info">
                        <div className="item"><h5>Book Date:</h5> <h5>{bookDate}</h5></div>
                        <div className="item"><h5>Starting Date:</h5> <h5>{startDate}</h5></div>
                        <div className="item"><h5>Return Date:</h5> <h5>{returnDate}</h5></div>
                        <div className="item"><h5>Price:</h5> <h5>{formatPrice(price)} VND</h5></div>
                    </div>
                </div>

            </div>
            <ProgressBar id={status} />
            <div className="cancel-section">
                <button className="cancel-btn" onClick={handleCancel}>Cancel Order</button>
            </div>
        </div>
    );
};

const ProgressBar = ({ id }) => {
    return (
        <div className="progress-bar">
            <div className="progress-item" >
                <h5>Book</h5>
                <div className={id < 1 ? 'progress-step' : 'progress-step isBook'} />
            </div>
            <div className="progress-item">
                <h5>Confirmed</h5>
                <div className={id < 2 ? 'progress-step' : 'progress-step isConfirm'} />
            </div>
            <div className="progress-item">
                <h5>Renting</h5>
                <div className={id < 3 ? 'progress-step' : 'progress-step isRent'} />
            </div>
            <div className="progress-item">
                <h5>Waiting Return</h5>
                <div className={id < 4 ? 'progress-step' : 'progress-step isWaiting'} />
            </div>
            <div className="progress-item">
                <h5>Completed</h5>
                <div className={id < 5 ? 'progress-step' : 'progress-step isComplete'} />
            </div>
        </div>
    );
};

const CarStatus = ({ id }) => {
    const [id_, setId] = useState(id);
    const car_data = carData.find(item => item.id === id_);
    const rental_data = rentalData.find(item => item.id === id_);
    const handleCancel = () => {
        setId(0);
    };
    return (
        <div class="AllPage">
            <div class="LeftSide">
                <div class="Bar">
                    <ChooseBarCustomer />
                </div>
            </div>
            <div class="RightSide sidefix">
                {id_ > 0 ? 
                <CarOrderDetails car={car_data} rental={rental_data} handleCancel={handleCancel}/> : 
                <h1>You have not rented any car yet</h1>}
            </div>


        </div>
    )
};

export default CarStatus;