import React, { useContext, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../Auth'


import { useTheme } from '@material-ui/core/styles';



//posts
import CreatePost from '../post/CreatePost'
import SelectPosts from '../post/SelectPosts'
import Post from '../post/Post'

// Redux stuff
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../redux/actions/dataActions";
import { refreshUserData } from "../../redux/actions/userActions";
import Loading from '../UI/Loading'
import { isEmpty } from 'lodash'

const Home = () => {

    const theme = useTheme();
    
    

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const data = useSelector(state => state.data);
    const UI = useSelector(state => state.UI);
    const address = useSelector(state => state.address);

    const { currentUser } = useContext(AuthContext);
    const getPostsLocation = data.posts.filter(post => post.location === user.province)
    const getPostsUserSelect = data.posts.filter(post => post.location === address.userselect)


    useEffect(() => {
        if (currentUser) {
            console.log(currentUser)
            if (!user.authenticated) {
                dispatch(refreshUserData());
            }
            if (isEmpty(data.posts)) {
                console.log("1");
                dispatch(getPosts());
            }
        }
    }, [])



    return (
        <>
            <div>
                <CreatePost />
                <SelectPosts />

                {!currentUser ? <Redirect to="/login" /> :
                    (UI.loading ? <Loading /> : <>
                        <> {data.showallposts && data.posts.map((data) => (<Post key={data.id} dataPost={data} />))}</>
                        <> {data.showselectposts && getPostsUserSelect.map((data) => (<Post key={data.id} dataPost={data} />))}</>
                        <> {data.showlocationsposts && getPostsLocation.map((data) => (<Post key={data.id} dataPost={data} />))}</></>)
                }
            </div>
        </>
    )
}

export default Home;