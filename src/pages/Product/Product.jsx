import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import styled from 'styled-components';
import {
	getProductLoading,
	getProductSuccess,
} from '../../redux/reducers/product';
import { get_products_by_id } from '../../Services/Appservices';
// import Loading from '../../components/Loading/Loading';
import { Navbar } from '../../components';
import { FaPlus } from 'react-icons/fa6';
import { FaMinus } from 'react-icons/fa';
import { addToCart } from '../../redux/reducers/cart';
import Cart from '../Cart/Cart';

const ProductWrapper = styled.main`
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px;
		

		button {
			width: 100%;
			margin-top: 10px;
			padding: 10px;
			background-color: #000;
			color: #fff;
			border-radius: 8px;
			cursor: pointer;
		}
		.product {
			max-width: 600px;
			margin: 2em auto;
		}
		.product_description {
			padding: 1em 0;
			h3 {
				font-size: 1em;
				font-weight: 600;
				margin-bottom: 0.4em;
			}
			p {
				color: gray;
				line-height: 25px;
				font-size: 14.5px;
				letter-spacing: 1.6;
			}
		}
		.product_price {
			font-size: 1.2em;
			font-weight: 500;
			color: gray;
			padding: 0.5em 0;
		}
		.product_intro {
			display: flex;
			align-items: start;
			gap: 1em;

			@media (max-width: 768px) {
				display: block !important;
			}

			.product_box_flex {
				display: flex;
				gap: 1em;
			}
			.product_box {
				border: 1px solid #ccc;
				padding: 20px;
				border-radius: 10px;
				flex: 2;
			}

			.icon {
				color: white;
				height: 30px;
				width: 30px;
				cursor: pointer;
				font-size: 12px;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #000;
				border-radius: 50%;
			}

			input {
				width: 50%;
				border: 2px solid #ccc;
				outline: none;
				border-radius: 5px;
				padding: 6px;
			}
			img {
				width: 150px;
				height: 150px;
				flex: 2;
			}
		}
	}
`;

function Product() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { product } = useSelector((state) => state.product);
	const { show_cart } = useSelector((state) => state.cart);
	useEffect(() => {
		dispatch(getProductLoading());
		get_products_by_id(id).then((res) => {
			dispatch(getProductSuccess(res.data));
		});
	}, []);

	const [quantity, setQuantity] = useState(1);

	const increase_Quantity = () => {
		setQuantity((prev) => (prev += 1));
	};
	const decrease_Quantity = () => {
		setQuantity((prev) => {
			if (prev > 0) {
				return (prev -= 1);
			} else {
				return prev;
			}
		});
	};

	return (
		<ProductWrapper>
			<Navbar />
			{show_cart && <Cart />}
			{/* {loading === true && <Loading />} */}
			<div className='container'>
				<div className='product'>
					<div className='product_intro flex'>
						<img src={product.image} alt={product.name} />
						<div className='product_box'>
							<div>
								<h1 className='title'>{product.title}</h1>
								<h3 className='product_price'>
									${quantity !== 0 ? product.price * quantity : product.price}
								</h3>
							</div>

							<div className='product_box_flex'>
								<div className='icon' onClick={increase_Quantity}>
									<FaPlus />
								</div>

								<input
									type='number'
									min={1}
									value={quantity}
									name='number'
									id='number'
									onChange={(e) => setQuantity(e.target.value)}
								/>
								<div className='icon' onClick={decrease_Quantity}>
									<FaMinus />
								</div>
							</div>

							<button
								type='button'
								onClick={() => {
									dispatch(
										addToCart({
											price: product.price,
											id: product.id,
											title: product.title,
											image: product.image,
											quantity: quantity,
										})
									);
								}}
							>
								Add to Cart
							</button>
						</div>
					</div>
					<div className='product_info'>
						<div className='product_description'>
							<h3>{product ? 'Description' : ''}</h3>
							<p>{product.description}</p>
						</div>
					</div>
				</div>
			</div>
		</ProductWrapper>
	);
}

export default Product;
