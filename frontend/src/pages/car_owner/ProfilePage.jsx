import React, { useState, useEffect } from "react";
import axios from 'axios';
import EditProfileModal from "../../modules/components/EditProfileModal";
import ChangePasswordModal from "../../modules/components/ChangePassWord";
import { formatDate_String } from "../../assets/format/numberFormat";
import "../../styles/cars_owner/ProfileCard.css"; // Assuming similar styling used
import { useLocation, useNavigate } from "react-router-dom";

const ProfileCard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isChangePass, setIsChangePass] = useState(false);
    const { profileID } = location.state || {};

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/account/${profileID}`);
                setUser(response.data);
            } catch (error) {
            } finally {
            }
        };

        fetchUserData();
    }, [profileID]);

    const getGender = (gender) => {
        return gender ? 'Female' : 'Male';
    };


    return (
        <div className="profile-card-wrapper-custom">
            <div className="car-header">
                <button className="backButton" onClick={() => navigate(-1)}>&lt; Back</button>
                <h1 className="heading">Partner Detail</h1>
            </div>
            <div className="profile-card-custom">
                <div className="profile-card-header-custom">
                    <h1>My Profile</h1>
                </div>

                <div className="profile-card-info-custom">
                    <div className="profile-card-avatar-custom">
                        <img src={process.env.PUBLIC_URL + 'img/car/user.png'} alt="User Avatar" />
                    </div>
                    <div className="profile-card-details-custom">
                        <p>
                            <strong className="profile-card-label-custom">Name:</strong>
                            <strong className="profile-card-value-custom"> {user.UserName || "Name123"} </strong>
                        </p>
                        <p>
                            <strong className="profile-card-label-custom">Gender:</strong>
                            <strong className="profile-card-value-custom"> {getGender(user.Gender) || "Male"} </strong>
                        </p>
                        <p>
                            <strong className="profile-card-label-custom">Date of Birth:</strong>
                            <strong className="profile-card-value-custom"> {formatDate_String(user.DOB) || "01/01/2000"} </strong>
                        </p>
                        <p>
                            <strong className="profile-card-label-custom">Phone:</strong>
                            <strong className="profile-card-value-custom"> {user.Phone || "123456789"} </strong>
                        </p>
                        <p>
                            <strong className="profile-card-label-custom">Email:</strong>
                            <strong className="profile-card-value-custom"> {user.Email || "aaaa@gmail.com"} </strong>
                        </p>
                        <p>
                            <strong className="profile-card-label-custom">Address:</strong>
                            <strong className="profile-card-value-custom"> {user.Address || "aaaa@gmail.com"} </strong>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
