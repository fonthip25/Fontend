import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action สำหรับดึงข้อมูลหน้า Home
export const fetchHomeData = createAsyncThunk('home/fetchHomeData', async () => {
  const response = await axios.get('http://localhost:5000/home');
  return response.data;
});

// Async action สำหรับอัปเดตข้อมูลหน้า Home
export const updateHomeData = createAsyncThunk('home/updateHomeData', async (updatedHomeData) => {
  const response = await axios.put('http://localhost:5000/home', updatedHomeData);
  return response.data;
});

// สร้าง Slice สำหรับจัดการข้อมูลหน้า Home
const homeSlice = createSlice({
  name: 'home',
  initialState: {
    data: {}, // เก็บข้อมูลที่เกี่ยวข้องกับหน้า Home
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      // สำหรับการดึงข้อมูลหน้า Home
      .addCase(fetchHomeData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHomeData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchHomeData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      // สำหรับการอัปเดตข้อมูลหน้า Home
      .addCase(updateHomeData.fulfilled, (state, action) => {
        state.data = action.payload; // อัปเดตข้อมูลใหม่ใน state
      });
  },
});

export default homeSlice.reducer;
