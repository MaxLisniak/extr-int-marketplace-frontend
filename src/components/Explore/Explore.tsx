import './Explore.scss';

import { useEffect, } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Outlet, useParams } from 'react-router-dom';
import { setActiveCategory, setActiveSubcategory } from '../../features/filter/filterSlice';
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs";

const Explore = () => {
  const dispatch = useAppDispatch();

  const categories = useAppSelector(state => state.filter.categories)
  const { categoryName, subcategoryName } = useParams();

  useEffect(() => {
    const category = categories
      .find(category => {
        return category.name === categoryName
      })
    if (category) {
      dispatch(setActiveCategory(category));
    }

    const subcategory = category?.subcategories
      .find(subcategory => {
        return subcategory.name === subcategoryName
      })
    if (subcategory) {
      dispatch(setActiveSubcategory(subcategory));
    }

  }, [categoryName, subcategoryName, categories])



  return (
    <div className='container'>
      <Breadcrumbs />
      <Outlet />

    </div>
  )
}

export default Explore;