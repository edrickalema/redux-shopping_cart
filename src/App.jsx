import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Homepage, Shop, Product, Cart } from './pages';
import { Navbar } from './components';
import { useSelector } from 'react-redux';

function App() {
	const { show_cart } = useSelector((state) => state.cart);
	const router = createBrowserRouter([
		{ path: 'products', element: <Shop /> },
		{ path: 'products/:id', element: <Product /> },
		{ path: '/', element: <Homepage /> },
	]);
	return <RouterProvider router={router}></RouterProvider>;
}

export default App;
