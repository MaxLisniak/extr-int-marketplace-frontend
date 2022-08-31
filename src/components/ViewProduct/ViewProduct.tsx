import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchProduct } from "../../features/product/thunks";
import Tag from '../Explore/Items/ItemBrief/assets/tag.png';
import InfoIcons from "../InfoIcons/InfoIcons";
import ProductPoster from "../ProductPoster/ProductPoster";
import "./ViewProduct.scss";
import CommentItem from "./CommentItem/CommentItem";
import PricesChart from "./PricesChart/PricesChart";

const ViewProduct = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchProduct(Number(id)))
  }, [id])

  const product = useAppSelector(state => state.product.product);

  const [tab, setTab] = useState('Description');

  console.log(product);

  return (
    <div className="view-product">

      <div className="main-block">
        <div className="poster-block">
          <ProductPoster image_url={product.image_url} />
        </div>
        <div className="text-block">
          <InfoIcons style={"tiles"} />
          <h2>{product.name}</h2>
          <ul className="characteristics-list">{product.characteristics
            ?.slice(0, 2)
            ?.map(characteristic => {
              return (
                <li key={characteristic.id}>
                  <b>{characteristic.characteristic_name.name}: </b>
                  <span>{characteristic.value}</span>
                </li>
              )
            })}</ul>
          {product.latest_price ?
            <div className='price'><img src={Tag} alt="" />
              <span>${product.latest_price}</span>
            </div> : null
          }
        </div>
      </div>

      <div className="aux-block">
        <div className="tabs">
          <ul>
            <li
              className={tab === "Description" ? "active-tab" : undefined}
              onClick={() => setTab('Description')}
            >Description</li>
            <li
              className={tab === "Characteristics" ? "active-tab" : undefined}
              onClick={() => setTab("Characteristics")}
            >Characteristics</li>
            <li
              className={tab === "Comments" ? "active-tab" : undefined}
              onClick={() => setTab("Comments")}
            >Comments</li>
            <li
              className={tab === "Price dynamics" ? "active-tab" : undefined}
              onClick={() => setTab("Price dynamics")}
            >Price dynamics</li>
          </ul>
        </div>
        <div className="tab-content">
          {
            tab === "Description" ?
              (
                product.description ? <p>{product.description}</p> :
                  <p>The product does not have a description</p>
              )
              : tab === "Characteristics" ?
                (
                  <ul className="characteristics-list horizontal">
                    {
                      product.characteristics.length > 0 ?
                        product.characteristics
                          ?.map(characteristic => {
                            return (
                              <li key={characteristic.id}>
                                <b>{characteristic.characteristic_name.name}: </b>
                                <span>{characteristic.value}</span>
                              </li>
                            )
                          })
                        : <p>No characteristics specified</p>
                    }</ul>
                )
                : tab === "Comments" ?
                  (
                    <div className="comments-box">
                      {product.comments.length > 0 ?
                        product.comments.map(comment => {
                          return <CommentItem comment={comment} key={comment.id} />
                        }) : <p>No comments left yet</p>}
                    </div>
                  )
                  : tab === "Price dynamics" ?
                    (
                      product.prices.length > 0 ?
                        <PricesChart
                          prices={product.prices.slice()
                            .sort(
                              (a, b) =>
                                Number(new Date(a.date)) -
                                Number(new Date(b.date)),
                            )}
                        /> : <p>The product dosn't have a price</p>
                    )
                    : null
          }
        </div>
      </div>
    </div>
  )
}

export default ViewProduct;