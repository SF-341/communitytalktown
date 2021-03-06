import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../Auth'

//posts
import CreatePost from '../post/CreatePost'
import RenderPosts from '../post/RenderPosts';

// login backdrob
import LogInForm from '../form/LogInForm';

// css
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';

// Redux stuff
import { useSelector, useDispatch } from "react-redux";
import { refreshUserData } from '../../redux/actions/userActions'
import { getPosts } from '../../redux/actions/dataActions'


const useStyles = makeStyles((theme) => ({

    Backdrop: {
        color: '#fff',
        zIndex: theme.zIndex.drawer + 1
    },

}));

const Home = () => {
    const data = useSelector(state => state.data)
    const user = useSelector(state => state.user)
    const { currentUser } = useContext(AuthContext);
    const dispatch = useDispatch();

    const classes = useStyles();

    useEffect(() => {
        if (currentUser !== null && user.authenticated === false) {
            dispatch(refreshUserData());
            if (data.posts.length === 0) {
                dispatch(getPosts())
            }
        }
    }, [])

    return (
        <>
            <div>
                {user.authenticated ? (<CreatePost />) : ''}
                <RenderPosts />
                <Backdrop
                    className={classes.Backdrop}
                    open={data.backdrop}
                >
                    <LogInForm />
                </Backdrop>
            </div>
        </>
    )
}

export default Home;