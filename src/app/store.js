import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../features/posts/postSlice';
import userReducer from '../features/users/userSlice';
import commentReducer from '../features/comments/commentSlice';
import categoryReducer from '../features/categories/categorySlice';
import tagReducer from '../features/tags/tagSlice';

export const store = configureStore({
  reducer: {
    posts: postReducer,
    users: userReducer,
    comments: commentReducer,
    categories: categoryReducer,
    tags: tagReducer,
  },
});
