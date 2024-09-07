import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action สำหรับดึงข้อมูลหมวดหมู่ทั้งหมด
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await axios.get('http://localhost:5000/categories');
  return response.data;
});

// Async action สำหรับเพิ่มหมวดหมู่
export const createCategory = createAsyncThunk('categories/createCategory', async (newCategory) => {
  const response = await axios.post('http://localhost:5000/categories', newCategory);
  return response.data;
});

// Async action สำหรับแก้ไขหมวดหมู่
export const updateCategory = createAsyncThunk('categories/updateCategory', async (updatedCategory) => {
  const { id, name } = updatedCategory;
  const response = await axios.put(`http://localhost:5000/categories/${id}`, { name });
  return response.data;
});

// Async action สำหรับลบหมวดหมู่
export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (categoryId) => {
  await axios.delete(`http://localhost:5000/categories/${categoryId}`);
  return categoryId;
});

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload); // เพิ่ม category ใหม่ลงใน state
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const { id, name } = action.payload;
        const existingCategory = state.categories.find(category => category.id === id);
        if (existingCategory) {
          existingCategory.name = name; // อัปเดตข้อมูลหมวดหมู่ใน state
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(category => category.id !== action.payload); // ลบ category ออกจาก state
      });
  },
});

export default categorySlice.reducer;
