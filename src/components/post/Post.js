import React, { useState, useEffect } from 'react'

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
import DeleteIcon from '@material-ui/icons/Delete';
import clsx from 'clsx';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import Collapse from '@material-ui/core/Collapse';
import Backdrop from '@material-ui/core/Backdrop';


// Redux stuff
import { Like, UnLike } from '../../redux/actions/likeActions'
import { getComment, deletePost } from '../../redux/actions/dataActions'
import { useSelector, useDispatch } from "react-redux";

import CreateComment from './CreateComment'
import RenderComment from './RenderComment'


const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
        maxWidth: 700,
    },
    media: {
        hight: 164,
        paddingTop: '70%',
        width: 'auto',
        fit: 'crop',
        auto: 'format',
        backgroundSize: 'contain',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(0deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    icon: {
        color: red[500],
    },
    space: {

        paddingTop: 10,
    },
    Backdrop: {
        color: '#fff',
        zIndex: theme.zIndex.drawer + 1
    },
    imgBackdrop: {
        height: "80%"
    }
}));

const Post = ({ dataPost }) => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.user)



    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const title = dataPost.title;
    const details = dataPost.details;
    const username = dataPost.username;
    const createAt = dataPost.createAt.hasOwnProperty("seconds") ? dataPost.createAt.toDate().toLocaleString('en-US', options) : dataPost.createAt.toLocaleTimeString('en-US', options);
    const imageSrc = dataPost.image;
    const likecount = dataPost.likecount;
    const commentcount = dataPost.commentcount;
    const userimage = dataPost.userimage;
    const checkDelete = state.authenticated && dataPost.email === state.email;

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    // function loadMore() {

    // }

    function likedPost() {
        if (state.likes && state.likes.find((like) => dataPost.id === like.postid)) {
            return true;
        } else {
            return false;
        }
    }

    const handleLike = () => {
        dispatch(Like(dataPost.id))
    }

    const handleUnLike = () => {
        dispatch(UnLike(dataPost.id))
    }



    const likeButton = likedPost() ?
        (<IconButton aria-label="add to favorites" onClick={handleUnLike} >
            <FavoriteIcon color="secondary" /></IconButton>)
        : (<IconButton aria-label="add to favorites" onClick={handleLike} >
            <FavoriteIcon /></IconButton>)

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        dispatch(getComment(dataPost.id));
        setExpanded(!expanded);
    };

    const delPost = () => {
        dispatch(deletePost(dataPost.id));
        // const documentRef = firestore.doc(`Posts/${dataPost.id}`);
        // documentRef.delete();
    }

    useEffect(() => {
    }, [])
    
    const classes = useStyles();
    return (
        <><div className={classes.space}>
            <Card className={classes.root}>
                <CardHeader


                    avatar={userimage !== null ? <Avatar src={userimage}></Avatar> : <Avatar className={classes.avatar}>{username[0]}</Avatar>}
                    title={username}
                    subheader={createAt} />

                {imageSrc !== null ? (<>
                    <form onClick={handleToggle}>
                        <CardMedia className={classes.media} image={imageSrc}  alt="" />
                    </form>

                    <Backdrop
                        className={classes.Backdrop}
                        open={open}
                        onClick={handleClose}
                    >
                        <img
                            className={classes.imgBackdrop}
                            src={imageSrc} />
                    </Backdrop></>

                )
                    : ''}

                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <p>{title}</p>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <p>{details}</p>
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    {likeButton}
                    <span>{likecount}</span>

                    {checkDelete ?
                        <IconButton aria-label="DeleteIcon" onClick={delPost}>
                            <DeleteIcon fontSize="large" />
                        </IconButton> : ''}


                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="comment"
                    >
                        <QuestionAnswerOutlinedIcon />
                        <span>&nbsp;&nbsp;&nbsp;{commentcount}</span>
                    </IconButton>

                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <CreateComment postId={dataPost.id} />
                    </CardContent>
                    <CardContent>
                        <RenderComment postId={dataPost.id} />
                    </CardContent>
                </Collapse>
            </Card>
        </div>

        </>
    )
}

export default Post;