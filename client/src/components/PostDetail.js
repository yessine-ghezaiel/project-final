import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";

import Avatar from '@material-ui/core/Avatar';
import './postDetails.css'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useDispatch, useSelector } from "react-redux";
import { deletepost, getPost, UpdatePost } from "../redux/actions/postActions";
import Compressor from 'compressorjs'
import { Button, makeStyles, TextareaAutosize} from "@material-ui/core"
import { useHistory } from "react-router";
import './detail.css'
import AddComment from './AddComment'
import CommentList from './CommentList';
import { getComment } from '../redux/actions/commentActions';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 0,
    },
    title: {
         flexGrow: 1,
         textAlign:'right',
       },
    menu:{
      flexGrow: 1,
      textAlign:'left',
    },
    
  }));
  


const PostDetail = ({match}) => {
    const classes = useStyles();
    const postList = useSelector(state => state.posts.postList)

    const post= postList.find((a)=>a._id === match.params._id) 


  const [selectedImage, setSelectedImage] = useState("")
  const history = useHistory()

  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [edit, setEdit] = useState(true)
  const [limit, setLimit] = useState(5)
  const [selectedImage_name, setSelectedImage_name] = useState("")
   useEffect(() => {
    dispatch(getComment(post._id))
}, [])
  const deletecar = (e,p) =>{
 
        
    dispatch(deletepost(post._id))
    history.puch('./posts')
    
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




    <div style={{marginTop:'-10%',paddingTop:'15%',overflow:'auto',background:'lightgray',minHeight:850}}>
      <div className='container mt-1' style={{ width: "40%", border:'',borderRadius: '12px',minHeight:'100%' }}>
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
                <div style={{fontSize:20}}>
                {post.description}
                </div>
                {post.image ?
                            
                            <img alt='' name="preview" style={{ display: 'block',
                              marginLeft: 'auto',
                              marginRight: 'auto',
                              width: '50%'}} src={post.image.url || post.image} ></img>
                            : null
                        }<br />            
                    
                    {auth.isAuth &&(
                    auth.user._id === post.owner._id ? 
                    <><Button onClick={()=>deletecar()} style={{backgroundColor:'#DC143C',color:'white',marginTop:'5%'}}><DeleteForeverIcon /></Button> <Button onClick={()=>startedit()}  style={{backgroundColor:'lime',color:'white',marginTop:'5%'}}>Edit</Button></>
                    : null
                    )}
              </div>
            </article>
                    : <div className={classes.root}>
                    <form  style={{ marginLeft:'-10%',width: "110%" }} onSubmit={handleSubmit}>
                        {/* a essayer sans selectedImage loula */}
                        {/* {selectedImage && <img name="preview" style={{ height: "100px" }} src={selectedImage || "./images/default.jpg"} alt="preview"></img>} */}
                        {post.image ?
                            
                            <img alt='' name="preview" style={{ height: "100px" }} src={selectedImage ==='' ? 
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
                <div style={{textAlign:'center',fontSize:40,fontWeight:'bolder' }}>
                  Comments
                
                </div>
          </div>
          {auth.isAuth ?

                <><AddComment postID={post._id} ></AddComment></>:null
          }
                <CommentList  postId={post._id} ></CommentList>
        </div>
      </div>
            
  </div>
  );
};

export default PostDetail;
