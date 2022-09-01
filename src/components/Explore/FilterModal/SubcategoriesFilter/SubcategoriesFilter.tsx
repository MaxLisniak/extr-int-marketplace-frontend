import "./SubcategoriesFilter.scss";

import { useAppSelector } from "../../../../app/hooks";
import { Link } from "react-router-dom";

const SubcategoriesFilter = () => {


  const activeCategory = useAppSelector(state => state.filter.activeCategory)
  const activeSubcategory = useAppSelector(state => state.filter.activeSubcategory);
  const subcategories = useAppSelector(
    state => state.filter.categories.find(
      category => category.name === activeCategory?.name
    )?.subcategories
  )

  return (
    <form className="subcategories-filter">
      <div className="buttons">
        {subcategories?.map(sub => {
          return (
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
              />
              <label htmlFor={`radio-${sub.id}`}>{sub.name}</label>

            </Link>
          )
        }
        )}
      </div>
    </form>
  )
}

export default SubcategoriesFilter;