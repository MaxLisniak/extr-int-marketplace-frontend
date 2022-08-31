import "./SearchResults.scss";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { Link } from "react-router-dom";
import { setSearchQuery } from "../../../../features/filter/filterSlice";

const SearchResults = () => {

  const dispatch = useAppDispatch();

  let keywords = useAppSelector(state =>
    state.filter.searchResults.keywords)
  let products = useAppSelector(state =>
    state.filter.searchResults.products).slice()
  keywords.map(keyword => {
    if (!products.map(product => product.id).includes(keyword.product.id))
      products.push(keyword.product);
  })

  const searchQuery = useAppSelector(state => state.filter.searchQuery);
  const categories = useAppSelector(state => state.filter.categories);

  return (
    <div className="search-results" style={{ display: searchQuery === "" ? "none" : "block" }}>
      <b>Goods</b>
      {products.length > 0 ?
        <ul>
          {
            products.slice(0, 5)?.map(
              product => {
                const category = categories
                  .filter(category => {
                    return category.subcategories.find(subcategory =>
                      subcategory.id === product.subcategory_id
                    )
                  })[0]
                const subcategory = category.subcategories.find(subcategory =>
                  subcategory.id === product.subcategory_id);
                // product.subcategory_id;
                return <Link
                  to={`explore/${category}/${subcategory}/${product.id}`}
                  onClick={() => dispatch(setSearchQuery(""))}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <li key={product.id}>{product.name}</li>
                </Link>
              }
            )
          }
        </ul>
        : <p><i>Nothing found...</i></p>
      }
    </div>
  )
}

export default SearchResults;