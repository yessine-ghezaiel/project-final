import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';
import './postDetails.css'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useDispatch, useSelector } from "react-redux";
import AddPost from "./AddPost";
import Compressor from 'compressorjs'
import { Button, makeStyles, TextareaAutosize, TextField } from "@material-ui/core"
import { useHistory } from "react-router";
import { getComment,updateComment ,deletecomment} from "../redux/actions/commentActions";
const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
  });
const CommentPost = ({postid,comment}) => {
    const classes = useStyles();
    const history = useHistory()
  
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(true)

  const [newComment, setNewComment] = useState({
    description:''
})
const startedit =()=>{
  setEdit(false)
  setNewComment({
    ...newComment,
    description:comment.description
})}
const handleSubmit =(e)=>{
    e.preventDefault()
    dispatch(updateComment(comment._id,newComment))
    dispatch(getComment(comment.post))

    setNewComment({...newComment,
        description:''
    })
    setEdit(true)
}

  const deletecmnt = () => {

    dispatch(deletecomment(comment._id))
    dispatch(getComment(comment.post))
    
  }

    return (
      <div>
        <div className="container mt-1" style={{ width: "110%", border: "", borderRadius: "12px" }}>
          <div class="row">
            <div class="col-12">
              {edit ? (
                <article class="blog-card ">
                  <div class="blog-card__info" style={{ borderRadius: "10px" }}>
                    <p style={{ display: "flex", contentDirection: "row" }}>
                      <Avatar className={classes.small} src={comment.owner.imag || comment.owner.image.url || "/images/default.jpg"}/>
                      <div style={{ marginLeft: "2%" }}>
                        
                          
                          {comment.owner.firstname} {comment.owner.lastname} <br />
                          Posted at :
                          {comment.createdAt.replace("T", " ").split(":")[0] +":" +comment.createdAt.replace("T", " ").split(":")[1]}
                        
                      </div>
                    </p>
                    <div style={{ overflow:'auto' ,wordWrap: 'break-word'}}>
                      

                      {comment.description}
                      
                    </div>

                    
                    {auth.isAuth &&
                      (auth.user._id == comment.owner._id ? (
                        <>
                          <Button  onClick={()=>{ dispatch(deletecomment(comment._id)); dispatch(getComment(comment.post))}} style={{backgroundColor: "#DC143C",color: "white"}}> <DeleteForeverIcon /></Button> 
                            <Button onClick={() => startedit()} style={{ backgroundColor: "lime", color: "white" }}> Edit </Button>
                        </>
                      ) : null)}
                  </div>
                </article>
              ) : (
                <div className={classes.root}>
                  <form  style={{ marginLeft: "-10%", width: "110%" }} onSubmit={handleSubmit}>

                    <TextareaAutosize value={newComment.description} style={{ height: "100px",width: "100%", boxShadow: "5px 5px grey"}} onChange={(e) => setNewComment({ ...newComment, description: e.target.value })} />
                    <Button type="submit" variant="contained" color="primary" className={classes.button} >
                      Update Comment
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
}

export default CommentPost
