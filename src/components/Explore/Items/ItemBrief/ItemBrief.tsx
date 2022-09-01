import './ItemBrief.scss'
import StarWhite from './assets/star-white.png';
import { Link } from "react-router-dom";
import InfoIcons from '../../../InfoIcons/InfoIcons';

import Tag from './assets/tag.png';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { Category, Product } from '../../../../features/types';
import ProductPoster from '../../../ProductPoster/ProductPoster';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import { fetchFavorites } from '../../../../features/user/thunks';

export const ItemBrief = (props: {
  product: Product,
}) => {

  const dispatch = useAppDispatch();
  const categories = useAppSelector(state => state.filter.categories);
  const axiosAuth = useAxiosPrivate()
  const userId = useAppSelector(state => state.user.userId);
  const characteristicNames = useAppSelector(state => state.filter.characteristicNames);
  const displayAs = useAppSelector(state => state.filter.displayAs);
  const category = categories.filter((category: Category) => {
    return category.subcategories.map(subcategory => subcategory.id)
      .includes(props.product.subcategory_id);
  })[0];
  const subcategory = category?.subcategories.filter(subcategory => {
    return subcategory.category_id === category.id;
  })[0];

  return <div className={`product-card ${displayAs}`}>
    <div
      className="star"
      onClick={async () => {
        if (userId) {
          const response = await axiosAuth.post('/favorites/toggle', {
            product_id: props.product.id,
            user_id: userId,
          })
          dispatch(fetchFavorites({ user_id: userId, axios: axiosAuth }))
        }
      }}
    >
      <img src={StarWhite} alt="" />
    </div>
    <Link
      style={{ textDecoration: "none", color: "black" }}
      to={`/explore/${category?.name}/${subcategory?.name}/${props.product.id}`}
    >
      <div className="card-content">
        <div className="poster">
          <ProductPoster image_url={props.product.image_url} />
        </div>
        <div className="text">
          <h2>{props.product.name}</h2>
          <ul>{props.product.characteristics
            ?.filter(characteristic => {
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
        {/* <div className={`icons`}> */}
        <InfoIcons style={displayAs} />
        {/* </div> */}
      </div>
    </Link>

  </div>
}