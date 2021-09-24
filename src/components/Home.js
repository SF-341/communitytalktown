import React, { useContext, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from './Auth'
import CreatePost from './post/CreatePost'
// import RenderPost from './RenderPost'

import Post from './post/Post'


// Redux stuff
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../redux/actions/dataActions";
import { refreshUserData } from "../redux/actions/userActions";

const Home = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.data);
    
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser){
            dispatch(refreshUserData());
        }
        dispatch(getPosts());
    }, [])

    return (
        <>
            <div className="container mt-4">
                <CreatePost />
                {!currentUser ? <Redirect to="/login" /> :

                <> {state.posts && state.posts.map((data) => (<Post key={data.id} dataPost={data} />))}</>}
            </div>
        </>
    )
}

export default Home;