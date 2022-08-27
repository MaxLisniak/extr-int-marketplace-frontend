import "./SubcategoriesFilter.scss";

import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { setActiveSubcategory } from "../../../../features/filter/filterSlice";
import { Link } from "react-router-dom";

const SubcategoriesFilter = () => {

  const dispatch = useAppDispatch();

  const activeCategory = useAppSelector(state => state.filter.activeCategory)
  const activeSubcategory = useAppSelector(state => state.filter.activeSubcategory);
  const subcategories = useAppSelector(
    state => state.filter.categories.find(
      category => category.name === activeCategory?.name
    )?.subcategories
  )

  // const selectedSubcategory = useAppSelector(state => state.filter.selectedSubcategory)

  return (
    <form className="subcategories-filter">
      <div className="buttons">
        {subcategories?.map(sub => {
          return (
            // <div className="button-container" key={sub.id}>
            <Link
              className="button-container"
              key={sub.id}
              style={{ textDecoration: "none", color: "black" }}
              to={`/explore/${activeCategory?.name}/${sub.name}`}>
              <input
                name="subcategory"
                type={"radio"}
                key={sub.id}
                value={sub.id}
                id={`radio-${sub.id}`}
                checked={sub.id === activeSubcategory?.id}
                readOnly={true}
              // onChange={
              //   () => dispatch(setActiveSubcategory(sub))
              // }
              />
              <label htmlFor={`radio-${sub.id}`}>{sub.name}</label>

            </Link>
            // </div>
          )
        }
        )}
      </div>
    </form>
  )
}

export default SubcategoriesFilter;