import { useState, useEffect } from "react";
import "./App.css";
import Layout from "./Layout/Layout";
import Navigation from "./Components/Navigation/Navigation";
import HomePage from "./Layout/pages/HomePage/HomePage";
import ProductPage from "./Layout/pages/ProductPage/Product";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [carts, setCarts] = useState([]);
  const [product, setProduct] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [query, setQuery] = useState("");
  const productsPerPage = 15;
  const pagesInto = pageNumber * productsPerPage;
  const pageCount = Math.ceil(product.length / productsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayProducts = product
    .filter((el) => el.title.toLowerCase().includes(query))
    .slice(pagesInto, pagesInto + productsPerPage)
    .map((el) => {
      const titleArr = el.title.length > 23 ? el.title.split(" ").slice(0, 2).join(" ") + "..." : el.title;
      const reducedHeading = [titleArr];

      if (el.image == "") return;

      return (
        <div key={el.id} className="product-item">
          <h3 className="product-heading">{reducedHeading}</h3>
          <img className="product-img" src={el.image} alt="Some Random Image" />
          <p className="product-price">Price: {el.price} $</p>
          <button
            className="btn add-to-cart"
            onClick={() => {
              onClickToCart(el);
            }}
          >
            Add to cart
          </button>
        </div>
      );
    });

  const onClickToCart = function (product) {
    const exist = carts.find((el) => el.id === product.id);
    if (exist) {
      setCarts(carts.map((el) => (el.id === product.id ? { ...exist, quantity: exist.quantity + 1 } : el)));
    } else {
      setCarts([...carts, { ...product, quantity: 1 }]);
    }
  };
  const onClickRemove = (product) => {
    const exist = carts.find((el) => el.id === product.id);
    if (exist.quantity === 1) {
      setCarts(carts.filter((el) => el.id !== product.id));
    } else {
      setCarts(carts.map((el) => (el.id === product.id ? { ...exist, quantity: exist.quantity - 1 } : el)));
    }
  };
  const onClickRemoveAll = function (product) {
    const exist = carts.find((el) => el.id === product.id);
    if (exist.quantity >= 1) {
      setCarts(carts.filter((el) => el.id !== product.id));
    }
  };

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setProduct(json);
      });
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Layout>
          <Navigation
            setQuery={setQuery}
            carts={carts}
            onClickRemoveAll={onClickRemoveAll}
            onClickToCart={onClickToCart}
            onClickRemove={onClickRemove}
          />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/products"
              element={
                <ProductPage
                  changePage={changePage}
                  pageCount={pageCount}
                  displayProducts={displayProducts}
                  carts={carts}
                  onClickToCart={onClickToCart}
                />
              }
            />
            <Route path="*" element={<div>Not Found!</div>} />
          </Routes>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
