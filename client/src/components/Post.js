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
import { deletepost, getPost, UpdatePost } from "../redux/actions/postActions";
import AddPost from "./AddPost";
import Compressor from 'compressorjs'
import { Button, makeStyles, TextareaAutosize, TextField } from "@material-ui/core"
import { useHistory } from "react-router";
import {getComment} from "../redux/actions/commentActions";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function Post({ post }) {
  const classes = useStyles();
  const [selectedImage, setSelectedImage] = useState("")
  const history = useHistory()

  const postList = useSelector(state => state.posts.postList)
  const auth = useSelector(state => state.auth)
  const count = useSelector(state => state.posts.count)
  const dispatch = useDispatch()
  const [edit, setEdit] = useState(true)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
  const [selectedImage_name, setSelectedImage_name] = useState("")
  const deletecar = (e,p) => {
 
        
    dispatch(deletepost(post._id))
    setPage(p)
    dispatch(getPost(p, limit))
    
  }
  



  const [newPost, setNewPost] = useState({
      title:'',
      description:'',
  })
  const startedit =()=>{
    setEdit(false)
    setNewPost({
      title:post.title,
      description:post.description
  })}
  console.log(newPost)
  const handleImageChange = (e) => {
      if (e.target.files.length) {
          const myImage = e.target.files[0]
          const name_i=e.target.files[0].name
            console.log(name_i)
            setSelectedImage_name(e.target.files[0].name)
          new Compressor(myImage, {
              quality: 0.8,
              success(result) {
                  const reader = new FileReader()
                  reader.readAsDataURL(result)
                  reader.onloadend = () => {
                      setSelectedImage(reader.result)
                      setNewPost({ ...newPost,image: reader.result })
                  }

              }
          })
      }
  }
  const handleSubmit =(e,p)=>{
      e.preventDefault()
      dispatch(UpdatePost(post._id,newPost))
      dispatch(getPost(p, limit))

      setNewPost({
          title:'',
          description:'',
          image:''
      })
      setEdit(true)
  }

  return (
    // <Card className={classes.root}>
    //     <CardActionArea>
    //         <CardContent>
    //             {console.log(post)}
    //             <Typography variant="body2" color="textSecondary" component="p">
    //                 <Avatar alt="Remy Sharp" src={post.owner.image ? post.owner.image.url : "./images/default.jpg"} />
    //                 <span>{`${post.owner.firstname} ${post.owner.lastname} `}</span>
    //             </Typography>
    //             <Typography variant="body2" color="textSecondary" component="p">
    //                 {post.title}
    //             </Typography>

    //             <Typography variant="body2" color="textSecondary" component="p">
    //                 {post.description}
    //             </Typography>
    //         </CardContent>
    //         {post.image && <CardMedia
    //             component="img"
    //             alt="post image"
    //             style={{ height: 250, width: 400 }}
    //             image={post.image.url}
    //             title={'my title'}
    //         />}
    //     </CardActionArea>
    //     <CardActions>
    //         <Button size="small" color="primary">
    //             Share
    //         </Button>
    //         <Button size="small" color="primary">
    //             Learn More
    //         </Button>
    //     </CardActions>
    // </Card>

    <div >
      <div className='container mt-1' style={{ width: "40%", border:'',borderRadius: '12px' }}>
        <div class="row">
          <div class="col-12" >
            {
              edit ?
            
            <article class="blog-card " >
              
              <div class="blog-card__info" style={{ borderRadius: '10px' }}>
                <h4>{post.title}</h4>
                <p style={{ display: "flex", contentDirection: "row" }}>
                  
                  
                  <Avatar  className={classes.small}  src={post.owner.imag || post.owner.image.url || '/images/default.jpg'} />
                  <div style={{marginLeft:'2%'}}>
                    <p> {post.owner.firstname} {post.owner.lastname} <br />
                        Posted at :{post.createdAt.replace('T',' ').split(':')[0]+':'+post.createdAt.replace('T',' ').split(':')[1]}
                    </p>

                  </div>
                </p>
                <div style={{ marginLeft:'2%',fontSize:20,overflow:'auto' ,wordWrap: 'break-word'}}>
                {post.description}
                </div>
                
                    <Button class="btn btn--with-icon" onClick={()=>{dispatch(getComment(post._id)) ;history.push(`/posts/${post._id}`)}}  style={{marginTop:'2%',fontSize: 12}}>
                        READ MORE
                    </Button>
                    {auth.isAuth &&(
                    auth.user._id == post.owner._id ? 
                    <><Button onClick={()=>deletecar()} style={{marginTop:'2%',backgroundColor:'#DC143C',color:'white'}}><DeleteForeverIcon /></Button> <Button onClick={()=>startedit()}  style={{marginTop:'2%',backgroundColor:'lime',color:'white'}}>Edit</Button></>
                    : null
                    )}
              </div>
            </article>
                    : <div className={classes.root}>
                    <form  style={{ marginLeft:'-10%',width: "110%" }} onSubmit={handleSubmit}>
                        {/* a essayer sans selectedImage loula */}
                        {/* {selectedImage && <img name="preview" style={{ height: "100px" }} src={selectedImage || "./images/default.jpg"} alt="preview"></img>} */}
                        {post.image ?
                            
                            <img name="preview" style={{ height: "100px" }} src={selectedImage =='' ? 
                            post.image.url || post.image || '':selectedImage} ></img>
                            : null
                        }<br />
                        {/* <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            type="file"
                            multiple
                            onChange={handleImageChange}
                            
                        /> */}
                        <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="contained-button-file"
                                    type="file"
                                    onChange={handleImageChange}
                                    multiple
                                    
                                    
                                />
                        
                        {/* <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span">
                                Upload
                            </Button>
                        </label> */}
        
                        <TextareaAutosize aria-label="Post title"
                            placeholder="Post title" value={newPost.title}
                            style={{ height: "40px", width: "100%", boxShadow: "5px 5px grey" }}
                            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                        />
        
                        <TextareaAutosize aria-label="Post description"
                            placeholder="Post Description" value={newPost.description}
                            style={{ height: "100px", width: "100%", boxShadow: "5px 5px grey" }}
                            onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={handleSubmit}
                        >
                          Update Post
                        </Button>            
                    </form>
                </div>}
          </div>
        </div>
      </div>

      
    </div>
  );
}
