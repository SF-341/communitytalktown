import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom';
import LogInForm from '../form/LogInForm';

// css
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import { red } from '@material-ui/core/colors';
import { Backdrop, Collapse, Typography, IconButton, Avatar, CardActions, CardContent, CardMedia, CardHeader, Card } from '@material-ui/core';
import clsx from 'clsx';


// Redux stuff
import { Like, UnLike } from '../../redux/actions/likeActions'
import { getComment, deletePost, setbackdrop } from '../../redux/actions/dataActions'
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
    const data = useSelector(state => state.data)



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
    const index = data.comments.filter(val => val[0].postid === dataPost.id);

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };


    const handleClickBackDrop = () => {
        dispatch(setbackdrop(true))
    };



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



    const likeButton = !state.authenticated ? (<IconButton aria-label="add to favorites" onClick={handleClickBackDrop} ><FavoriteIcon /></IconButton>) :
        likedPost() ?
            (<IconButton aria-label="add to favorites" onClick={handleUnLike} >
                <FavoriteIcon color="secondary" /></IconButton>)
            : (<IconButton aria-label="add to favorites" onClick={handleLike} >
                <FavoriteIcon /></IconButton>)

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        if (index.length === 0) {
            dispatch(getComment(dataPost.id));
        }
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
                        <CardMedia className={classes.media} image={imageSrc} alt="" />
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
                    <Typography variant="body2" color="textSecondary" component={'span'}>
                        <p>{title}</p>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component={'span'}>
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
                        {state.authenticated ? <CreateComment postId={dataPost.id} /> : <form onClick={handleClickBackDrop}><CreateComment /></form>}

                    </CardContent>
                    <>
                        <CardContent>
                            <RenderComment postId={dataPost.id} />
                        </CardContent>
                    </>
                </Collapse>
            </Card>
        </div>

        </>
    )
}

export default Post;