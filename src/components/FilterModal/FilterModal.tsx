import './FilterModal.scss'
import Collapsible from "../Collapsible/Collapsible"
import PriceFilter from '../PriceFilter/PriceFilter'
import SubcategoriesFilter from '../SubcategoriesFilter/SubcategoriesFilter'
import { useEffect, useState } from 'react'
import configuredAxios from '../../axios/axios'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import React from 'react'
import CharacteristicFilter from '../CharactersticFilter/CharacteristicFilter'
import { selectCharacteristics } from '../../features/filter/filterSlice'

const FilterModal = () => {

  const dispatch = useAppDispatch();
  const [characteristicNames, setCharacteristicNames] = useState<any[]>([])
  const selectedSubcategory = useAppSelector(state => state.filter.selectedSubcategory)
  const selectedCategoryName = useAppSelector(state => state.filter.selectedCategoryName)
  const [allCheckedCharacteristics, setAllCheckedCharacteristics] = useState({});
  const filterVisible = useAppSelector(state => state.filter.filterVisible);

  useEffect(() => {
    // if (characteristicNames.length === 0) {
    console.log(selectedSubcategory, selectedCategoryName)
    configuredAxios.get("/characteristic_names", {
      params: {
        selectedSubcategoryName: selectedSubcategory?.name,
        selectedCategoryName
      }
    })
      .then(res => {
        if (res.data != "no categories")
          setCharacteristicNames(res.data)
      })
    // }
  }, [selectedSubcategory, selectedCategoryName])

  useEffect(() => {
    setAllCheckedCharacteristics(
      characteristicNames
        .map(c => c.id)
        .reduce((a, v) => ({ ...a, [v]: [] }), {})
    )
  }, [characteristicNames])

  useEffect(() => {
    dispatch(selectCharacteristics(allCheckedCharacteristics))
  }, [allCheckedCharacteristics])

  if (!selectedCategoryName) return null

  return (
    <div className="filter-modal" style={filterVisible ? { display: "block" } : { display: "none" }}>
      {selectedCategoryName ?
        <>
          <Collapsible label="Categories">
            <SubcategoriesFilter />
          </Collapsible>
          {/* <hr /> */}
        </> : null
      }
      <Collapsible label="Price">
        <PriceFilter />
      </Collapsible>
      {/* <hr /> */}
      {
        characteristicNames.map((characteristicName:
          {
            id: number,
            name: string,
            characteristics: {
              id: number,
              value: string,
              characteristic_name_id: number
            }[]
          }
        ) => {
          return (
            <React.Fragment key={characteristicName.id}>
              <Collapsible label={characteristicName.name} >
                <CharacteristicFilter
                  characteristics={characteristicName.characteristics}
                // allCheckedCharacteristics={allCheckedCharacteristics}
                // setAllCheckedCharacteristics={setAllCheckedCharacteristics}
                />
              </Collapsible>
              {/* <hr /> */}
            </React.Fragment>

          )
        })
      }
    </div>
  )
}

export default FilterModal