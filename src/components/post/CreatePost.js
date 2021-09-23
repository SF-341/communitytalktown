import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Typography, Button, Container, makeStyles, TextField } from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'


import firebaseConfig, { storage, firestore } from '../../config'




const CreatePost = () => {
    const Auth = firebaseConfig.auth();
    const user = Auth.currentUser;


    const refPost = firestore.collection("Posts");
    const refUser = firestore.collection("User");

    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [image, setImage] = useState(null);

    const addPost = () => {
        const email = user.email;
        refUser.onSnapshot(querySnapshot => {
            const ListSnapshot = querySnapshot.docs;
            ListSnapshot.forEach(doc => {
                if (doc.data().email === email) {
                    let username = doc.data().username;
                    
                    if (image != null) {
                        let imgname = image.name;
                        const newPost = {
                            id: uuidv4(),
                            title,
                            details,
                            email,
                            username,
                            imgname,
                            createAt: new Date(),
                            likecount: 0,
                            commentcount: 0
                        }
                        uploadimage();
                        refPost
                            .doc(newPost.id)
                            .set(newPost)
                            .catch((error) => { console.log(error); });


                    } else {
                        let imgname = null;
                        const newPost = {
                            id: uuidv4(),
                            title,
                            details,
                            email,
                            username,
                            imgname,
                            createAt: new Date(),
                            likecount: 0,
                            commentcount: 0
                        }
                        refPost
                            .doc(newPost.id)
                            .set(newPost)
                            .catch((error) => { console.log(error); });
                    }

                }
            })
        }
        );
    }

    const uploadimage = () => {
        storage.ref('images/' + image.name).put(image);
    }

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
        addPost();
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





















