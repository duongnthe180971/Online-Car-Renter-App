import React from "react";
import styled from "styled-components";

const DeleteConfirmationCard = ({ onConfirmDelete, onCancelDelete }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="container">
          <div className="right">
            <div className="text-wrap">
              <p className="text-content">
                Are you sure you want to delete this car?
              </p>
            </div>
            <div className="button-wrap">
              <button className="primary-cta" onClick={onConfirmDelete}>
                Yes
              </button>
              <button className="secondary-cta" onClick={onCancelDelete}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;

  .card {
    width: fit-content;
    background-color: #f2f3f7;
    border-radius: 0.75em;
    cursor: pointer;
    transition: ease 0.2s;
    border: 1.5px solid #f2f3f7;
    padding: 1.5em;
  }

  .card:hover {
    background-color: #d3ddf1;
    border: 1.5px solid #1677ff;
  }

  .container {
    display: flex;
    flex-direction: column;
  }

  .text-wrap {
    color: #333;
    margin-bottom: 1em;
  }

  .button-wrap {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1em;
    align-items: center;
  }

  .secondary-cta {
    background-color: transparent;
    border: none;
    font-size: 15px;
    font-weight: 400;
    color: #666;
    cursor: pointer;
  }

  .primary-cta {
    font-size: 15px;
    background-color: transparent;
    font-weight: 600;
    color: #1677ff;
    border: none;
    border-radius: 1.5em;
    cursor: pointer;
  }

  button:hover {
    text-decoration: underline;
  }
`;

export default DeleteConfirmationCard;
