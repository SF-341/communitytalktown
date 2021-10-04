import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { allposts, selectposts, locationposts } from "../../redux/actions/dataActions";
import { getProvinces } from "../../redux/actions/addressAction";

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Select, FormControl, MenuItem, Grid, Button, InputLabel, Container } from '@material-ui/core';



export default function SelectPosts() {
    const dispatch = useDispatch();
    const address = useSelector(state => state.address);
    const [province, setProvince] = useState('');

    useEffect(() => {
        console.log(address.provinces);
        if (address.provinces === null) {
            dispatch(getProvinces());
        }

    }, [])

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
        formControl: {
            minWidth: 100,
        },

    });
    const classes = useStyles();

    return (<>
        <Container className={classes.root} >
            <Grid container >
                <Grid item xs={3} style={{ paddingLeft: '10px', paddingTop: '15px' }}>
                    <label htmlFor="contained-button-file">
                        <Button
                            type="button"
                            onClick={() => { dispatch(allposts()); }}
                            color="secondary"
                            variant="contained"
                            aria-label="right"
                            padding='auto'

                        >
                            All POSTS
                        </Button>
                    </label>
                </Grid>
                <Grid item xs={3} style={{ paddingTop: '15px' }}>
                    <label htmlFor="contained-button-file" >
                        <Button
                            type="button"
                            onClick={() => { dispatch(locationposts()); }}
                            color="primary"
                            variant="contained"
                            aria-label="right"
                            padding='auto'

                        >
                            MY LOCATION
                        </Button>
                    </label>
                </Grid>

                <Grid item xs={3} style={{ textAlign: 'end', paddingLeft: '15px' }}>
                    <FormControl className={classes.formControl} >
                        <InputLabel id="province"  >province</InputLabel>
                        <Select labelId="province" id="province" name="province" value={province} onChange={(e) => { setProvince(e.target.value) }} disabled={address.loading}>

                            <MenuItem value=""><em>None</em></MenuItem>
                            {address.provinces ? address.provinces.map((data) => (<MenuItem key={data.key} value={data.province}>{data.province}</MenuItem>)) : ""}

                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3} style={{ paddingTop: '15px', textAlign: 'center' }}>
                    <label htmlFor="contained-button-file" >
                        <Button
                            type="button"
                            onClick={() => { dispatch(selectposts(province)); }}
                            color="secondary"
                            variant="contained"
                            aria-label="right"
                            padding='auto'

                        >
                            SEARCH
                        </Button>
                    </label>
                </Grid>

            </Grid>
        </Container>

    </>
    )


}



