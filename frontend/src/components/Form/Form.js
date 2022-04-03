import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./styles";
import FileBase from "react-file-base64";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { createPost, updatePost} from "actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, postData));
     
    } else {
      dispatch(createPost(postData));
      
    }
    clear();
  };
  const handleChange = (e) => {
    const { value, name } = e.target;

    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const clear = (e) => {
    setCurrentId(null);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form} `}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} Memory
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          onChange={handleChange}
          value={postData.creator}
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          onChange={handleChange}
          value={postData.title}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          onChange={handleChange}
          value={postData.message}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          onChange={handleChange}
          value={postData.tags}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
