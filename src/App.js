import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PostList from './pages/PostList';
import PostDetail from './components/posts/PostDetail';
import CreatePost from './components/posts/CreatePost';
import EditPost from './components/posts/EditPost';
import UserList from './pages/UserList';
import UserProfile from './components/user/UserProfile';
import CategoryList from './pages/CategoryList';
import CategoryDetail from './components/category/CategoryDetail';
import TagList from './components/tag/TagList';
import NotFound from './components/NotFound';
import CreateUser from './components/user/CreateUser';
import EditUser from './components/user/EditUser';
import CreateCategory from './components/category/CreateCategory';
import EditCategory from './components/category/EditCategory';
import DeleteCategory from './components/category/DeleteCategory';
import Home from './pages/HomeList';  // นำเข้า Home
import './App.css'; // เพิ่มการ import ไฟล์ CSS

const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/edit-post/:id" element={<EditPost />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<UserProfile />} />
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/categories/:id" element={<CategoryDetail />} />
            <Route path="/tags" element={<TagList />} />
            <Route path="/create-user" element={<CreateUser />} /> 
            <Route path="/edit-user/:id" element={<EditUser />} />
            <Route path="/create-category" element={<CreateCategory />} />
            <Route path="/edit-category/:id" element={<EditCategory />} />
            <Route path="/delete-category/:id" element={<DeleteCategory />} />
            <Route path="*" element={<NotFound />} /> {/* สำหรับเส้นทางที่ไม่พบ */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
