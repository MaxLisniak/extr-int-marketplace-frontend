import './App.css';
import { useEffect } from 'react';
import { fetchCategories } from '../features/filter/thunks';
import { useAppDispatch, useAppSelector } from './hooks';
import { Routes, Route, Navigate } from "react-router-dom";
import Explore from '../components/Explore/Explore';
import Layout from '../components/Layout/Layout';
import Admin from '../components/Admin/Admin';
import ModerateProducts from '../components/Admin/ModerateProducts/ModerateProducts';
import ModerateCategories from '../components/Admin/ModerateCategories/ModerateCategories';
import ModerateSubcategories from '../components/Admin/ModerateSubcategories /ModerateSubcategories';
import Category from '../components/Explore/Category/Category';
import Home from '../components/Explore/Home/Home';
import Items from '../components/Explore/Items/Items';
import NotFound from '../components/NotFound/NotFound';

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
          <Route path="*" element={<NotFound />} />
          {/* <Route index element={<Home />} /> */}
          <Route path="/" element={<Navigate to={'explore/categories'} />} />
          <Route path="explore/" element={<Explore />} >
            <Route path="" element={<Navigate to={'categories'} />} />
            <Route path="categories" element={<Home />} />
            <Route path=":categoryName" element={<Category />} />
            <Route path=":categoryName/:subcategoryName" element={<Items />} />
          </Route>
          <Route path="admin" element={<Admin />}>
            <Route path="/admin" element={<Navigate to={'/admin/categories'} />} />
            <Route path='products' element={<ModerateProducts />} />
            <Route path="categories" element={<ModerateCategories />} />
            <Route path="subcategories" element={<ModerateSubcategories />} />
          </Route>
        </Route>

      </Routes>
    </>
  );
}

export default App;
