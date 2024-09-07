import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTags } from '../../features/tags/tagSlice';

const TagList = () => {
  const dispatch = useDispatch();
  const tags = useSelector(state => state.tags.tags);
  const status = useSelector(state => state.tags.status);
  const error = useSelector(state => state.tags.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTags());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Tags</h1>
      <ul>
        {tags.map(tag => (
          <li key={tag.id}>{tag.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TagList;
