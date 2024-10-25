import React, { useState } from 'react';
import styled from 'styled-components';

const ChangePasswordModal = ({ user, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');
    const [isCurrentPasswordValid, setIsCurrentPasswordValid] = useState(true);
    const [isNewPasswordValid, setIsNewPasswordValid] = useState(true);
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Clear the error message when user starts typing
        if (name === "currentPassword") {
            setIsCurrentPasswordValid(true);
            setError('');
        }
        if (name === "newPassword") {
            setIsNewPasswordValid(true);
            setError('');
        }
        if (name === "confirmPassword") {
            setIsConfirmPasswordValid(true);
            setError('');
        }
    };

    // Handle Save (validating the passwords)
    const handleSave = () => {
        if(formData.currentPassword.trim() !== user.PassWord.trim()){
            setError('Current Password is incorrect');
            setIsCurrentPasswordValid(false);
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setError('New password and confirm password do not match');
            setIsNewPasswordValid(false);
            setIsConfirmPasswordValid(false);
            return;
        }

        if (formData.newPassword.length < 8) {
            setError('Password must be at least 8 characters long');
            setIsNewPasswordValid(false);
            return;
        }

        setError('');
        setIsCurrentPasswordValid(true);
        setIsNewPasswordValid(true);
        setIsConfirmPasswordValid(true);
        console.log("Password change submitted", formData);
        onSave(formData);  // Submit the form data
    };

    return (
        <StyledModalOverlay>
            <StyledModalContent>
                <div className="Title">
                    <h2>Change Password</h2>
                </div>

                {/* Current Password Field */}
                <div className="form-group">
                    <label>Current Password</label>
                    <PasswordInput
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        isValid={isCurrentPasswordValid}
                        required
                    />
                </div>

                {/* New Password Field */}
                <div className="form-group">
                    <label>New Password</label>
                    <PasswordInput
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        isValid={isNewPasswordValid}
                        required
                    />
                </div>

                {/* Confirm Password Field */}
                <div className="form-group">
                    <label>Confirm Password</label>
                    <PasswordInput
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        isValid={isConfirmPasswordValid}
                        required
                    />
                    {!isCurrentPasswordValid || !isNewPasswordValid || !isConfirmPasswordValid ? (
                        <ErrorMessage>{error}</ErrorMessage>
                    ) : null}
                </div>

                {/* Action Buttons */}
                <div className="actions">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </StyledModalContent>
        </StyledModalOverlay>
    );
};

// Styled component for error message
const ErrorMessage = styled.p`
    color: red;
    font-size: 0.9em;
    margin-top: 5px;
`;

// Styled component for password input
const PasswordInput = styled.input`
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 2px solid ${({ isValid }) => (isValid ? 'gray' : 'red')};  // Red border if invalid
    &:focus {
        outline: none;
        border-color: ${({ isValid }) => (isValid ? 'blue' : 'red')};  // Keep red border on focus if invalid
    }
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

    .Title {
        display: flex;
        justify-content: center;
    }

    h2 {
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

export default ChangePasswordModal;
