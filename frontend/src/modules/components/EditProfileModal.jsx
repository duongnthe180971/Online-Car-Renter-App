import React, { useState } from 'react';
import styled from 'styled-components';
import { formatPrice, formatDate_String } from "../../assets/format/numberFormat";


const EditProfileModal = ({ user, onSave, onClose }) => {
    const getGender = (gender) => (gender ? 'Male' : 'Female');
    const [errorPhone, setErrorPhone] = useState('');
    const [errorDob, setErrorDob] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isDOBValid, setIsDOBValid] = useState(true);

    const [formData, setFormData] = useState({
        name: user.UserName || '',
        gender: user.Gender === true,
        dob: user.DOB || '',
        phone: user.Phone || '',
        email: user.Email || '',
        address: user.Address || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === "gender" ? value === "true" : value });
        if (name === "phone") setIsPhoneValid(true);
        if (name === "email") setIsEmailValid(true);
        if (name === "dob") setIsDOBValid(true);
    };

    const handleSave = () => {
        let valid = true;

        if (!/^\d{10}$/.test(formData.phone)) {
            setErrorPhone('Phone number must be exactly 10 digits and contain only numbers');
            setIsPhoneValid(false);
            valid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setErrorEmail('Please enter a valid email address');
            setIsEmailValid(false);
            valid = false;
        }

        const today = new Date();
        const dob = new Date(formData.dob);
        if (dob >= today) {
            setErrorDob('Date of Birth must be before today');
            setIsDOBValid(false);
            valid = false;
        }

        if (!valid) {
            return;
        }

        setErrorPhone('');
        setErrorDob('');
        setErrorEmail('');
        setIsPhoneValid(true);
        setIsEmailValid(true);
        setIsDOBValid(true);
        onSave(formData);
        
    };

    return (
        <StyledModalOverlay>
            <StyledModalContent>
                <div className="Title">
                    <h2>Edit Profile</h2>
                </div>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <label>Gender:</label>
                <div className="radio-container">
                    <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="false"
                        checked={formData.gender === false}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="male">Male</label>
                    <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="true"
                        checked={formData.gender === true}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="female">Female</label>
                </div>

                <div className="form-group">
                    <label htmlFor="dob">Date Of Birth:</label>
                    <DateInput
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        isValid={isDOBValid}  // Pass DOB validity to style the input
                        required
                    />
                    {!isDOBValid && <ErrorMessage>{errorDob}</ErrorMessage>}
                </div>

                <div className="form-group">
                    <label>Phone</label>
                    <PhoneInput
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        isValid={isPhoneValid}  // Pass phone validity to style the input
                    />
                    {!isPhoneValid && <ErrorMessage>{errorPhone}</ErrorMessage>}
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <EmailInput
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        isValid={isEmailValid}  // Pass email validity to style the input
                    />
                    {!isEmailValid && <ErrorMessage>{errorEmail}</ErrorMessage>}
                </div>

                <div className="form-group">
                    <label>Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} />
                </div>

                <div className="actions">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </StyledModalContent>
        </StyledModalOverlay>
    );
};

const PhoneInput = styled.input`
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 2px solid ${({ isValid }) => (isValid ? 'gray' : 'red')};  // Red border if invalid
    &:focus {
        outline: none;
        border-color: ${({ isValid }) => (isValid ? 'blue' : 'red')};  // Keep red border on focus if invalid
    }
`;

const EmailInput = styled.input`
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 2px solid ${({ isValid }) => (isValid ? 'gray' : 'red')};  // Red border if invalid
    &:focus {
        outline: none;
        border-color: ${({ isValid }) => (isValid ? 'blue' : 'red')};  // Keep red border on focus if invalid
    }
`;

const DateInput = styled.input`
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 2px solid ${({ isValid }) => (isValid ? 'gray' : 'red')};  // Red border if invalid
    &:focus {
        outline: none;
        border-color: ${({ isValid }) => (isValid ? 'blue' : 'red')};  // Keep red border on focus if invalid
    }
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 0.9em;
    margin-top: 5px;
`;

const StyledModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const StyledModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;

    .radio-container {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        color: Black;
        
    }

    .Title{
        display: flex;
        justify-content: center;
    }
    h2{
        color: black;

    }

    .form-group {
        margin-bottom: 15px;
    }

    label {
        display: block;
        font-weight: bold;
        margin-bottom: 5px;
        color: black;
    }

    .form-group input {
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
    }

    .actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
    }

    button {
        padding: 8px 16px;
        cursor: pointer;
    }
`;

export default EditProfileModal;
