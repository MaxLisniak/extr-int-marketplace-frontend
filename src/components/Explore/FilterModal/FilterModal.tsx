import './FilterModal.scss'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { CharacteristicName } from '../../../features/types'
import React from 'react'
import Collapsible from '../../Collapsible/Collapsible'
import PriceFilter from './PriceFilter/PriceFilter'
import SubcategoriesFilter from './SubcategoriesFilter/SubcategoriesFilter'
import CharacteristicFilter from './CharactersticFilter/CharacteristicFilter'

const FilterModal = () => {

  const dispatch = useAppDispatch();

  // const [characteristicNames, setCharacteristicNames] = useState<any[]>([])
  const activeCategory = useAppSelector(state => state.filter.activeCategory)
  const activeSubcategory = useAppSelector(state => state.filter.activeSubcategory)
  const filterVisible = useAppSelector(state => state.filter.filterVisible);
  const characteristicNames = useAppSelector(state => state.filter.characteristicNames);
  // const [allCheckedCharacteristics, setAllCheckedCharacteristics] = useState({});

  // useEffect(() => {
  //   console.log(selectedSubcategory, selectedCategoryName)
  //   configuredAxios.get("/characteristic_names/parameterized/", {
  //     params: {
  //       selectedSubcategoryName: selectedSubcategory?.name,
  //       selectedCategoryName
  //     }
  //   })
  //     .then(res => {
  //       if (res.data != "no categories")
  //         setCharacteristicNames(res.data)
  //     })
  // }, [selectedSubcategory, selectedCategoryName])

  // useEffect(() => {
  //   setAllCheckedCharacteristics(
  //     characteristicNames
  //       .map(c => c.id)
  //       .reduce((a, v) => ({ ...a, [v]: [] }), {})
  //   )
  // }, [characteristicNames])

  // useEffect(() => {
  //   dispatch(selectCharacteristics(allCheckedCharacteristics))
  // }, [allCheckedCharacteristics])

  // if (!selectedCategoryName) return null

  return (
    <div className="filter-modal" style={filterVisible ? { display: "block" } : { display: "none" }}>
      {activeCategory ?
        <>
          <Collapsible openByDefault={false} label="Categories">
            <SubcategoriesFilter />
          </Collapsible>
        </> : null
      }
      <Collapsible openByDefault={true} label="Price">
        <PriceFilter />
      </Collapsible>
      {
        characteristicNames.map((characteristicName: CharacteristicName) => {
          if (characteristicName.characteristics.length > 0) {
            return (
              <React.Fragment key={characteristicName.id}>
                <Collapsible openByDefault={true} label={characteristicName.name} >
                  <CharacteristicFilter
                    characteristicNameNameValue={characteristicName.name}
                  />
                </Collapsible>
              </React.Fragment>
            )
          }
          else return null
        })
      }
    </div>
  )
}

export default FilterModal