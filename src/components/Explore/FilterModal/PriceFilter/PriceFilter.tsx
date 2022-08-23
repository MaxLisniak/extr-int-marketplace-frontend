import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import "./PriceFilter.scss"
import { setMinPrice } from "../../../../features/filter/filterSlice";
import { setMaxPrice } from "../../../../features/filter/filterSlice";

const PriceFilter = () => {

  const dispatch = useAppDispatch();
  const minPrice = useAppSelector(state => state.filter.minPrice);
  const maxPrice = useAppSelector(state => state.filter.maxPrice);


  return (
    <div className="price-filter">
      <input
        type="number"
        name="price-min"
        id="price-min-input"
        placeholder="min price"
        onChange={(e => dispatch(setMinPrice(Number(e.target.value))))}
        value={minPrice}
      /><span> — </span>
      <input
        type="number"
        name="price-max"
        id="price-max-input"
        placeholder="max price"
        onChange={(e => dispatch(setMaxPrice(Number(e.target.value))))}
        value={maxPrice}
      />
    </div>
  )
}

export default PriceFilter