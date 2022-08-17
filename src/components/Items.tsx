import { useEffect, useState } from "react"
import axios from 'axios'
import { Item, ProductBrief } from "./Item/Item";

const Items = () => {
  const [products, setProducts] = useState<ProductBrief[]>([]);
  useEffect(() => {
    axios.get("http://localhost:3000/products/brief")
      .then((fetched) => setProducts(fetched.data))
  }, [])
  return (
    <div>
      {products.map(product => {
        return <Item product={product} key={product.id} />
      })}
    </div>
  )
}

export default Items