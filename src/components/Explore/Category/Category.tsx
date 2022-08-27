import "../Home/Home.scss";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setActiveSubcategory } from "../../../features/filter/filterSlice";
import { useEffect } from "react";
import NotFound from "../../NotFound/NotFound";

const Category = () => {
  const dispatch = useAppDispatch();
  const activeCategory = useAppSelector(state => state.filter.activeCategory);

  useEffect(() => {
    dispatch(setActiveSubcategory(undefined));
  }, [])

  if (!activeCategory) return <NotFound />;

  return (
    <div className="category-blocks">
      {activeCategory.subcategories.map(subcategory => {
        return (
          <Link
            key={subcategory.id}
            style={{ textDecoration: "none" }}
            to={`${subcategory.name}`}
          >
            <div className="category-block" >
              {subcategory.name}
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default Category;