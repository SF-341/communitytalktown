import React, { useState, useEffect } from 'react'
import firebaseConfig from "../config";
import { Container } from '@material-ui/core'
import Post from './post/Post';

// Redux stuff
import { useSelector } from "react-redux";


const RenderPost = () => {

    const state = useSelector(state => state.data)
    

    

    

    return (
        <Container>
            <div>
                {state.posts.map((data) => (<Post key={data.id} dataPost={data} />))}
            </div>
        </Container>

    )
}

export default RenderPost;