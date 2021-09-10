import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../redux/actions/postActions";
import {
Button,makeStyles,TextareaAutosize,TextField} from "@material-ui/core";
import { addComment, getComment } from "../redux/actions/commentActions";

//lets try without it later
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      
    },
  },
  input: {
    display: "none",
  },
  button: {
    margin: theme.spacing(1),
    height:'auto',
  },
}));

const AddComment = ({postID}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState({
    description: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment(postID,newComment));
    setNewComment({
      description: "",
    });
    dispatch(getComment(postID))
  };
  return (
    <div style={{display:'flex',flexDirecton:'row',marginBottom:'5%'}}>
      <form  style={{ marginLeft:'10%',width: "90%" ,display:'flex',flexDirecton:'row',justifyContent:'center'}} onSubmit={handleSubmit}>
                <TextareaAutosize aria-label="Post description"
                    placeholder="Post Description" value={newComment.description}
                    style={{ height: "100px", width: "80%", boxShadow: "5px 5px grey",display: 'inline-block' }}
                    onChange={(e) => setNewComment({ ...newComment, description: e.target.value })}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    style={{display:'inline-block' }}
                >
                    Add Comment
                </Button> 
      </form>
      
    </div>
  );
};

export default AddComment;
