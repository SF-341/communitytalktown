import React, { useEffect } from 'react'
import Comment from './Comment'

// Redux stuff
import { useDispatch, useSelector } from 'react-redux'





const RenderComment = ({postId}) => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.data);
    let commentList;
    if (data.comments){
        const index = data.comments.findIndex((comment) => comment[0].postid === postId);
        commentList = data.comments[index];
    }

    // useEffect(() => {
    //     dispatch(getComment(postId));
    // }, [])

    return (
        <>
        {!data.loading && commentList && commentList.map(comment => <Comment key={comment.id} dataComment={comment}/>)}
        </>
    )
}



export default RenderComment;
