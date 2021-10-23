import React from 'react';
import { makeStyles, Container, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    margin: 'auto',
    maxWidth: 700,
    paddingTop: 40,
    textAlign: 'center',
  },

});

export default function Loading() {

  const classes = useStyles();

  return (
    <>
      <Container className={classes.root} >
        
          <CircularProgress />
        
      </Container>
    </>


  );
}