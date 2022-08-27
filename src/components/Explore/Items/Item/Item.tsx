import './Item.scss'
import StarWhite from './assets/star-white.png';
import StarYellow from './assets/star-yellow.png';
import ThumbUp from './assets/thumb-up.png';
import ThumbDown from './assets/thumb-down.png';
import Eye from './assets/eye.png';
import NoImage from './assets/no-image.png';

import Tag from './assets/tag.png';
import { useAppSelector } from '../../../../app/hooks';

export interface ProductBrief {
  id: number,
  name: string,
  image_url: string,
  number_of_favorites: number,
  characteristics:
  {
    id: number,
    value: string,
    characteristic_name: {
      name: string,
      id: number
    },
  }[],
  latest_price: number,

}
export const Item = (props: { product: ProductBrief }) => {

  const characteristicNames = useAppSelector(state => state.filter.characteristicNames);
  const displayAs = useAppSelector(state => state.filter.displayAs);
  // const selectedCharacteristics = useAppSelector(state => state.filter.selectedCharacteristics)
  return <div className={`product-card ${displayAs}`}>
    <div className="star">
      <img src={StarWhite} alt="" />
    </div>
    <div className="card-content">
      <div className="poster">
        {props.product.image_url ?
          <img src={props.product.image_url} alt="" /> :

          <img src={NoImage} alt="" />
        }
      </div>
      <div className="text">
        <h2>{props.product.name}</h2>
        <ul>{props.product.characteristics
          .filter(characteristic => {
            const foundCharacteristic = characteristicNames.find(characteristicName =>
              characteristicName.name === characteristic.characteristic_name.name
            )
            return foundCharacteristic?.characteristics
              .filter(characteristic => characteristic.selected)
              .map(characteristic => characteristic.value)
              .includes(characteristic.value)
          })
          .map(characteristic => {
            return (
              <li key={characteristic.id}>
                <b>{characteristic.characteristic_name.name}: </b>
                <span>{characteristic.value}</span>
              </li>
            )
          })}</ul>
        {props.product.latest_price ?
          <div className='price'><img src={Tag} alt="" /><span>${props.product.latest_price}</span></div> :
          null
        }
      </div>
      <ul className="icons">
        <li><img src={Eye} alt="" /><span>100</span></li>
        <li><img src={StarYellow} alt="" /><span>100</span></li>
        <li><img src={ThumbUp} alt="" /><span>100</span></li>
        <li><img src={ThumbDown} alt="" /><span>100</span></li>
      </ul>
    </div>

  </div>
}