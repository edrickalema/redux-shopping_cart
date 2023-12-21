// import React from 'react';
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { closeCart, removeFromCart } from "../../redux/reducers/cart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const CartWrapper = styled.main`
  .cart_container {
    position: fixed;
    height: 150vh;
    background-color: rgba(0, 0, 0, 0.4);
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
  }

  .cart {
    background-color: #fff;
    height: fittingHeight;
    padding: 20px;
    width: fittingWidth;
    position: absolute;
    right: 0;
    display: flex;
    justify-content: space-between;
    // align-items: center;
    flex-direction: column;
    min-width: 30%;
    min-height: 30%;
  }

  .cart_product {
    display: flex;
    align-items: start;
    gap: 20px;
    margin: 1em auto;
    max-width: 300px;
  }
  .cart_image {
    height: 70px;
    width: 70px;
  }
  .cart_head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .remove_btn {
    background: crimson;
    color: white;
    font-size: 10px;
    padding: 0.2em 0.4em;
    border-radius: 3px;
  }

  .cart_product_info {
    padding-bottom: 0.6em;

    p {
      color: gray;

      span {
        margin-left: 1em;
      }
    }
    h4 {
      font-size: 13.8px;
      font-weight: 500;
    }
  }
  .cart_total {
    padding: 1em 0;
    color: #222;
    text-transform: uppercase;

    span {
      font-weight: 600;
      font-size: 1.2em;
    }
  }
  .checkout_btn {
    background-color: green;
    text-align: center;
    padding: 0.8em 0;
    color: #fff;
    border-radius: 0.4em;
    cursor: pointer;
    width: 100%;
  }

  .shop_btn {
    color: green;
  }
`;
function Cart() {
  const notify = () => toast("Thanks for shopping with us!");
  const { cart_pdt } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total_amount = cart_pdt.reduce((accumulator, currentValue) => {
    const amount = currentValue.price * currentValue.quantity;
    return amount + accumulator;
  }, 0);

  return (
    <CartWrapper>
      <div className="cart_container">
        <div className="cart">
          <div className="cart_head">
            <h1>
              {cart_pdt.length} {cart_pdt.length > 1 ? "items" : "item"} in Cart
            </h1>
            <FaTimes onClick={() => dispatch(closeCart())} />
          </div>

          <div className="cart_content">
            {cart_pdt.length > 0 ? (
              cart_pdt.map((product, index) => {
                const { title, price, image, id, quantity } = product;
                return (
                  <div key={index}>
                    <div className="cart_product">
                      <img className="cart_image" src={image} alt={name} />
                      <div>
                        <div className="cart_product_info">
                          <h4>{title}</h4>
                          <p>
                            $ {price * quantity} <span>Qty : {quantity}</span>
                          </p>
                        </div>
                        <button
                          className="remove_btn"
                          onClick={() => dispatch(removeFromCart(id))}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>
                <h3>Cart is Empty </h3>
                <Link
                  to="/products"
                  className="shop_btn"
                  onClick={() => dispatch(closeCart())}
                >
                  Shop
                </Link>
              </div>
            )}
          </div>

          {cart_pdt.length > 0 && (
            <h1 className="cart_total">
              Total : <span>${total_amount.toFixed(2)}</span>
            </h1>
          )}

          {cart_pdt.length > 0 && (
            <div>
              <button className="checkout_btn" onClick={notify}>
                Proceed to checkout
              </button>
              <ToastContainer />
            </div>
          )}
        </div>
      </div>
    </CartWrapper>
  );
}

export default Cart;
