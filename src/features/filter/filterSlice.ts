import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from "axios";

export interface Subcategory {
  id: number,
  name: string,
  category_id: number,
}

export interface Category {
  id: number,
  name: string,
  subcategories: Subcategory[],
}
export interface FilterState {
  minPrice: number,
  maxPrice: number,
  categories: Category[],
  selectedSubcategory: Subcategory | null,
  selectedCategoryName: string | null,
  priceOrder: 'desc' | 'asc',
  selectedCharacteristics: any,
  filterVisible: boolean,
  displayAs: "rows" | "tiles",

}

const initialState: FilterState = {
  minPrice: 1,
  maxPrice: 1000,
  categories: [],
  priceOrder: 'desc',
  selectedSubcategory: null,
  selectedCategoryName: null,
  selectedCharacteristics: {},
  filterVisible: true,
  displayAs: "rows",
};
export const fetchCategories = createAsyncThunk<
  Category[]
>
  ('filter/fetchCategories', async () => {
    const response = await axios.get('http://localhost:3000/categories');
    return response.data;
  }
  )

export const filterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setMinPrice: (state, action: PayloadAction<number>) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number>) => {
      state.maxPrice = action.payload;
    },
    setPriceOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.priceOrder = action.payload;
    },
    setActiveSubcategory: (state, action: PayloadAction<Subcategory>) => {
      state.selectedSubcategory = action.payload;
    },
    setActiveCategoryName: (state, action: PayloadAction<string | null>) => {
      state.selectedCategoryName = action.payload;
    },
    selectCharacteristics: (state, action: PayloadAction<{}>) => {
      state.selectedCharacteristics = action.payload;
    },
    selectCharacteristicsForName: (state, action: PayloadAction<{ characteristic_name_id: number, value: string }>) => {
      let characteristicsForName = state.selectedCharacteristics[action.payload.characteristic_name_id as keyof {}] as string[]
      !characteristicsForName.includes(action.payload.value) ?
        characteristicsForName.push(action.payload.value) :
        characteristicsForName = characteristicsForName.filter(value => value !== action.payload.value)
      state.selectedCharacteristics[action.payload.characteristic_name_id as keyof {}] = characteristicsForName
    },
    toggleFilterVisibility: (state) => {
      state.filterVisible = !state.filterVisible;
    },
    toggleView: (state) => {
      state.displayAs === 'rows' ?
        state.displayAs = 'tiles' :
        state.displayAs = 'rows'
    }


  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
  }
})

export const {
  setMinPrice,
  setMaxPrice,
  setPriceOrder,
  setActiveSubcategory,
  setActiveCategoryName,
  selectCharacteristics,
  selectCharacteristicsForName,
  toggleFilterVisibility,
  toggleView,

} = filterSlice.actions;

export default filterSlice.reducer;