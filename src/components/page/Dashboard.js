import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../Auth'

import Covidapi from '../Covidapi'

// Redux stuff
import { useDispatch, useSelector} from 'react-redux'
import { refreshUserData } from '../../redux/actions/userActions'


const DashBoard = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser !== null && user.authenticated === false) {
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