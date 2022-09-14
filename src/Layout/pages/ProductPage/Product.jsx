import "./Product.css";
import ReactPaginate from "react-paginate";

function ProductPage(props) {
  const { displayProducts, pageCount, changePage } = props;

  return (
    <>
      <h1 className="heading-product">You can find all products here</h1>
      <div className="container-product">{displayProducts}</div>
      <ReactPaginate
        previousLabel="&larr; prev"
        nextLabel="next &rarr;"
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName="pagination-container"
        previousLinkClassName="btn-prev"
        nextLinkClassName="'btn-next"
        disabledClassName="btn-disabled"
        activeLinkClassName="btn-active"
      />
    </>
  );
}

export default ProductPage;
