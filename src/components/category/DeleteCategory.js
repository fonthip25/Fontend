import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteCategory } from '../../features/categories/categorySlice';
import axios from 'axios';

const DeleteCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleDelete = async () => {
      try {
        await axios.delete(`http://localhost:5000/categories/${id}`);
        dispatch(deleteCategory(id));
        navigate('/categories');
      } catch (err) {
        console.error('Error deleting category:', err);
      }
    };

    handleDelete();
  }, [dispatch, id, navigate]);

  return (
    <div>
      <h1>Deleting Category...</h1>
    </div>
  );
};

export default DeleteCategory;
