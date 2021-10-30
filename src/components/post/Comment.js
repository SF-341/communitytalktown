import React, { useState } from 'react'

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { CardHeader, Grid, Menu, MenuItem } from '@material-ui/core/';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import Backdrop from '@material-ui/core/Backdrop';
import MoreVert from '@material-ui/icons/MoreVert';


// Redux stuff
import { useDispatch, useSelector } from 'react-redux'
import { deleteComment } from '../../redux/actions/dataActions'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
        maxWidth: 700,
        
    },
    media: {
        height: 20,
        paddingTop: '30%',
        width: 300,
        auto: 'format',
        paddingLeft: '10px',
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
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    icon: {
        color: red[500],
    },
    space: {

        paddingTop: 5,
    },
    Backdrop: {
        color: '#fff',
        zIndex: theme.zIndex.drawer + 1
    },
    imgBackdrop: {
        height: "80%"
    },
    iconDelete: {
        textAlign: 'right'
    },
    comment: {
        flex: 1,
    },
    img:{
        paddingLeft: "20%",
        paddingBottom: "15px",

    }
}));

const Comment = ({ dataComment }) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const imageSrc = dataComment.image;
    const discribtion = dataComment.discribtion;
    const createAt = dataComment.createAt;
    const commentusername = dataComment.username;
    const checkDelete = dataComment.userid === user.id;


    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const openn = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosed = () => {
        setAnchorEl(null);
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
                    avatar={<Avatar aria-label="recipe" className={classes.avatar} src={dataComment.userimage !== null ? dataComment.userimage : ''}>
                        {dataComment.userimage === null ? 'U' : ''}
                    </Avatar>}

                    action={
                        checkDelete ?
                            (<><IconButton aria-label="DeleteIcon"
                                aria-haspopup= 'true'
                                aria-expanded={openn ? true : undefined}
                                onClick={handleClick}>
                                <MoreVert fontSize="small" />
                            </IconButton>
                                <Menu
                                    id="demo-positioned-menu"
                                    aria-labelledby="demo-positioned-button"
                                    anchorEl={anchorEl}
                                    open={openn}
                                    onClose={handleClosed}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                >
                                    <MenuItem onClick={delComment}>Delete Comment</MenuItem>

                                </Menu></>)
                            : ''
                    }
                    title={commentusername}
                    subheader={discribtion}
                />
                <Grid item xs className={classes.img}>
                    {imageSrc !== null ? (<>
                        <form onClick={handleToggle}>
                            <CardMedia className={classes.media} image={imageSrc} />
                        </form>

                        <Backdrop className={classes.Backdrop} open={open} onClick={handleClose}>
                            <img className={classes.imgBackdrop} src={imageSrc} />
                        </Backdrop></>
                    )
                        : ''}
                </Grid>


            </Card>
        </div></>
    )
}



export default Comment
