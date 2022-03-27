import React from "react";
import { Container, Grow, Grid, AppBar, Typography } from "@material-ui/core";
import useStyles from "styles";

import Post from "components/Posts/Posts";
import Form from "components/Form/Form";

import memories from "./images/memories.png";

const App = () => {
  const classes = useStyles();

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
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Post />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
