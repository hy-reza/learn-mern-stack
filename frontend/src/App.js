import React, { useEffect, useState } from "react";
import { Container, Grow, Grid, AppBar, Typography } from "@material-ui/core";
import useStyles from "styles";

import { useDispatch } from "react-redux";
import { getPosts } from "actions/posts";

import Posts from "components/Posts/Posts";
import Form from "components/Form/Form";

import memories from "./images/memories.png";
import "index.css";

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  console.info(currentId)

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar position="static" color="inherit" className={classes.appBar}>
        <img
          src={memories}
          alt="memories"
          height="60"
          className={classes.image}
        />
        <Typography variant="h2" align="center" className={classes.heading}>
          Memories
        </Typography>
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
            className={classes.mainContainer}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
