const Product = (props) => {
  const { product, addToCart, isAddedToCart } = props;

  const getCurrenyINRformat = (val) => {
    val = parseFloat(val);
    return val.toLocaleString("en-IN", {
      style: 'currency',
      currency: 'INR',
    })
  }

  return ( 
    <>
      <div className="card">
        <img src="https://place-hold.it/300x300/666" className="card-img" alt=""/>
        <div className="card-body">
          <div className="d-flex justify-content-between">
          <h5 className="text-truncate" title={ product.name }>{ product.name }</h5>
          <small>{ getCurrenyINRformat(product.price) }
          </small>
          </div>
          <div className="d-flex justify-content-end">
          {
            <button className="btn btn-primary" 
            onClick={ () => { addToCart(product._id); }} 
            disabled={isAddedToCart(product._id)}><i className="bi bi-cart-plus-fill"></i> Add to Cart</button>
          }
          </div>
        </div>
      </div> 
    </>
  );
}
 
export default Product;