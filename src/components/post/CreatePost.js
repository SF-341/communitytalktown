import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Typography, Button, Container, makeStyles, TextField } from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'


// Redux stuff
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../redux/actions/dataActions";


const CreatePost = () => {
    const state = useSelector(state => state.user);
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
            console.log(e.target.files[0]);
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
            createAt: new Date(),
            likecount: 0,
            commentcount: 0
        }
        dispatch(createPost(newPost));
    }

    const useStyles = makeStyles({

        field: {

            maxWidth: 700,
            marginTop: 20,
            marginBottom: 20,
            display: 'block'
        }
    });
    const classes = useStyles();

    return (

        <Container>
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

                <input type="file" onChange={handleChange} name="image" />

                <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    position="absolute"
                    endIcon={<KeyboardArrowRightIcon />}
                >
                    Post
                </Button>
            </form>
        </Container>
    )
}

export default CreatePost;





















