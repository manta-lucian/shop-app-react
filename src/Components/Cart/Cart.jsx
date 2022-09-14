import "./Cart.css";
import { FaShoppingCart } from "react-icons/fa";

function Cart(props) {
  const { carts, displayCartDropDown } = props;

  return (
    <div className="cart" onClick={displayCartDropDown}>
      <div className="btn-cart">
        <FaShoppingCart className="icon" />
        <div className="items-in-cart">{carts.reduce((a, c) => a + c.quantity, 0)}</div>
      </div>
    </div>
  );
}

export default Cart;
