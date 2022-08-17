import './Item.scss'

export interface ProductBrief {
  id: number,
  name: string,
  image_url: string,
  number_of_favorites: number,
  characteristics: [{
    id: number,
    value: string,
    characteristic_name: {
      name: string,
      id: number
    }
  }]

}
export const Item = (props: { product: ProductBrief }) => {
  return <div className="product-card">
    <img src="" alt="" />
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
    </div>
    <div className="icons"></div>

  </div>
}