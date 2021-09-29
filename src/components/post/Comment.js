import React, { useState } from 'react'

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
import { createComment, deleteComment } from '../../redux/actions/dataActions'

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
        auto: 'format'
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

const Comment = ({dataComment}) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const imageSrc = dataComment.image;
    const discribtion = dataComment.discribtion;
    const createAt = dataComment.createAt;
    const commentusername = dataComment.username;
    const checkDelete = dataComment.userid && user.id;


    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };


    function delComment() {

        const comment = {
            userid: user.id,
            postid: dataComment.postid,
            id: dataComment.id
        }
        dispatch(deleteComment(comment));
    }

    const classes = useStyles();

    return (
        <><div className={classes.space}>
            <Card className={classes.root}>
                <CardHeader
                    avatar={<Avatar aria-label="recipe" className={classes.avatar}>
                        <h1>U</h1>
                    </Avatar>}
                    title={commentusername}
                />

                {imageSrc !== null ? (<>
                    <form onClick={handleToggle}>
                        <CardMedia className={classes.media} image={imageSrc} />
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
                        <p>{discribtion}</p>
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    {checkDelete ?
                        <IconButton aria-label="DeleteIcon" onClick={delComment}>
                            <DeleteIcon fontSize="large" />
                        </IconButton> : ''}
                </CardActions>
            </Card>
        </div></>
    )
}



export default Comment
