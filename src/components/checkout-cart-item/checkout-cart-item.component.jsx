import React from "react";
import './checkout-cart-item.styles.scss';
import { clearItemFromCart } from "../../redux/cart/cart.actions";
import { connect } from "react-redux";

const CheckoutCartItem = ({ cartItem, clearItem }) => {
  const { name, imageUrl, price, quantity } = cartItem
  return (<div className="checkout-item">
    <div className="image-container">
      <img src={imageUrl} alt="checkout cart item"/>
    </div>
    <span className="name">{name}</span>
    <span className="quantity">{quantity}</span>
    <span className="price">{price}</span>
    <div className='remove-button' onClick={() => clearItem(cartItem)}>&#10005;</div>
  </div>)
}

const mapDispatchToProps = dispatch => ({
  clearItem: (item) => dispatch(clearItemFromCart(item)),
})

export default connect(null, mapDispatchToProps)(CheckoutCartItem);