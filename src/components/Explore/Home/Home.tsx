import "./Home.scss";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { setActiveCategory, setActiveSubcategory } from "../../../features/filter/filterSlice";

const Home = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(state => state.filter.categories)

  useEffect(() => {
    dispatch(setActiveCategory(undefined));
    dispatch(setActiveSubcategory(undefined));
  }, [])

  return (
    <div className="category-blocks">
      {categories.map(category => {
        return (
          <Link
            key={category.id}
            style={{ textDecoration: "none" }}
            to={`/explore/${category.name}`}
          >
            <div className="category-block" >
              {category.name}
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default Home;