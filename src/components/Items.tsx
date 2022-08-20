import { useEffect, useState } from "react"
import axios from 'axios'
import { Item, ProductBrief } from "./Item/Item";
import { useAppSelector } from "../app/hooks";

const Items = (props: { products: ProductBrief[] }) => {

  return (
    <div>
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