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

export interface Characteristic {
  selected?: boolean | undefined;
  id: number,
  value: string,
  characteristic_name_id: number
}

export interface CharacteristicName {
  id: number,
  name: string,
  characteristics: Characteristic[]
}


export interface FilterState {
  minPrice: number,
  maxPrice: number,
  categories: Category[],
  activeCategory: Category | undefined,
  activeSubcategory: Subcategory | undefined,
  characteristicNames: CharacteristicName[],
  priceOrder: 'desc' | 'asc',
  filterVisible: boolean,
  displayAs: "rows" | "tiles",

}