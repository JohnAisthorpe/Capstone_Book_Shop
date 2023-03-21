export interface Book {
  _id: number;
  title: string;
  author: string;
  description: string;
  image: string;
  category: string;
  price: number;
  stock: number;
  qty?: string;
}

// export interface User {
//   _id: number;
//   name: string;
//   email: string;
//   password: string;
//   isAdmin: boolean;
// }
