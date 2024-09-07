import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments } from '../../features/comments/commentSlice';

const CommentList = ({ postId }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.comments);
  const status = useSelector((state) => state.comments.status);
  const error = useSelector((state) => state.comments.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchComments(postId));
    }
  }, [status, dispatch, postId]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments
          .filter((comment) => comment.postId === parseInt(postId))
          .map((comment) => (
            <li key={comment.id}>
              <strong>{comment.author}</strong>: {comment.content}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CommentList;
