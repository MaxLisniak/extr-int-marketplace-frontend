import './Explore.scss';

import FilterModal from '../FilterModal/FilterModal';
import DisplayOptionsBar from "../DisplayOptionsBar/DisplayOptionsBar";
import Items from "../Items/Items";
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
  const selectedCharacteristics = useAppSelector(state => state.filter.selectedCharacteristics);

  // const categories = useAppSelector(state => state.filter.categories);
  const { selectedCategoryName } = useParams();

  const categories = useAppSelector(state => state.filter.categories);

  useEffect(() => {
    if (categories &&
      selectedCategoryName &&
      categories.map((c) => {
        return c.name
      }).includes(selectedCategoryName))
      dispatch(setActiveCategoryName(selectedCategoryName))
  }, [selectedCategoryName, categories])

  useEffect(() => {
    configuredAxios.get("/products/brief", {
      params: {
        priceOrder,
        selectedCategoryName: selectedCategoryName,
        selectedSubcategoryName: selectedSubcategory?.name,
        minPrice,
        maxPrice,
        selectedCharacteristics
      },
    })
      .then((fetched) => {
        setProducts(fetched.data)
      }).catch((err) => {
        console.log(err)
      })
  }, [
    priceOrder,
    selectedSubcategory,
    selectedCategoryName,
    minPrice,
    maxPrice,
    selectedCharacteristics,
  ])
  return (
    <>
      <div className="container">
        <Breadcrumbs />
        <DisplayOptionsBar />
        <FilterModal />
        <Items products={products} />
      </div>
    </>
  )
}

export default Explore;