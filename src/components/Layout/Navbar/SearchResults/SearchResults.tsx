import "./SearchResults.scss";
import { useAppSelector } from "../../../../app/hooks";


const SearchResults = () => {
  let keywords = useAppSelector(state =>
    state.filter.searchResults.keywords)
  let products = useAppSelector(state =>
    state.filter.searchResults.products).slice()
  keywords.map(keyword => {
    if (!products.map(product => product.id).includes(keyword.product.id))
      products.push(keyword.product);
  })

  const searchQuery = useAppSelector(state => state.filter.searchQuery);

  return (
    <div className="search-results" style={{ display: searchQuery === "" ? "none" : "block" }}>
      <b>Goods</b>
      {products.length > 0 ?
        <ul>
          {products.slice(0, 5)?.map(product => <li key={product.id}>{product.name}</li>)}
        </ul>
        : <p><i>Nothing found...</i></p>
      }
    </div>
  )
}

export default SearchResults;