
import { Button } from '@material-ui/core';


// Redux stuff
import { getNextPosts } from '../../redux/actions/dataActions'
import { useSelector, useDispatch } from "react-redux";


export default function LoadPostsdata() {
    const dispatch = useDispatch();
    const data = useSelector(state => state.data)
    

    const OnLoadPosts= (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        dispatch(getNextPosts(data.lastdoc));
    }

    return (
        <Button onClick={OnLoadPosts} >Load Posts</Button>
    )
}