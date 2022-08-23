import './DisplayOptionsBar.scss';
import Price from './assets/price.png';
import Arrow from './assets/arrow.png';
import Filter from './assets/filter.png';
import Tiles from './assets/tiles.png';
import Rows from './assets/rows.png';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setPriceOrder } from '../../features/filter/filterSlice';
import { toggleFilterVisibility } from '../../features/filter/filterSlice';
import { toggleView } from '../../features/filter/filterSlice';

const DisplayOptionsBar = () => {

  const dispatch = useAppDispatch();
  const order = useAppSelector(state => state.filter.priceOrder);
  const displayAs = useAppSelector(state => state.filter.displayAs);

  const toggleOrder = () => {
    if (order === 'asc')
      dispatch(setPriceOrder('desc'))
    if (order === 'desc')
      dispatch(setPriceOrder('asc'))
  }


  return (
    <div className="display-options-bar">
      <div className="item display-as"
        onClick={() => dispatch(toggleView())}>
        <img src={displayAs === "tiles" ? Rows : Tiles} alt="" />
      </div>
      <div onClick={toggleOrder} className="item price">
        <img className='price-icon' src={Price} alt="" />
        <span>Price</span>
        <img className='arrow-icon' src={Arrow} alt=""
          style={order === "asc" ? {} : { transform: "rotate(180deg)" }} />
      </div>
      <div className="item filter-btn"
        onClick={() => dispatch(toggleFilterVisibility())}>
        <img src={Filter} alt="" />
        <span>Filter</span>
      </div>
      {/* <div className="item category">Category: Phones</div> */}
    </div>
  )
}

export default DisplayOptionsBar