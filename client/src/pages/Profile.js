import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import AddPost from '../components/AddPost'
import  { getMyPost } from '../redux/actions/postActions'
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

import {  IconButton, InputBase } from '@material-ui/core'
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

          <img  alt='' style={{marginLeft:'25%', height:'150px',borderRadius:'50%',width:'150px'}} src={auth.user.image.url || auth.user.image}></img>
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
