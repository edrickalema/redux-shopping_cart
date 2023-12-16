import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_categories, get_products } from '../../Services/Appservices';
import { Navbar, Button, Card } from '../../components';
import styled from 'styled-components';
import {
	getProductsLoading,
	getProductsSuccess,
	getFilterProductsByCategory,
} from '../../redux/reducers/products';
import Loading from '../../components/Loading/Loading';
import Cart from '../Cart/Cart';

const ShopWrapper = styled.main`
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px;

		.category_container {
			margin: 1em 0;
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 15px;

			@media (max-width: 768px) {
				display: block;
			}

			p {
				text-transform: capitalize;
				cursor: pointer;
				:hover {
					color: green;
				}
			}
		}

		.product_container {
			margin: 3em 0;
			display: grid;

			grid-template-columns: repeat(2, 1fr);

			@media (max-width: 768px) {
				grid-template-columns: repeat(2, 1fr);
				margin: 1em 0;
			}
			gap: 20px;

			@media (min-width: 768px) {
				grid-template-columns: repeat(5, 1fr);
			}

			img {
				width: 70px;
				height: 70px;
			}
		}
	}
`;
function Shop() {
	const [category, setCategory] = useState([]);
	const [text, setText] = useState('');
	const dispatch = useDispatch();
	const { products, loading } = useSelector((state) => state.products);
	const { show_cart } = useSelector((state) => state.cart);

	const handleButton = (e) => {
		setText(e.target.textContent);
		dispatch(getFilterProductsByCategory(text));
	};

	const [shop, setShop] = useState(products);

	const filtered_shopData = shop.filter((product) => product.category === text);

	const Data = text ? filtered_shopData : shop;

	useEffect(() => {
		dispatch(getProductsLoading());
		get_products()
			.then((res) => {
				console.log(res);
				dispatch(getProductsSuccess(res.data));
			})
			.catch((error) => {
				console.log(error);
			});

		get_categories().then((categories) => {
			setCategory(categories.data);
		});
	}, []);

	return (
		<ShopWrapper>
			<Navbar />
			{show_cart && <Cart />}
			<section className='container'>
				<div className='category'>
					<div className='category_container'>
						{category.length > 0 &&
							category.map((cate, index) => {
								return (
									<div key={index}>
										<p onClick={handleButton}>{cate}</p>
									</div>
								);
							})}
					</div>

					<div className='product_container'>
						{loading && <Loading />}

						{products.length > 0 &&
							Data.map((product, index) => {
								const { title, id, price, image } = product;
								return (
									<Card
										id={id}
										key={index}
										title={title}
										image={image}
										price={price}
									/>
								);
							})}
					</div>
				</div>
			</section>
		</ShopWrapper>
	);
}

export default Shop;
