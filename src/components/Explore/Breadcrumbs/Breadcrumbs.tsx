import './Breadcrumbs.scss';
import Arrow from './assets/arrow.png';
import { useAppSelector } from '../../../app/hooks';



const Breadcrumbs = () => {

  const selectedCategoryName = useAppSelector(state => state.filter.selectedCategoryName);
  const selectedSubcategoryName = useAppSelector(state => state.filter.selectedSubcategory?.name);

  return (
    <div className="breadcrumbs">
      <span className="category">{selectedCategoryName}</span>
      <img src={Arrow} alt="" />
      <span className="subcategory">{selectedSubcategoryName || 'All products'}</span>
    </div>
  )
}

export default Breadcrumbs