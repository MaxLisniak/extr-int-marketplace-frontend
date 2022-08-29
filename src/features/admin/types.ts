export interface Product {
  id: number,
  name: string,
  description: string,
  image_url: string,
}

export interface Category {
  id: number,
  name: string,
  subcategories: Subcategory[]
}

export interface Subcategory {
  id: number,
  name: string,
}

export interface Characteristic {
  id: number,
  value: string,
  characteristic_name_id: number,
  product_id: number,
}

export interface CharacteristicName {
  id: number,
  name: string,
  for_subcategory: number,
}

export interface Price {
  id: number,
  price: number,
  date: string,
  product_id: number
}

export interface Keyword {
  id: number,
  product_id: number,
  keyword: string,
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