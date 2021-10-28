import React, { useContext, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../Auth'

import { Button } from '@material-ui/core';


//posts
import LoadPostsdata from './LoadPostsdata';
import SelectPosts from './SelectPosts'
import Post from './Post'

// Redux stuff
import { useSelector, useDispatch } from "react-redux";
import { getPosts, getNextPosts } from "../../redux/actions/dataActions";
import { refreshUserData } from "../../redux/actions/userActions";
import Loading from '../UI/Loading'
import { isEmpty } from 'lodash'

const RenderPosts = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const data = useSelector(state => state.data);
    const UI = useSelector(state => state.UI);
    const address = useSelector(state => state.address);

    const { currentUser } = useContext(AuthContext);
    const getPostsLocation = data.posts.filter(post => post.location === user.province);
    const getPostsUserSelect = data.posts.filter(post => post.location === address.userselect);


    useEffect(() => {
        if (currentUser) {
            console.log(currentUser)
            if (!user.authenticated) {
                dispatch(refreshUserData());
            }
            if (isEmpty(data.posts)) {
                dispatch(getPosts());
            }
        }
    }, [])

    console.log(data.lastdoc)

    return (
        <>
            <div>
                <SelectPosts />

                {!currentUser ? <Redirect to="/login" /> :
                    (<>
                        <> {data.showallposts && data.posts.map((data) => (<Post key={data.id} dataPost={data} />))}</>
                        <> {data.showselectposts && getPostsUserSelect.map((data) => (<Post key={data.id} dataPost={data} />))}</>
                        <> {data.showlocationsposts && getPostsLocation.map((data) => (<Post key={data.id} dataPost={data} />))}</></>)
                }
                {UI.loading ? <Loading /> : data.lastdoc === undefined ? "" : <LoadPostsdata/>}
            </div>
        </>
    )
}

export default RenderPosts;