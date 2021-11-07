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
    let myCartProducts = [];

    //fetch cart products
    config.method = "GET"; 
    config.url = process.env.REACT_APP_SERVER_URL+'/cart';
    axios(config).then(response => {
      if(response.data) {
        myCartProducts =  (response.data) ? (response.data) : [];
        console.log("cart", myCartProducts);
      }

      //fetch products
      config.url = process.env.REACT_APP_SERVER_URL+'/products';
      return axios(config);
    }).then(response => {
      // console.log(response);
      if(response.data) {
        let originalProducts = response.data;
        // console.log(originalProducts);
        originalProducts.forEach(element => {
          if(myCartProducts.includes(element.id))
            element.isAddedToCart = true;
          else 
            element.isAddedToCart = false;
        });
        setCartProducts(myCartProducts);
        setProducts(originalProducts);
      }
    });
    // eslint-disable-next-line
  }, []);  

  let addToCart = (productId) => {
    config.method = "POST";
    config.url = process.env.REACT_APP_SERVER_URL+'/cart';
    config.data = JSON.stringify({ "productId": productId });

    setCartProducts([...cartProducts, productId]);
    setProducts([...products.map(product => { 
      if (product._id === productId)
        product.isAddedToCart = true;
      return product;
    })]);
  }

  let removeFromCart = (productId) => {
    config.method = "POST";
    config.url = process.env.REACT_APP_SERVER_URL+'/cart';
    config.data = JSON.stringify({ "productId": productId });

    setCartProducts([...cartProducts.filter(value => (value!==productId))]);
    setProducts([...products.map(product => { 
      if (product._id === productId)
        product.isAddedToCart = false;
      return product;
    })]);
  }

  const openModal = () => {
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }

  return ( 
    <>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 m-5">
        { (products.length>0) ?
        (products.map(product => { 
          return (
            <div className="col my-4" key={product._id}>
              <Product product={product} addToCart={addToCart} removeFromCart={removeFromCart} />
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