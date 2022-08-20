import './App.css';
import Explore from '../components/Explore/Explore';
import { useEffect } from 'react';
import { fetchCategories } from '../features/filter/filterSlice';
import { useAppDispatch, useAppSelector } from './hooks';
import { Routes, Route, Link } from "react-router-dom";

function App() {

  const dispatch = useAppDispatch();
  const categories = useAppSelector(state => state.filter.categories);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories())
    }
  }, [])

  return (
    <Routes>
      {/* <Route path="/" element={<Explore />} /> */}
      <Route path="category/:selectedCategoryName" element={<Explore />} />
    </Routes>
    // <Explore />
  );
}

export default App;
