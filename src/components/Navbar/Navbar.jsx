import React from 'react';
import { FaCartShopping } from 'react-icons/fa6';
import styled from 'styled-components';
import { FaBars } from 'react-icons/fa6';
import { IoSearchSharp } from 'react-icons/io5';
import Logo from './../../../public/logo.png';
import { FaTimes } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { showCart } from '../../redux/reducers/cart';
import { Link, NavLink } from 'react-router-dom';

const NavbarWrapper = styled.section`
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px;
	}
	header {
		box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
	}
	.cart {
		
	
		position: relative;
	}
	.cart_count {
		position: absolute;
		top: -24px;
		height: 30px;
		width: 30px;
		background: green;
		right: -20px;
		border-radius: 50%;
		display: grid;
		place-items: center;
		color: white;
		font-weight: bold;
	}

	.cart_box {
		width: 30px;
		height: 30px;
		cursor: pointer;
	}

	.flex {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.menu {
		height: 80px;
		padding: 0 20px;
	}

	.toggle {
		margin-left: 20px;

		@media (min-width: 768px) {
			display: none;
		}
	}

	nav {
  

      
         margin-right: 20px;
        
        @media (max-width: 768px) {
            display: block;
        }
    }
		.close_toggle {
			font-size: 18px;
			cursor: pointer;

			@media (min-width: 768px) {
				display: none;
			}
		}

		.toggle {
			cursor: pointer;
		}

		ul {
			display: flex;

			li {
				margin-left: 5px;

				a {
					font-size: 18px;
					font-weight: 500;
					color: #090606;
					text-decoration: none;
					transition: 0.3s ease;
				}
			}
		}
	}

	.search {
		padding: 10px 20px;
		border: 2px solid #ddd;
		margin: 0 10px;
		border-radius: 10px;

		.search-icon {
			color: #gray;
			font-size: 20px;
			cursor: pointer;
		}

		@media (max-width: 768px) {
			border: 0;
		}

		input {
			outline: none;
            padding: 0 20px;

			@media (max-width: 768px) {
				display: none;
			}
		}
	}
`;
function Navbar() {
	const dispatch = useDispatch();

	const { cart_pdt } = useSelector((state) => state.cart);
	return (
		<NavbarWrapper>
			<header>
				<div className='container'>
					<div className='flex'>
						<div className='logo'>
							<Link to='/'>
								<img src={Logo} alt='logo' />
							</Link>
						</div>

						<div className='menu flex'>
							<nav>
								<ul>
									<li>
										<a href='/'>Home</a>
									</li>
									<li>
										<a href='/products'>Store</a>
									</li>
								</ul>
							</nav>

							<div className='cart'>
								<FaCartShopping
									className='cart_box'
									onClick={() => dispatch(showCart())}
								></FaCartShopping>
								<div className='cart_count'>{cart_pdt.length}</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		</NavbarWrapper>
	);
}

export default Navbar;
