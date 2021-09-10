import React, { useEffect, useState } from 'react'
import Post from './Post'
import { useDispatch, useSelector } from 'react-redux'
import AddPost from './AddPost'
import { getPost, getPostCount } from '../redux/actions/postActions'
import { Pagination } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

import { Button ,Card, IconButton, InputBase } from '@material-ui/core'

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
  


const PostsList = () => {
    const classes = useStyles();

    const postList = useSelector(state => state.posts.postList)
    const auth = useSelector(state => state.auth)
    const count = useSelector(state => state.posts.count)
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(7)
    const [search, setSearch] = useState('')

    useEffect(() => {
        dispatch(getPostCount())
        dispatch(getPost(page, limit,search))
    }, [])

    const handlePageChange = (e, p) => {
        setPage(p)
        dispatch(getPost(p, limit,search))
    }
    return (
        <div style={{backgroundColor:'lightgrey',marginTop:'-10%',paddingTop:'15%'}}>
            {auth.isAuth && 
            <div style={{ display:'flex',flexDirection: 'column',alignItems: 'center',justifyContent: 'center'}}>
                <div style={{ display:'flex',flexDirection: 'row',alignItems: 'center',justifyContent: 'center'}}>

                    <InputBase style={{marginLeft:''}} value={search} className={classes.input} onChange={(e)=>setSearch(e.target.value)} placeholder="Search Post"/>
                    <IconButton  onClick={(e)=>{dispatch(getPost(page,limit,search));setSearch('')}} className={classes.iconButton} >
                    <SearchIcon />
                    </IconButton>
                </div>
                <AddPost />
            </div>}
            {postList.length && postList.map((post, index) => <Post key={index} post={post}></Post>)}
            <div style={{ display:'flex',flexDirection: 'column',alignItems: 'center',justifyContent: 'center'}}>
                <Pagination count={Math.ceil(count / limit)} onChange={handlePageChange} />
            </div>
            {/* <LimitSelector setLimit={setLimit} /> */}
            
        </div>
    )
}

export default PostsList;
