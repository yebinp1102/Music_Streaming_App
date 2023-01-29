import React, { useState, useRef } from 'react'
import { postComment } from '../redux/albumSlice'
import { Album } from '../redux/interfaces/Album'
import { useAppDispatch } from '../redux/store'
import './CSS/CommentSection.css'

type AlbumProps = {
  album : Album
}

const CommentSeaction: React.FC<AlbumProps> = ({album}) => {
  const dispatch = useAppDispatch();
  const user = JSON.parse(localStorage.getItem('profile') || '{}').data
  const [comment, setComment] = useState('')

  const handleClick = () => {
    if(album._id && comment) {
      const id = album._id
      const finalComment = `${user.result.username} : ${comment}`
      dispatch(postComment({finalComment, id}))
      setComment('');
    }
  }

  return (
    <div>
      {/* 로그인 한 유저에게만 댓글 기능을 제공 */}
      {user?.result?.username && (
        <div className='commentInputField'>
          <input 
            placeholder='댓글을 남겨주세요.'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button disabled={!comment} onClick={handleClick}>등록</button>
        </div>
      )}
      <div className="commentsWrap">
        {album.comments.map((userComment, i) => (
          <div key={i}>{userComment}</div>
        ))}
      </div>
    </div>
  )
}

export default CommentSeaction