import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getProfile, logout } from '../redux/actions/authActions'
import {Redirect} from 'react-router-dom'
import AddPost from '../components/AddPost'
import  { getMyPost } from '../redux/actions/postActions'
import Post from '../components/Post'
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

import PostsList from '../components/PostList'
import { Button ,Card, IconButton, InputBase } from '@material-ui/core'
import {Link, useHistory} from 'react-router-dom'
import MyPosts from '../components/MyPosts'
const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    backgroundColor:'white',
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));
const Profile =  () => {
    
    const auth = useSelector(state => state.auth)
    const postList = useSelector(state => state.posts.postList)
    const [search, setSearch] = useState('')
    // const count = useSelector(state => state.posts.count)
    const dispatch = useDispatch()
    console.log(search)
    useEffect(() => {
        
        dispatch(getMyPost(search))
    }, [])
    // console.log(postList)
    // console.log(auth)
    const classes = useStyles();
    return (
      <div
        style={{
          display: "grid",
          width: "100%",
          gridTemplateColumns: "30% 70%",
          background:'lightgrey'
          ,minHeight:'750px'
        }}
      >
        <div style={{marginLeft:'auto',marginRight:'auto' ,marginTop:'20%'}}>

          <img  style={{marginLeft:'25%', height:'150px',borderRadius:'50%',width:'150px'}} src={auth.user.image.url || auth.user.image}></img>
          <h1  style={{textAlign:'center'}}> {auth.user.firstname} {auth.user.lastname}   </h1>
          <h4 style={{textAlign:'center'}}> {auth.user.email}</h4>
        </div>

        <div >
            <div style={{width:'50%',marginLeft:'auto',marginRight:'auto',marginTop:'8%'}}>
                
                <InputBase style={{marginLeft:'20%'}} value={search} className={classes.input} onChange={(e)=>setSearch(e.target.value)} placeholder="Search Post"/>
                <IconButton  onClick={(e)=>{dispatch(getMyPost(search));setSearch('')}} className={classes.iconButton} >
                  <SearchIcon />
                </IconButton>
                
                <AddPost></AddPost>
            </div>
            
          {postList.length &&
            postList
              .map((post, index) => <MyPosts key={index} search={search} post={post}></MyPosts>)
              .reverse()}
        <div>

        </div>
        </div>
        {/* <button onClick={()=>dispatch(logout())}>logout</button> */}
      </div>
    );
}

export default Profile;
