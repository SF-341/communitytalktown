import Covidapi from '../Covidapi'
import React, { useContext, useEffect } from 'react';

import { AuthContext } from '../Auth'

// Redux stuff
import { useDispatch } from 'react-redux'
import { refreshUserData } from '../../redux/actions/userActions'


const DashBoard = () => {
    const dispatch = useDispatch();
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (!currentUser) {
            dispatch(refreshUserData());
        }
    }, [])

    return (
        <>
            <Covidapi />
        </>
    )
}

export default DashBoard;