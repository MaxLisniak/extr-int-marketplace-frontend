import './Breadcrumbs.scss';
import { useAppSelector } from '../../../app/hooks';
import { Link } from 'react-router-dom';
import Arrow from './assets/arrow.png';



const Breadcrumbs = () => {

  const activeCategory = useAppSelector(state => state.filter.activeCategory);
  const activeSubcategory = useAppSelector(state => state.filter.activeSubcategory);

  return (
    <div className="breadcrumbs">
      {
        activeCategory ?
          <Link to={`/explore/${activeCategory.name}`} style={{ textDecoration: "none", color: "black" }}>
            <span className="category">{activeCategory.name}</span>
          </Link>
          :
          null
      }
      {
        activeSubcategory ?
          <>
            <img src={Arrow} alt="" />
            <span className="category">{activeSubcategory.name}</span>
          </>
          : null
      }
    </div>
  )
}

export default Breadcrumbs