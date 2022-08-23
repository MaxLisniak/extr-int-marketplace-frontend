import { useAppSelector } from "../../app/hooks";
import "./Home.scss";
import { Link } from "react-router-dom";

const Home = () => {
  const categories = useAppSelector(state => state.filter.categories)
  const categoriesToRender = categories.map(category => {
    return (
      <Link
        key={category.id}
        style={{ textDecoration: "none" }}
        to={`/categories/${category.name}`}
      >
        <div className="category-block" >
          {category.name}
        </div>
      </Link>
    )
  })

  return <div className="category-blocks">
    {categoriesToRender}
  </div>
}

export default Home;