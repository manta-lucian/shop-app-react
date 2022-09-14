import "./Navigation.css";
import { Link } from "react-router-dom";
import Cart from "../Cart/Cart";
import { useState } from "react";
import CartDropDown from "../Cart/CartDropDown.jsx";

function Navigation(props) {
  const { setQuery, carts, onClickToCart, onClickRemove, onClickRemoveAll } = props;

  const [show, setShow] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const hideSearchInput = () => {
    if (showSearch == true) setShowSearch(false);
  };
  const displaySearchInput = () => {
    if (showSearch == false) setShowSearch(true);
  };

  const displayCartDropDown = () => {
    if (show == false) setShow(true);
    else setShow(false);
    console.log(show);
  };

  return (
    <div className="nav">
      {props.children}
      <div className="logo">LOGO</div>
      {showSearch ? (
        <div className="search-bar">
          <input
            className="search-fn"
            type="text"
            name="search"
            id="search"
            placeholder="Search item"
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="icon-search-nav">ICON</span>
        </div>
      ) : null}
      <div className="buttons">
        <Link className="btn btn-home" to="/" onClick={hideSearchInput}>
          Home
        </Link>
        <Link className="btn btn-product" to="/products" onClick={displaySearchInput}>
          Products
        </Link>
      </div>
      <div className="cart-cont">
        <Cart carts={carts} displayCartDropDown={displayCartDropDown} />
        <CartDropDown
          carts={carts}
          show={show}
          onClickToCart={onClickToCart}
          onClickRemove={onClickRemove}
          onClickRemoveAll={onClickRemoveAll}
        />
      </div>
    </div>
  );
}

export default Navigation;
