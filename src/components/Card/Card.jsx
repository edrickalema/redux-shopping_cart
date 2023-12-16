import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CardWrapper = styled.div`
	text-align: center;
	height: 200px;
	padding: 10px;
	border-radius: 5px;
	border: 1px solid #ccc;
	.featured_item {
		color: #fff;
		border-radius: 5px;
		cursor: pointer;

		@media (max-width: 768px) {
			margin-top: 2em;
		}

		img {
			margin: auto;
			height: 250px;
		}

		h3 {
			color: #000;
			font-weight: bold;
		}
	}
`;
function Card({ index, name, price, image,id, title }) {
	return (
		<CardWrapper>
			<Link to={`/products/${id}`}>
				<div className='featured_item' key={index}>
					<img src={image} alt={name || title} />
					<h2>{title}</h2>
					<h3>$ {price}</h3>
				</div>
			</Link>
		</CardWrapper>
	);
}

export default Card;
