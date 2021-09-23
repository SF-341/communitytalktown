import React, { useState, useContext, useEffect, useReducer } from 'react'
import firebaseConfig, { firestore, storage } from '../../config'
import { Liked, DelLikeid, SetLikeid } from '../Like'


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

// Redux stuff
import { useSelector, useDispatch } from "react-redux";


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 700,
    },
    media: {
        hight: 0,
        paddingTop: '56.25%'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    icon: {
        color: red[500],
    },
}));
console.log("id")
const Post = ({ dataPost }) => {
    const state = useSelector(state => state.user)

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };

    const title = dataPost.title;
    const details = dataPost.details;
    const username = dataPost.username;

    const createAt = dataPost.createAt.toDate().toLocaleString('en-US', options);
    const Url = dataPost.imgname;
    const checkImg = false;
    const like = dataPost.like;
    const checkLike = false;
    const checkDelete = state.authenticated && dataPost.email == state.email ;

    

    // const [title, setTitle] = useState();
    // const [details, setDetails] = useState();
    // const [username, setUsername] = useState();

    // const [dateTime, setDateTime] = useState();
    // const [Url, setUrl] = useState("");
    // const [checkImg, setCheckImg] = useState(false);
    // const [like, setLike] = useState();
    // const [checkLike, setCheckLike] = useState("");
    // const [checkDelete, setCheckDelete] = useState();


    // const storageRef = storage.ref();
    // const documentRef = firestore.doc("Posts/" + id);
    // async function fetchdata() {
    //     await documentRef.get().then(documentSnapshot => {
    //         const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    //         let data = documentSnapshot.data();
    //         setTitle(data.title);
    //         setDetails(data.details);
    //         setUsername(data.username);

    //         setDateTime(data.createAt.toDate().toLocaleString('en-US', options));
    //         setLike(data.likecount);
    //         setCheckDelete(user.email === data.email);

    //         if (data.imgname != null) {
    //             setCheckImg(true);
    //             var imgRef = storageRef.child('images/' + data.imgname);
    //             imgRef.getDownloadURL()
    //                 .then((url) => {
    //                     setUrl(url);
    //                 }).catch((error) => {
    //                     console.log(error);
    //                 })
    //         } else {
    //             setCheckImg(false);
    //         }

    //     })
    // }




    // useEffect(() => {
    //     fetchdata();
    // })


    const handleLike = (e) => {
        
    }

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    function deletePost() {
        const documentRef = firestore.doc("Posts/" + dataPost.id);
        documentRef.delete();
    }



    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        <h1>U</h1>
                    </Avatar>
                }
                title={username}
                subheader={createAt}
            />
            {checkImg ? <CardMedia className={classes.media} image={Url} /> : ""}

            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    <p>{title}</p>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    <p>{details}</p>
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" >
                    {checkLike ? <FavoriteIcon color="secondary" onclick={handleLike}/> : <FavoriteIcon />}
                    &nbsp;&nbsp;{like}&nbsp;
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>

                {checkDelete ?
                    <IconButton aria-label="DeleteIcon" onClick={deletePost}>
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
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                </CardContent>
            </Collapse>

        </Card>
    )
}

export default Post;