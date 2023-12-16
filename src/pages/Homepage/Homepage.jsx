import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Navbar } from '../../components';

import {
	getFeaturedLoadings,
	getFeaturedProductsSuccess,
} from '../../redux/reducers/featured_product_reducer';
import Logo from '../../../public/logo.png';
import { Card } from '../../components';
import { get_Featured_pdt } from '../../Services/Appservices';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import Cart from '../Cart/Cart';
const HomepageWrapper = styled.main`

	footer {
		box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.2);
		margin-top: 2em
		padding: 20px;

		.container {
		max-width: 1200px;
		margin: 2em  auto 0 auto;
		padding:  20px;
		}
	}
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px;

		.title {
			padding: 1em 0;
			color: #000;
			text-transform: uppercase;
			font-weight: 600;
			text-align: center;
			font-size: 1.5em;
		}

	
		.featured {
			display: grid;
            grid-template-columns: 1fr;
            grid-gap: 20px;
			margin-top: 40px;
			
			img {
				width: 60px;
				height: 60px;
			}

			@media (min-width: 768px) {
                grid-template-columns: repeat(4, 1fr);
            }
        }

		}
		.hero {
			padding: 20px 0;
			text-align: center;
			max-width: 900px;
			margin: 0 auto;

			.hero_para {
				color: gray;
				line-height: 25px;
				font-size: 18px;
				max-width: 700px;
				margin: 0 auto;
				padding: 1em 0;
			}
			.hero_title {
				font-size: 48px;
				font-weight: 700;
				line-height: 56px;
				color: #090606;
				margin-bottom: 20px;
			}
			.button_container {
				margin: 1em 0;
			}
		}
	}
`;

function Homepage() {
	const { loading, featuredProducts } = useSelector(
		(state) => state.featured_products
	);

	const {show_cart} = useSelector((state) => state.cart)

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getFeaturedLoadings());
		get_Featured_pdt()
			.then((res) => {
				dispatch(getFeaturedProductsSuccess(res.data));
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<HomepageWrapper>
			<Navbar />
			{show_cart && <Cart />}
			<div className='container'>
				<div className='hero'>
					<h1 className='hero_title'>
						Your one-center for all your shopping demands
					</h1>

					<p className='hero_para'>
						Discover an unparalleled shopping experience with our extensive
						selection of products, unbeatable prices, and exceptional customer
						service. Shop now and transform your shopping journey with us.
					</p>

					<div className='button_container'>
						<Link to='/products'>
							<Button text='Shop Now' />
						</Link>
					</div>
				</div>

				<div>
					<h3 className='title'>Featured products</h3>
					<div className='featured'>
						{loading === true && <Loading />}
						{featuredProducts.map((product, index) => {
							const { name, image, price, id } = product;
							return (
								<Card
									id={id}
									key={index}
									name={name}
									image={image}
									price={price}
								/>
							);
						})}
					</div>
				</div>
			</div>
			<footer>
				<div className='container'>
					<div className='footer_content'>
						<div className='footer_logo'>
							<img src={Logo} alt='logo' />
						</div>
						&copy;2023
					</div>
				</div>
			</footer>
		</HomepageWrapper>
	);
}

export default Homepage;
