import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action สำหรับดึงโพสต์ทั้งหมด
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:5000/posts');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Async action สำหรับการสร้างโพสต์ใหม่
export const createPost = createAsyncThunk('posts/createPost', async (newPost, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:5000/posts', newPost);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Async action สำหรับการแก้ไขโพสต์
export const updatePost = createAsyncThunk('posts/updatePost', async (updatedPost, { rejectWithValue }) => {
  const { id, title, content } = updatedPost;
  try {
    const response = await axios.put(`http://localhost:5000/posts/${id}`, { title, content });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Async action สำหรับการลบโพสต์
export const deletePost = createAsyncThunk('posts/deletePost', async (postId, { rejectWithValue }) => {
  try {
    await axios.delete(`http://localhost:5000/posts/${postId}`);
    return postId;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling fetch posts
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })

      // Handling create post
      .addCase(createPost.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })

      // Handling update post
      .addCase(updatePost.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { id, title, content } = action.payload;
        const existingPost = state.posts.find(post => post.id === id);
        if (existingPost) {
          existingPost.title = title;
          existingPost.content = content;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })

      // Handling delete post
      .addCase(deletePost.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = state.posts.filter(post => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export default postSlice.reducer;
