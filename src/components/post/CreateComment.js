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
        e.preventDefault();
        const newComment = {
            id: uuidv4(),
            userid: user.id,
            postid: postId,
            discribtion,
            // userimage: user.image,
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
        root: {
            margin: 'auto',
            maxWidth: 700,
            paddingTop: 10,
            paddingBottom: 5,
        },
        field: {
            display: 'block',
            padding: 10,
        },
        btn: {
            paddingTop: 20,
            textAlign: 'end',
        },
        paper: {
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
            paddingTop: 10,

        }
    });

    const classes = useStyles();



    return (<>
        <Card className={classes.root}>
            <Container className={classes.root} >

                <form noValidate autoComplete="off" onSubmit={handleSubmit}>



                    <Grid container >
                        <Grid item xs={7} sm={7} >
                            <TextField
                                error={!UI.loading && UI.error != null}
                                onChange={handleChange}
                                name="discribtion"
                                className={classes.field}
                                label="discription"
                                variant="outlined"
                                color="secondary"
                                multiline
                                fullWidth
                                required
                            />
                            {!UI.loading && UI.error != null ? <FormHelperText error id="component-error-text">{UI.error}</FormHelperText> : ''}
                        </Grid>
                        <Grid item xs={5} sm={5} className={classes.btn}>
                            <label htmlFor="contained-button-file">
                                <Input accept="image/*" id="contained-button-file" type="file" onChange={handleChange} name="image" />
                                <Button

                                    variant="outlined"
                                    color="secondary"
                                    component="span"

                                >
                                    Upload
                                </Button>
                                &nbsp;&nbsp;&nbsp;{image && image.type}
                            </label>


                            <label htmlFor="contained-button-file" >
                                <Button
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    aria-label="right"
                                    padding='auto'


                                >
                                    COMMENT
                                </Button>
                            </label>
                        </Grid>


                    </Grid>


                </form>

            </Container>
        </Card>
        <Paper

            className={classes.papper}
        >

            <InputBase
                style={{ ml: 1, flex: 1, width: 350, paddingLeft: 10 }} x
                placeholder="Comment"

            />
            <label htmlFor="contained-button-file">
                
                <IconButton type="submit" style={{ p: '10px' }} aria-label="image">
                <Input accept="image/*" id="contained-button-file" type="file" onChange={handleChange} name="image"  endIcon={CameraAltOutlined}/>
                    <CameraAltOutlined style={{ textAlign: 'right' }} />
                </IconButton>
            </label>
            <IconButton type="submit" style={{ p: '10px' }} aria-label="search">
                <SendRounded style={{ textAlign: 'right' }} />
            </IconButton>


        </Paper></>

    )
}