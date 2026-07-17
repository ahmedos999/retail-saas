import type { TableColumn } from '@retail/ui'

export const productColumns: TableColumn[] = [
  { key: 'product', header: 'Product' },
  { key: 'category', header: 'Category' },
  { key: 'SKU', header: 'SKU' },
  { key: 'stock', header: 'Stock' },
  { key: 'price', header: 'Price' },
  { key: 'status', header: 'Status' },
  { key: 'actions', header: 'Actions' },
]

export const products = [
  {
    id: 1,
    name: 'Product A',
    category: 'Shoes',
    sku: 'SKU12345',
    stock: 50,
    price: '$19.99',
    status: 'In Stock',
  },
  {
    id: 2,
    name: 'Product B',
    category: 'Clothing',
    sku: 'SKU67890',
    stock: 30,
    price: '$29.99',
    status: 'In Stock',
  },
  {
    id: 3,
    name: 'Product C',
    category: 'Accessories',
    sku: 'SKU11223',
    stock: 20,
    price: '$39.99',
    status: 'Low Stock',
  },
  {
    id: 4,
    name: 'Product D',
    category: 'Shoes',
    sku: 'SKU44556',
    stock: 0,
    price: '$49.99',
    status: 'Out of Stock',
  },
  {
    id: 5,
    name: 'Product E',
    category: 'Clothing',
    sku: 'SKU77889',
    stock: 75,
    price: '$14.99',
    status: 'In Stock',
  },
]

export const categories = [
  { id: 1, name: 'Shoes' },
  { id: 2, name: 'Clothing' },
  { id: 3, name: 'Accessories' },
  { id: 4, name: 'Electronics' },
  { id: 5, name: 'Home & Kitchen' },
]

export const items = [
  {
    name: 'Product 1',
    price: 19.99,
    imageUrl: '/product1.png',
    stock: 10,
  },
  {
    name: 'Product 2',
    price: 29.99,
    imageUrl: '/product1.png',
    stock: 3,
  },
  {
    name: 'Product 3',
    price: 39.99,
    imageUrl: '/product1.png',
    stock: 0,
  },
  {
    name: 'Product 4',
    price: 49.99,
    imageUrl: '/product1.png',
    stock: 5,
  },
  {
    name: 'Product 1',
    price: 19.99,
    imageUrl: '/product1.png',
    stock: 10,
  },
  {
    name: 'Product 2',
    price: 29.99,
    imageUrl: '/product1.png',
    stock: 3,
  },
  {
    name: 'Product 3',
    price: 39.99,
    imageUrl: '/product1.png',
    stock: 0,
  },
  {
    name: 'Product 4',
    price: 49.99,
    imageUrl: '/product1.png',
    stock: 5,
  },
]
export const CartItems = [
  {
    img: '/product1.png',
    name: 'Product 1',
    description: 'Description for Product 1',
    price: 10.99,
    quantity: 2,
  },
  {
    img: '/product1.png',
    name: 'Product 2',
    description: 'Description for Product 2',
    price: 15.49,
    quantity: 1,
  },
  {
    img: '/product1.png',
    name: 'Product 3',
    description: 'Description for Product 3',
    price: 15.49,
    quantity: 1,
  },
]
