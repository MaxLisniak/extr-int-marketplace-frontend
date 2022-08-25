import './Explore.scss';

import FilterModal from './FilterModal/FilterModal';
import DisplayOptionsBar from "./DisplayOptionsBar/DisplayOptionsBar";
import Items from "./Items/Items";
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs";
import { useEffect, useState } from 'react';
import { ProductBrief } from './Items/Item/Item';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import configuredAxios from '../../axios/axios';
import { useParams } from 'react-router-dom';
import { setActiveCategoryName } from '../../features/filter/filterSlice';

const Explore = () => {
  const dispatch = useAppDispatch();

  const [products, setProducts] = useState<ProductBrief[]>([]);
  const priceOrder = useAppSelector(state => state.filter.priceOrder);
  const selectedSubcategory = useAppSelector(state => state.filter.selectedSubcategory)
  const minPrice = useAppSelector(state => state.filter.minPrice);
  const maxPrice = useAppSelector(state => state.filter.maxPrice);
  const selectedCharacteristics = useAppSelector(state => state.filter.selectedCharacteristics);

  const { categoryName } = useParams();
  const selectedCategoryName = useAppSelector(state => state.filter.selectedCategoryName);

  const categories = useAppSelector(state => state.filter.categories);

  useEffect(() => {
    if (categories &&
      categoryName &&
      categories.map((c) => {
        return c.name
      }).includes(categoryName))
      dispatch(setActiveCategoryName(categoryName))
  }, [categoryName, categories])

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
        {selectedCategoryName ? <Breadcrumbs /> : null}
        {selectedCategoryName ? <DisplayOptionsBar /> : null}
        <FilterModal />
        <Items products={products} />
      </div>
    </>
  )
}

export default Explore;