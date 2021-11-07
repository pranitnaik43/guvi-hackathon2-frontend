const Product = (props) => {
  const { product, addToCart, removeFromCart } = props;
  return ( 
    <>
      <div className="card">
        <img src="https://place-hold.it/300x300/666" className="card-img" alt=""/>
        <div className="card-body">
          <div className="d-flex justify-content-between">
          <h5 className="text-truncate" title={ product.name }>{ product.name }</h5>
          <small>{ "₹" + product.price }</small>
          </div>
          <div className="d-flex justify-content-end">
          {
            (!product.isAddedToCart) ? (
              <button className="btn btn-primary" 
              onClick={ () => { addToCart(product); product.isAddedToCart=true; }}>
              Add to Cart</button>
            ) : (
              <button className="btn btn-danger" 
              onClick={ () => { removeFromCart(product); product.isAddedToCart=false; }}>
              Remove from Cart</button>
            )
          }
          </div>
        </div>
      </div> 
    </>
  );
}
 
export default Product;