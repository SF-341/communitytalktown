import React, { useContext, useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from './Auth'
import firebaseConfig from '../config'
import './Button.css';

// Redux stuff
import { logoutUser } from "../redux/actions/userActions"
import { useSelector, useDispatch } from 'react-redux'

const STYLES = ['btn--primary', 'btn--outline'];
const SIZES = ['btn--medium', 'btn--large'];

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize
}) => {
  const dispatch = useDispatch();

  const { currentUser } = useContext(AuthContext);

  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  const handleClick = () => {
    dispatch(logoutUser());
  }

  if (!currentUser) {
    return (
      <div className='btn-mobile'>
        <button
          className={`btn ${checkButtonStyle} ${checkButtonSize}`}
          onClick={onClick}
          type={type}
        >
          {children}
        </button>
      </div>);
  } else {
    return (
      <div className='btn-mobile'>
        <button
          className={`btn ${checkButtonStyle} ${checkButtonSize}`}
          onClick={handleClick}
          type={type}
        >
          {children}
        </button>
      </div>);
  }


};