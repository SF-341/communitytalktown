import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Typography, Button, Container, makeStyles, TextField, FormHelperText, styled, Grid } from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import Card from '@material-ui/core/Card';


// Redux stuff
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../redux/actions/dataActions";


const CreatePost = () => {
    const state = useSelector(state => state.user);
    const UI = useSelector(state => state.UI)
    const dispatch = useDispatch();


    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [image, setImage] = useState(null);


    const handleChange = (e) => {
        if (e.target.name === "title") {
            setTitle(e.target.value)
        } else if (e.target.name === "details") {
            setDetails(e.target.value)
        } else if (e.target.name === "image") {
            setImage(e.target.files[0])

        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newPost = {
            id: uuidv4(),
            title,
            details,
            email: state.email,
            username: state.username,
            image,
            userimage:state.image,
            createAt: new Date(),
            likecount: 0,
            commentcount: 0,
            location: state.province,
        }
        dispatch(createPost(newPost));
        
    }
    const Input = styled('input')({
        display: 'none',
    });

    const useStyles = makeStyles({
        root: {
            margin: 'auto',
            maxWidth: 700,
            paddingTop: 5,
            paddingBottom: 5,
        },
        field: {
            display: 'block',
            padding: 10,
        },
        space: {
            paddingTop: 20,
        }


    });



    const classes = useStyles();

    return (
        <div className={classes.space}>
        <Card className={classes.root}>
            <Container className={classes.root} >
                <Typography
                    variant="h6"
                    color="textSecondary"
                    component="h2"
                    gutterBottom
                >
                    Create a New Post
                </Typography>

                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <TextField
                        error={!UI.loading && UI.error != null}
                        onChange={handleChange}
                        name="title"
                        className={classes.field}
                        label="Post Title"
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        required
                    />

                    <TextField
                        error={!UI.loading && UI.error != null}
                        onChange={handleChange}
                        name="details"
                        className={classes.field}
                        label="Details"
                        variant="outlined"
                        color="secondary"
                        multiline
                        rows={4}
                        fullWidth
                        required
                    />
                    {!UI.loading && UI.error != null ? <FormHelperText error id="component-error-text">{UI.error}</FormHelperText> : ''}

                    <Grid container >
                        <Grid item xs={6} sm={6} style={{ paddingLeft: '10px' }}>
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
                        </Grid>
                        <Grid item xs={6} sm={6} style={{ textAlign: 'end', paddingRight: '10px' }}>
                            <label htmlFor="contained-button-file" >
                                <Button
                                    type="submit"
                                    color="secondary"
                                    variant="contained"
                                    aria-label="right"
                                    padding='auto'
                                    endIcon={<KeyboardArrowRightIcon />}

                                >
                                    Post
                                </Button>
                            </label>
                        </Grid>
                    </Grid>


                </form>
            </Container>
        </Card>
</div>
    )
}

export default CreatePost;





















