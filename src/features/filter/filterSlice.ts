import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCategories, fetchCharacteristicsForSubcategory, fetchProducts, searchKeywordsAndProducts } from './thunks';
import { Category, FilterState, Subcategory } from '../types';

const initialState: FilterState = {
  minPrice: 1,
  maxPrice: 1000,
  categories: [],
  products: [],
  searchResults: {
    keywords: [],
    products: [],
  },
  searchQuery: "",
  priceOrder: 'desc',
  activeCategory: undefined,
  activeSubcategory: undefined,
  characteristicNames: [],
  filterVisible: true,
  displayAs: "rows",
};

export const filterSlice = createSlice({
  name: 'filter',
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
    setActiveSubcategory: (state, action: PayloadAction<Subcategory | undefined>) => {
      state.activeSubcategory = action.payload;
    },
    setActiveCategory: (state, action: PayloadAction<Category | undefined>) => {
      state.activeCategory = action.payload;
    },
    selectCharacteristics: (state, action: PayloadAction<{
      characteristicName: string,
      characteristicValue: string
    }>) => {
      const modified = state.characteristicNames
        .find(characteristicName =>
          characteristicName.name === action.payload.characteristicName
        )
        ?.characteristics.map(characteristicValue => {
          if (characteristicValue.value === action.payload.characteristicValue) {
            if (!characteristicValue.selected)
              return { ...characteristicValue, selected: true }
            else {
              return { ...characteristicValue, selected: false }
            }
          }
          else return characteristicValue
        })
    },
    toggleCharacteristic: (state, action: PayloadAction<{
      name: string,
      characteristicId: number
    }>) => {
      for (let i = 0; i < state.characteristicNames.length; i++) {
        if (state.characteristicNames[i].name === action.payload.name) {
          state.characteristicNames[i].characteristics =
            state.characteristicNames[i].characteristics
              .map(characteristic => {
                if (characteristic.id === action.payload.characteristicId) {
                  if (characteristic.selected)
                    return { ...characteristic, selected: false }
                  else return { ...characteristic, selected: true }
                } else return characteristic
              })
        }
      }
    },
    toggleFilterVisibility: (state) => {
      state.filterVisible = !state.filterVisible;
    },
    toggleView: (state) => {
      state.displayAs === 'rows' ?
        state.displayAs = 'tiles' :
        state.displayAs = 'rows'
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    }


  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload.data.categories;
      })
    builder
      .addCase(fetchCharacteristicsForSubcategory.fulfilled, (state, action) => {
        state.characteristicNames = action.payload.data.characteristicNames;
      })
    builder
      .addCase(searchKeywordsAndProducts.fulfilled, (state, action) => {
        state.searchResults.keywords = action.payload.keywords.data.keywords;
        state.searchResults.products = action.payload.products.data.products;
      })
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.data.products;
      })
  }
})

export const {
  setMinPrice,
  setMaxPrice,
  setPriceOrder,
  setActiveSubcategory,
  setActiveCategory,
  toggleCharacteristic,
  toggleFilterVisibility,
  toggleView,
  setSearchQuery,

} = filterSlice.actions;

export default filterSlice.reducer;