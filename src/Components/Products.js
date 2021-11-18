import { useState, useEffect } from "react";
import axios from 'axios';
import Product from "./Product";
import AddProductModal from "./AddProductModal";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  var config = {
    method: 'GET',
    url: process.env.REACT_APP_SERVER_URL+'/products',
    headers: { 
      'access-token': localStorage.getItem("accessToken")
    }
  };
  useEffect(() => {
    //fetch products
    config.url = process.env.REACT_APP_SERVER_URL+'/products';
    axios(config).then(response => {
      // console.log(response);
      if(response.data) {
        setProducts(response.data);
      }
    });

    //fetch cart products
    config.url = process.env.REACT_APP_SERVER_URL+'/cart';
    axios(config).then(response => {
      if(response.data) {
        setCartProducts(response.data);
      }
    });
    // eslint-disable-next-line
  }, []);  

  let addToCart = (productId) => {
    config.method = "POST";
    config.url = process.env.REACT_APP_SERVER_URL+'/cart/addProduct';
    config.data = { "productId": productId };
    axios(config).then(response => {
      if(response.data.error) {
        console.log("Error: ", response.data.error);
      }
    });

    setCartProducts([...cartProducts, productId]);
  }

  const isAddedToCart = (id) => {
    if(cartProducts && cartProducts.includes(id)) {
      return true;
    }
    return false;
  }

  const openModal = () => {
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }

  return ( 
    <>
      {/* {console.log("cart: ", cartProducts)} */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 m-5 d-flex justify-content-center">
        { (products.length>0) ?
        (products.map(product => { 
          return (
            <div className="col my-4" key={product._id}>
              <Product product={product} addToCart={addToCart} isAddedToCart={isAddedToCart}/>
            </div>
          )})
        ) : 
        ( <p className="text-center text-white">There are no products</p> ) }
      </div>

      <button type="button" className="btn btn-primary" onClick={() => {setShowModal(true)}}>
        Launch
      </button>
      <AddProductModal modalTitle="Add Product" 
        showModal={showModal} 
        openModal={openModal} 
        closeModal={closeModal}
      />
    </>
  );
}
 
export default Products;