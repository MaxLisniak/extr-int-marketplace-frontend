import "./SubcategoriesFilter.scss";

import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { setActiveSubcategory } from "../../../../features/filter/filterSlice";

const SubcategoriesFilter = () => {

  const selectedCategoryName = useAppSelector(state => state.filter.selectedCategoryName)
  const subcategories = useAppSelector(
    state => state.filter.categories.filter(
      category => category.name === selectedCategoryName
    )[0].subcategories
  )

  const selectedSubcategory = useAppSelector(state => state.filter.selectedSubcategory)
  const dispatch = useAppDispatch();

  return (
    <form className="subcategories-filter">
      <div className="buttons">
        {subcategories.map(sub => {
          return (
            <div className="button-container" key={sub.id}>
              <input
                name="subcategory"
                type={"radio"}
                key={sub.id}
                value={sub.id}
                id={`radio-${sub.id}`}
                checked={sub.id === selectedSubcategory?.id}
                onChange={
                  () => dispatch(setActiveSubcategory(sub))
                }
              />
              <label htmlFor={`radio-${sub.id}`}>{sub.name}</label>
            </div>
          )
        }
        )}
      </div>
    </form>
  )
}

export default SubcategoriesFilter;