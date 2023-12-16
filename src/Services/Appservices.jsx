import axios, * as others from 'axios';

const pdt_api = `https://fakestoreapi.com/products`;

export const get_Featured_pdt = () => axios.get(`${pdt_api}?limit=4`);
export const get_products = () => axios.get(`${pdt_api}`);
export const get_products_by_id = (id) => axios.get(`${pdt_api}/${id}`);
export const get_categories = () => axios.get(`${pdt_api}/categories`);
export const get_product_by_category = (category) =>  axios.get(`${pdt_api}/category/${category}`);
