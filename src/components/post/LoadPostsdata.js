
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Redux stuff
import { getNextPosts } from '../../redux/actions/dataActions'
import { useSelector, useDispatch } from "react-redux";


const useStyles = makeStyles((theme) => ({
    BtnMargin: {
        margin: 'auto',
        maxWidth: 700,
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    }
}));


export default function LoadPostsdata() {
    const dispatch = useDispatch();
    const data = useSelector(state => state.data)


    const OnLoadPosts = (e) => {
        e.stopPropagation();
       
        dispatch(getNextPosts(data.lastdoc));
    }

    const classes = useStyles();

    return (
        <div className={classes.BtnMargin}>
            <Button variant="outlined" onClick={OnLoadPosts} >more posts</Button>
        </div>
    )
}