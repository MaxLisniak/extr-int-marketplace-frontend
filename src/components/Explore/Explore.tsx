import './Explore.scss';

import FilterModal from '../FilterModal/FilterModal';
import DisplayOptionsBar from "../DisplayOptionsBar/DisplayOptionsBar";
import Items from "../Items";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { useEffect, useState } from 'react';
import { ProductBrief } from '../Item/Item';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import configuredAxios from '../../axios/axios';
import { useParams } from 'react-router-dom';
import { Category, setActiveCategoryName } from '../../features/filter/filterSlice';

const Explore = () => {
  const dispatch = useAppDispatch();

  const [products, setProducts] = useState<ProductBrief[]>([]);
  const priceOrder = useAppSelector(state => state.filter.priceOrder);
  const selectedSubcategory = useAppSelector(state => state.filter.selectedSubcategory)
  const minPrice = useAppSelector(state => state.filter.minPrice);
  const maxPrice = useAppSelector(state => state.filter.maxPrice);

  // const categories = useAppSelector(state => state.filter.categories);
  const { selectedCategoryName } = useParams();


  useEffect(() => {
    if (selectedCategoryName)
      dispatch(setActiveCategoryName(selectedCategoryName))
  }, [selectedCategoryName])

  useEffect(() => {
    configuredAxios.get("/products/brief", {
      params: {
        priceOrder,
        selectedCategoryName: selectedCategoryName,
        selectedSubcategoryName: selectedSubcategory?.name,
        minPrice,
        maxPrice,
      }
    })
      .then((fetched) => {
        setProducts(fetched.data)
      })
  }, [
    priceOrder,
    selectedSubcategory,
    selectedCategoryName,
    minPrice,
    maxPrice
  ])
  return (
    <div className="container">
      <Breadcrumbs />
      <DisplayOptionsBar />
      <FilterModal />
      <Items products={products} />

    </div>
  )
}

export default Explore;