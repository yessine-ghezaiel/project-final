import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
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

    const post= postList.find((a)=>a._id == match.params._id) 


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
    // <div style={{marginTop:'200px'}}>
    //   <div className='container mt-5' style={{width:'40%',marginTop:'200px'}} >
    //     <div class="row">
    //       <div class="col-12">
    //         <article class="blog-card">
              
    //           <div class="blog-card__info">
    //             <h5>HARVICK GETS WHAT HE NEEDS, JOHNSON AMONG THOSE</h5>
    //             <p style={{display:'flex',contentDirection:'row'}}>
               
    //                 <Avatar alt="Remy Sharp" src='./' className={classes.small} />
    //                 <div>

    //                 <i class="fa fa-pencil-square-o"></i> Tony Jahson
                     
    //                 <br />
                    
    //                 <i class="fa fa-comments-o"></i> 150 
    //                 <i class="fa fa-comments-o"></i> 150
    //                 </div>
                    
                  
    //             </p>
    //             <p>
    //               Lorem ipsum dolor sit, amet consectetur adipisicing elit.
    //               Doloremque vero libero voluptatibus earum? Alias dignissimos
    //               quo cum, nulla esse facere atque, blanditiis doloribus at sunt
    //               quas, repellendus vel? Et, hic!
    //             </p>
    //             <a href="#" class="btn btn--with-icon">
    //               <i class="btn-icon fa fa-long-arrow-right"></i>READ MORE
    //             </a>
    //           </div>
    //         </article>
    //       </div>
    //     </div>
    //   </div>

    //   <section class="detail-page">
    //     <div class="container mt-5"></div>
    //   </section>
    // </div>






    <div style={{marginTop:'-10%',paddingTop:'15%',overflow:'auto',background:'lightgray',minHeight:800}}>
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
                            
                            <img name="preview" style={{ display: 'block',
                              marginLeft: 'auto',
                              marginRight: 'auto',
                              width: '50%'}} src={post.image.url || post.image} ></img>
                            : null
                        }<br />            
                    
                    {auth.isAuth &&(
                    auth.user._id == post.owner._id ? 
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
                <div style={{textAlign:'center',fontSize:40,fontWeight:'bolder' }}>
                  Comments
                
                </div>
          </div>
                <AddComment postID={post._id} ></AddComment>
                <CommentList  postId={post._id} ></CommentList>
        </div>
      </div>
            
  </div>
  );
};

export default PostDetail;
