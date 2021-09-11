import React, { useEffect} from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { getComment } from '../redux/actions/commentActions'
import CommentPost from './CommentPost'


const CommentList = ({postId}) => {
    const commentList = useSelector(state => state.comments.commentList)
    const auth = useSelector(state => state.auth)
    const count = useSelector(state => state.posts.count)
    const dispatch = useDispatch()
    const postid ={postId}
    console.log(postid)
    useEffect(() => {
        dispatch(getComment(postId))
    }, [])

    
    return (
        <div style={{backgroundColor:'lightgrey',marginTop:'-10%',paddingTop:'15%'}}>
            
            {commentList.length === 0 ? null  : commentList.length && commentList.map((comment, index) => <CommentPost  key={index} postid={postid} comment={comment}></CommentPost>).reverse()}
            
            
        </div>
    )
}

export default CommentList
