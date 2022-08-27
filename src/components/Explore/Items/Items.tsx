import './Items.scss';

import { Item, ProductBrief } from "./Item/Item";
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useEffect, useState } from 'react';
import configuredAxios from '../../../axios/axios';
import DisplayOptionsBar from '../DisplayOptionsBar/DisplayOptionsBar';
import FilterModal from '../FilterModal/FilterModal';
import NotFound from '../../NotFound/NotFound';
import { fetchCharacteristicsForSubcategory } from '../../../features/filter/thunks';

const Items = () => {

  const dispatch = useAppDispatch();

  const activeCategory = useAppSelector(state => state.filter.activeCategory);
  const activeSubcategory = useAppSelector(state => state.filter.activeSubcategory);
  const displayAs = useAppSelector(state => state.filter.displayAs);
  const priceOrder = useAppSelector(state => state.filter.priceOrder);
  const minPrice = useAppSelector(state => state.filter.minPrice);
  const maxPrice = useAppSelector(state => state.filter.maxPrice);

  const [products, setProducts] = useState<ProductBrief[]>([]);
  const characteristicNames = useAppSelector(state => state.filter.characteristicNames)

  useEffect(() => {
    if (activeCategory && activeSubcategory) {
      configuredAxios
        .get("/products/explore", {
          params: {
            selectedCategoryName: activeCategory?.name,
            selectedSubcategoryName: activeSubcategory?.name
          },
        })
        .then((fetched) => {
          setProducts(fetched.data)
        })
        .catch((err) => {
          console.error(err)
        })
      dispatch(fetchCharacteristicsForSubcategory(activeSubcategory.id));
    }
  }, [
    activeCategory,
    activeSubcategory,
  ])

  if (!activeSubcategory) return <NotFound />

  const productsFiltered = (
    products
      .sort(
        priceOrder === "desc" ?
          (a: ProductBrief, b: ProductBrief) => a.latest_price - b.latest_price :
          (a: ProductBrief, b: ProductBrief) => b.latest_price - a.latest_price
      )
      .filter(
        product => {
          if (!product.latest_price) return true
          else if (product.latest_price >= minPrice &&
            product.latest_price <= maxPrice) return true
          else return false
        }
      )
      .filter(product => {
        return !product.characteristics.map(characteristic => {
          const foundCharacteristicName = characteristicNames
            .find(characteristicName =>
              characteristicName.name === characteristic.characteristic_name.name
            )
          const selectedCharacteristics = foundCharacteristicName?.characteristics
            .filter(characteristicName => {
              return characteristicName.selected
            })
          if (selectedCharacteristics?.length === 0)
            return true
          else if (selectedCharacteristics
            ?.map(selectedCharacteristic => {
              return selectedCharacteristic.value
            })
            ?.includes(characteristic.value))
            return true
          else return false

        }).includes(false)
      })
      .map(product => {
        return <Item product={product} key={product.id} />
      })
  )

  return (
    <>
      <DisplayOptionsBar />
      <FilterModal />
      <div className={`items-list ${displayAs}`}>
        {
          productsFiltered.length > 0 ? productsFiltered :
            <h1>Nothing Found</h1>
        }
      </div>
    </>
  )
}

export default Items