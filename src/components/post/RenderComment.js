import React, { useEffect } from 'react'
import Comment from './Comment'

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';
import clsx from 'clsx';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import Collapse from '@material-ui/core/Collapse';
import Backdrop from '@material-ui/core/Backdrop';

// Redux stuff
import { useDispatch, useSelector } from 'react-redux'
import { getComment} from '../../redux/actions/dataActions'




const RenderComment = ({postId}) => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.data);
    let commentList;
    if (data.comments){
        const index = data.comments.findIndex((comment) => comment[0].postid === postId);
        commentList = data.comments[index];
    }

    // useEffect(() => {
    //     dispatch(getComment(postId));
    // }, [])

    return (
        <>
        {!data.loading && commentList && commentList.map(comment => <Comment key={comment.id} dataComment={comment}/>)}
        </>
    )
}



export default RenderComment;
