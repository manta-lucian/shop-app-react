import "./CartDropDown.css";

function CartDropDown(props) {
  const { carts, show, onClickToCart, onClickRemove, onClickRemoveAll } = props;

  const totalPrice = carts.reduce((a, c) => a + c.quantity * c.price, 0);

  return (
    <div className="show-hide">
      {show ? (
        <div className="cart-drop-down-container">
          {carts.length === 0 && <div className="no-items-in-cart">Cart is empty</div>}

          {carts.map((el) => (
            <div key={el.id} className="cart-drop-down-item-container">
              <div className="item-title">{el.title}</div>
              <div className="item-quantity-and-price-container">
                <p>{el.quantity}</p>
                <p>x</p>
                <p>{el.price}$</p>
              </div>
              <div className="item-button-container">
                <div className="btn-add-and-remove-one-container">
                  <button
                    className="cart-btn btn-add"
                    onClick={() => {
                      onClickToCart(el);
                    }}
                  >
                    +
                  </button>
                  <button
                    className="cart-btn btn-add"
                    onClick={() => {
                      onClickRemove(el);
                    }}
                  >
                    -
                  </button>
                </div>
                <button
                  className="cart-btn btn-remove-all"
                  onClick={() => {
                    onClickRemoveAll(el);
                  }}
                >
                  DEL
                </button>
              </div>
            </div>
          ))}
          {carts.length !== 0 && <div className="total-price">Total: &nbsp; {totalPrice.toFixed(2)}$</div>}
        </div>
      ) : null}
    </div>
  );
}

export default CartDropDown;
