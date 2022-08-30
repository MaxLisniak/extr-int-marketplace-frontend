import "./Searchbar.scss";
import SearchIcon from "./assets/search.png";
import { useAppDispatch, } from "../../../../app/hooks";
import { searchKeywordsAndProducts } from "../../../../features/filter/thunks";
import { setSearchQuery } from "../../../../features/filter/filterSlice";

const Searchbar = () => {

  const dispatch = useAppDispatch();

  const search = (q: string) => {
    dispatch(searchKeywordsAndProducts(q));
    dispatch(setSearchQuery(q));
  }

  return (
    <div className="search">
      <div className="button">
        <img src={SearchIcon} alt="search" />
      </div>
      <input
        type="text"
        placeholder="search"
        onChange={(e) => search(e.target.value)}
      />
    </div>
  )
}

export default Searchbar;