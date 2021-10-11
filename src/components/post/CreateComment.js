import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Typography, Button, Container, makeStyles, TextField, FormHelperText, styled, Grid, Paper, IconButton, InputBase, Divider, } from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import Card from '@material-ui/core/Card';
import CameraAltOutlined from '@material-ui/icons/CameraAltOutlined';
import MenuIcon from '@material-ui/core/Menu';
import SendRounded from '@material-ui/icons/SendRounded';



// Redux stuff
import { useDispatch, useSelector } from 'react-redux'
import { createComment, deleteComment } from '../../redux/actions/dataActions'

export default function CreateComment({ postId }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const UI = useSelector(state => state.UI)

    const [discribtion, setDiscribtion] = useState('');
    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        if (e.target.name === "discribtion") {
            setDiscribtion(e.target.value)
        } else if (e.target.name === "image") {
            console.log(e.target.files[0]);
            setImage(e.target.files[0])
        }
    }

    function handleSubmit(e) {
        console.log(image)
        e.preventDefault();
        const newComment = {
            id: uuidv4(),
            userid: user.id,
            postid: postId,
            discribtion,
            userimage: user.image,
            username: user.username,
            createAt: new Date(),
            image
        }
        dispatch(createComment(newComment));
    }




    const Input = styled('input')({
        display: 'none',
    });
    const useStyles = makeStyles({

        paper: {
            p: '2px 4px',
            display: 'flex',
            maxWidth: 700,
            paddingLeft: 20,

        },
        fieldcomment: {
            width: 500,
            paddingTop: 10,
        },

    });

    const classes = useStyles();



    return (<>

        <Paper className={classes.paper} >
            <Grid item xs={10} sm={10}>
                <InputBase
                    onChange={handleChange} name="discribtion"
                    className={classes.fieldcomment}
                    placeholder="Comment"

                />
                
            </Grid>
            <Grid item xs={2} sm={2}>
            {image && image.type}
                <label htmlFor="icon-button-file">
                    <Input accept="image/*" id="icon-button-file" type="file" onChange={handleChange} name="image" />
                    <IconButton color="primary" aria-label="upload picture" component="span" >
                        <CameraAltOutlined />
                    </IconButton>

                </label>
                
                <label htmlFor="icon-button">
                    <IconButton color="primary" type="submit" aria-label="upload picture" component="span" onClick={handleSubmit} >
                        <SendRounded />
                    </IconButton>
                </label>
            </Grid>

        </Paper>



    </>
    )
}