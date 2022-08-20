import './Item.scss'
import StarWhite from './assets/star-white.png';
import StarYellow from './assets/star-yellow.png';
import ThumbUp from './assets/thumb-up.png';
import ThumbDown from './assets/thumb-down.png';
import Eye from './assets/eye.png';

import Tag from './assets/tag.png';

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
  return <div className="product-card">
    <div className="star">
      <img src={StarWhite} alt="" />
    </div>
    <div className="card-content">
      <div className="poster">
        {props.product.image_url ?
          <img src={props.product.image_url} alt="" /> :

          <img src="https://cdn.icon-icons.com/icons2/510/PNG/512/at_icon-icons.com_50456.png" alt="" />
        }
      </div>
      <div className="text">
        <h2>{props.product.name}</h2>
        <ul>{props.product.characteristics.map(characteristic => {
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
    {/* <div className="card-content">
    </div> */}

  </div>
}