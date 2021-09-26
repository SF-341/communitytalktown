import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Typography, Button, Container, makeStyles, TextField, FormHelperText } from '@material-ui/core'
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

        }

    });

    const classes = useStyles();

    return (
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

                    <div justifyContent='center'>
                        &nbsp;&nbsp;
                        <input type="file" onChange={handleChange} name="image" />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button className={classes.btn}
                            type="submit"
                            color="secondary"
                            variant="contained"
                            position="absolute"

                            padding='auto'
                            endIcon={<KeyboardArrowRightIcon />}
                        >
                            Post
                        </Button>
                    </div>

                </form>
            </Container>
        </Card>

    )
}

export default CreatePost;





















