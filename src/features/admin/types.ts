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

export interface AdminState {
  products: Product[],
  categories: Category[],
  subcategories: Subcategory[],
}