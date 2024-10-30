import React, { useState, useEffect } from "react";
import axios from 'axios';
import ChooseBar from "../../modules/components/ChooseBarCarOwner";
import ChooseBarCustomer from "../../modules/components/ChooseBarCustomer";
import ChooseBarAdmin from "../../modules/components/ChooseBarAdmin";
import "../../styles/cars_owner/Garage.css";
import "../../styles/home/myprofile.css";
import EditProfileModal from "../../modules/components/EditProfileModal";
import ChangePasswordModal from "../../modules/components/ChangePassWord";
import { formatPrice, formatDate_String } from "../../assets/format/numberFormat";
//import avatar from 'process.env.PUBLIC_URL'
const MyProfile = ({}) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isChangePass, setIsChangePass] = useState(false);
    const [Accid, setAccID] = useState(0);
    const [AccRole, setAccRole] = useState(0);

    const handleEditClick = (AccID) => {
        setIsEditing(true);
    };

    const handleSave = async (updatedUser) => {
        console.log("Updated User Data:", updatedUser);
        try {
            const response = await axios.put(`http://localhost:5000/api/account/${Accid}`, updatedUser);
            setUser(response.data); // Update the user data on success
            setIsEditing(false);

        } catch (error) {
            setError("Unable to save user data.");
        }
        window.location.reload();

    };

    const handleClose = () => {
        setIsEditing(false);
        setIsChangePass(false);
    };

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser && storedUser.id) {
            setAccID(storedUser.id);
            setAccRole(storedUser.role);
        }
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/account/${Accid}`);
                setUser(response.data);
            } catch (error) {
                setError("Unable to fetch user data.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    },);

    const getGender = (gender) => {
        if (gender) {
            return 'Female';
        } else {
            return 'Male';
        }
    };

    const handleChangePassClick = () => {
        setIsChangePass(true);
    }

    const handlePasswordSave = async (passwordData) => {
        try {
            // Here you would make an API request to change the password
            await axios.put(`http://localhost:5000/api/account/${Accid}/change-password`, passwordData);
            console.log("Password changed successfully");
            setIsChangePass(false);
        } catch (error) {
            setError("Unable to change the password.");
        }
    };

    return (
        <div className="AllPage">
            <div className="LeftSide">
                <div className="Bar">
                    {AccRole === 3 &&
                    <ChooseBar />
                    }
                    {AccRole === 2 &&
                    <ChooseBarCustomer />
                    }
                    {AccRole === 1 &&
                    <ChooseBarAdmin />
                    }
                </div>

            </div>
            <div className="RightSide">
                <div className="garage">
                    <div className="header">
                        <h1>My Profile</h1>
                    </div>
                    <div className="profile-info">
                        <div className="profile-avatar">
                            <img src={process.env.PUBLIC_URL + 'img/car/user.png'} alt="User Avatar" />
                        </div>
                        <div className="profile-details">
                            <p>
                                <strong className="Profile-Right">Name:</strong> <strong className="Profile-Left"> {user.UserName || "Name123"} </strong>
                            </p>
                            <p>
                                <strong className="Profile-Right">Gender:</strong> <strong className="Profile-Left"> {getGender(user.Gender) || "Mmale"} </strong>
                            </p>
                            <p>
                                <strong className="Profile-Right">Date of Birth:</strong> <strong className="Profile-Left"> {formatDate_String(user.DOB) || "01/01/2000"} </strong>
                            </p>
                            <p>
                                <strong className="Profile-Right">Phone:</strong> <strong className="Profile-Left"> {user.Phone || "123456789"} </strong>
                            </p>
                            <p>
                                <strong className="Profile-Right">Email:</strong> <strong className="Profile-Left"> {user.Email || "aaaa@gmail.com"} </strong>
                            </p>
                            <p>
                                <strong className="Profile-Right">Address:</strong> <strong className="Profile-Left"> {user.Address || "Burj Khalifa Blvd - Downtown Dubai - Dubai - Các Tiểu Vương quốc Ả Rập Thống nhất"} </strong>
                            </p>
                        </div>

                    </div>
                    <div className="profile-actions">
                        <button className="edit-profile-btn" onClick={handleEditClick}>Edit Profile</button>
                        <button className="change-password-btn" onClick={handleChangePassClick}>Change Password</button>
                    </div>
                </div>

            </div>

            {isEditing && (
                <EditProfileModal
                    user={user}
                    onSave={handleSave}
                    onClose={handleClose}
                />
            )}

            {isChangePass && (
                <ChangePasswordModal
                    user={user}
                    onSave={handlePasswordSave}
                    onClose={handleClose}
                />
            )}
        </div>
    );
};

export default MyProfile;
