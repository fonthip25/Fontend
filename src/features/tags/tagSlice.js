import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action สำหรับดึงข้อมูลแท็กทั้งหมด
export const fetchTags = createAsyncThunk('tags/fetchTags', async () => {
  const response = await axios.get('http://localhost:5000/tags');
  return response.data;
});

const tagSlice = createSlice({
  name: 'tags',
  initialState: {
    tags: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tags = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default tagSlice.reducer;
