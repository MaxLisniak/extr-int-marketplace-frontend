import { Category } from "../../../../features/types";
import "./SubcategoriesBlock.scss";
import ArrowIcon from "./assets/arrow.png";
import { Link } from "react-router-dom";

const SubcategoriesBlock = (props: { category: Category }) => {


  return (
    <div className="subcategories-block">
      <ul>
        <Link to={`/explore/${props.category.name}`} style={{ textDecoration: "none" }}>
          <li style={{ display: "flex", alignItems: "center" }}>
            <b>{props.category.name}</b>
            <img src={ArrowIcon} alt="" style={{ width: "17px" }} />
          </li>
        </ Link>
        {props.category.subcategories.map(subcategory => {
          return (
            <Link
              key={subcategory.id}
              to={`/explore/${props.category.name}/${subcategory.name}`}
              style={{ textDecoration: "none" }}>
              <li>{subcategory.name}</li>
            </Link>
          )
        })}

      </ul>
    </div>

  )
}

export default SubcategoriesBlock;