import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import {  makeStyles, styled, Grid, Paper, IconButton, InputBase,  } from '@material-ui/core'

import CameraAltOutlined from '@material-ui/icons/CameraAltOutlined';

import SendRounded from '@material-ui/icons/SendRounded';



// Redux stuff
import { useDispatch, useSelector } from 'react-redux'
import { createComment } from '../../redux/actions/dataActions'

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
            setImage(e.target.files[0])
        }
    }

    function handleSubmit(e) {
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
        setDiscribtion('');
        dispatch(createComment(newComment));
        
    }




    const Input = styled('input')({
        display: 'none',
    });
    const useStyles = makeStyles({

        paper: {
           
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
                    value={discribtion}

                />
                
            </Grid>
            <Grid item xs={2} sm={2}>
            {image && image.type}
                <label htmlFor="icon-button-file">
                    <Input accept="image/*" id="icon-button-file" type="file" onChange={handleChange} disabled={!user.authenticated} name="image" />
                    <IconButton color="primary" aria-label="upload picture" component="span" >
                        <CameraAltOutlined />
                    </IconButton>

                </label>
                
                <label htmlFor="icon-button">
                    <IconButton color="primary" type="submit" aria-label="upload picture" component="span" disabled={!user.authenticated} onClick={handleSubmit} >
                        <SendRounded />
                    </IconButton>
                </label>
            </Grid>

        </Paper>



    </>
    )
}