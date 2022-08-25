import './App.css';
import Explore from '../components/Explore/Explore';
import { useEffect } from 'react';
import { fetchCategories } from '../features/filter/filterSlice';
import { useAppDispatch, useAppSelector } from './hooks';
import { Routes, Route } from "react-router-dom";
import Home from '../components/Home/Home';
import Layout from '../components/Layout/Layout';
import Admin from '../components/Admin/Admin';
import ModerateProducts from '../components/Admin/ModerateProducts/ModerateProducts';
import ModerateCategories from '../components/Admin/ModerateCategories/ModerateCategories';
import ModerateSubcategories from '../components/Admin/ModerateSubcategories /ModerateSubcategories';
import ModerateCharacteristics from '../components/Admin/ModerateCharacteristics/ModerateCharacteristics';

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
          <Route path="admin" element={<Admin />}>
            <Route path='products' element={<ModerateProducts />} />
            <Route path="categories" element={<ModerateCategories />} />
            <Route path="subcategories" element={<ModerateSubcategories />} />
            <Route path="characteristics" element={<ModerateCharacteristics />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
