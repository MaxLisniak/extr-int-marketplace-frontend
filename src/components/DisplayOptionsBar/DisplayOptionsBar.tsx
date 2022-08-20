import './DisplayOptionsBar.scss';
import Price from './assets/price.png';
import Arrow from './assets/arrow.png';
import Filter from './assets/filter.png';
import Cards from './assets/cards.png';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setPriceOrder } from '../../features/filter/filterSlice';

const DisplayOptionsBar = () => {

  const dispatch = useAppDispatch();
  const order = useAppSelector(state => state.filter.priceOrder);

  const toggleOrder = () => {
    if (order === 'asc')
      dispatch(setPriceOrder('desc'))
    if (order === 'desc')
      dispatch(setPriceOrder('asc'))
  }

  return (
    <div className="display-options-bar">
      <div className="item display-as">
        <img src={Cards} alt="" />
      </div>
      <div onClick={toggleOrder} className="item price">
        <img className='price-icon' src={Price} alt="" />
        <span>Price</span>
        <img className='arrow-icon' src={Arrow} alt="" />
      </div>
      <div className="item filter-btn">
        <img src={Filter} alt="" />
      </div>
      {/* <div className="item category">Category: Phones</div> */}
    </div>
  )
}

export default DisplayOptionsBar