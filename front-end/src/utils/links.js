export const links = [
  {
    id: 1,
    text: 'home',
    url: '/',
  },
  {
    id: 2,
    text: 'about',
    url: '/about',
  },
  {
    id: 3,
    text: 'products',
    url: '/products',
  },
];

export const baseUrl = 'https://beauty-ecommerce-api.herokuapp.com/api/v1';

export const products_url = `${baseUrl}/products`;
export const login_url = `${baseUrl}/auth/login`;
export const register_url = `${baseUrl}/auth/register`;
export const logout_url = `${baseUrl}/auth/logout`;
export const cart_url = `${baseUrl}/cart`;
export const user_url = `${baseUrl}/users`;
