import './FilterModal.scss'
import Collapsible from "../Collapsible/Collapsible"
import PriceFilter from '../PriceFilter/PriceFilter'
import SubcategoriesFilter from '../SubcategoriesFilter/SubcategoriesFilter'

const FilterModal = () => {

  return (
    <div className="filter-modal">
      <Collapsible label="Categories"><SubcategoriesFilter /></Collapsible>
      <hr />
      <Collapsible label="Price"><PriceFilter /></Collapsible>
      <hr />
      {/* <Collapsible />
      <hr /> */}
    </div>
  )
}

export default FilterModal