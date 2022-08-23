import './App.css';
import Explore from '../components/Explore/Explore';
import { useEffect } from 'react';
import { fetchCategories } from '../features/filter/filterSlice';
import { useAppDispatch, useAppSelector } from './hooks';
import { Routes, Route, Link } from "react-router-dom";
import Home from '../components/Home/Home';
import Sidebar from '../components/Layout/Sidebar/Sidebar';
import Layout from '../components/Layout/Layout';

function App() {

  const dispatch = useAppDispatch();
  const categories = useAppSelector(state => state.filter.categories);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories())
    }
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="categories/:categoryName" element={<Explore />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
