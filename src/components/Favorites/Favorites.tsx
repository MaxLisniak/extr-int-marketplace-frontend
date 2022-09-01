import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Product } from "../../features/types";
import { fetchFavorites } from "../../features/user/thunks";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import DisplayOptionsBar from "../Explore/DisplayOptionsBar/DisplayOptionsBar";
import { ItemBrief } from "../Explore/Items/ItemBrief/ItemBrief";
import "../Explore/Items/Items.scss";

const Favorites = () => {
  const userId = useAppSelector(state => state.user.userId);
  const dispatch = useAppDispatch();
  const axiosAuth = useAxiosPrivate();
  const products = useAppSelector(state => state.user.favProducts);
  const displayAs = useAppSelector(state => state.filter.displayAs);

  useEffect(() => {
    // axiosAuth.get('favorites/for-user', {
    //   params: {
    //     user_id: userId
    //   }
    // }).then(productsFetched => {
    //   setProducts(productsFetched.data)
    // })
    dispatch(fetchFavorites({ user_id: Number(userId), axios: axiosAuth }));

  }, [userId])

  if (products.length === 0) return (
    <div className="container">
      <p style={{ textAlign: "center" }}>No products are your favorite</p>
    </div>
  )

  return (
    <div className="container">
      <DisplayOptionsBar includeFilter={false} includePriceToggle={false} />
      <div className={`items-list ${displayAs}`}>
        {products.map((product: Product) => {
          return <ItemBrief product={product} key={product.id} />
        })}

      </div>
    </div>

  )
}

export default Favorites;