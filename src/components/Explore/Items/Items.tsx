import './Items.scss';

import { Item, ProductBrief } from "./Item/Item";
import { useAppSelector } from '../../../app/hooks';

const Items = (props: { products: ProductBrief[] }) => {
  const displayAs = useAppSelector(state => state.filter.displayAs);
  return (
    <div className={`items-list ${displayAs}`}>
      {
        props.products.length > 0 ?
          props.products.map(product => {
            return <Item product={product} key={product.id} />
          }) :
          <h1>Nothing Found</h1>

      }
    </div>
  )
}

export default Items