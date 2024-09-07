import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action สำหรับดึงข้อมูลผู้ใช้ทั้งหมด
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('http://localhost:5000/users');
  return response.data;
});

// Async action สำหรับดึงข้อมูลโปรไฟล์ผู้ใช้
export const fetchUserById = createAsyncThunk('users/fetchUserById', async (userId) => {
  const response = await axios.get(`http://localhost:5000/users/${userId}`);
  return response.data;
});

// Async action สำหรับการเพิ่มผู้ใช้ใหม่
export const createUser = createAsyncThunk('users/createUser', async (newUser) => {
  const response = await axios.post('http://localhost:5000/users', newUser);
  return response.data;
});

// Async action สำหรับการแก้ไขข้อมูลผู้ใช้
export const updateUser = createAsyncThunk('users/updateUser', async (updatedUser) => {
  const { id, name, email, phone, website } = updatedUser;
  const response = await axios.put(`http://localhost:5000/users/${id}`, { name, email, phone, website });
  return response.data;
});

// Async action สำหรับการลบผู้ใช้
export const deleteUser = createAsyncThunk('users/deleteUser', async (userId) => {
  await axios.delete(`http://localhost:5000/users/${userId}`);
  return userId;
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    userProfile: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userProfile = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // ฟังก์ชันสำหรับการเพิ่มผู้ใช้
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      // ฟังก์ชันสำหรับการแก้ไขข้อมูลผู้ใช้
      .addCase(updateUser.fulfilled, (state, action) => {
        const { id, name, email, phone, website } = action.payload;
        const existingUser = state.users.find(user => user.id === id);
        if (existingUser) {
          existingUser.name = name;
          existingUser.email = email;
          existingUser.phone = phone;
          existingUser.website = website;
        }
      })
      // ฟังก์ชันสำหรับการลบผู้ใช้
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
