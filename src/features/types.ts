
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

export interface Product {
  id: number,
  name: string,
  description: string,
  image_url: string,
  subcategory_id: number,
  number_of_favorites: number,
  latest_price: number,
  characteristics: {
    id: number,
    value: string,
    characteristic_name: {
      name: string,
      id: number
    },
  }[],
  comments: Comment[],
  prices: Price[],
}

export interface Keyword {
  product: Product
  id: number,
  product_id: number,
  keyword: string,
}

export interface Price {
  id: number,
  price: number,
  date: string,
  product_id: number
}

export interface User {
  id: number,
  first_name: string,
  last_name: string,
}

export interface Comment {
  id: number,
  text: string,
  created: string,
  user_id: number,
  product_id: number,
  user?: User,
}

export interface FilterState {
  minPrice: number,
  maxPrice: number,
  categories: Category[],
  products: Product[],
  activeCategory: Category | undefined,
  activeSubcategory: Subcategory | undefined,
  characteristicNames: CharacteristicName[],
  priceOrder: 'desc' | 'asc',
  filterVisible: boolean,
  displayAs: "rows" | "tiles",
  searchResults: {
    keywords: Keyword[],
    products: Product[],
  },
  searchQuery: string,

}
export interface AdminState {
  products: Product[],
  categories: Category[],
  subcategories: Subcategory[],
  characteristics: Characteristic[],
  characteristic_names: CharacteristicName[],
  prices: Price[],
  keywords: Keyword[],
  errorMessages: string[],
}