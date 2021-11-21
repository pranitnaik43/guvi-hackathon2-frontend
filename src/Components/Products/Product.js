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
        <img src={(product.thumbnail) ? (process.env.REACT_APP_SERVER_URL + "/thumbnail/" + product.thumbnail.filename) : ("https://place-hold.it/300x300/666")} className="card-img px-2 pt-2" alt=""/>
        <div className="card-body d-flex px-2">
          <div className="">
            <h5 className="text-truncate m-0" title={ product.name }>{ product.name }</h5>
            <small className="text-secondary">{ getCurrenyINRformat(product.price) }</small>
          </div>
          <div className="d-flex ml-auto d-flex align-items-center">
            <button className="btn btn-primary" 
            onClick={ () => { addToCart(product._id); }} 
            disabled={isAddedToCart(product._id)}><i className="fa fa-cart-plus"></i></button>
          </div>
        </div>
      </div> 
    </>
  );
}
 
export default Product;