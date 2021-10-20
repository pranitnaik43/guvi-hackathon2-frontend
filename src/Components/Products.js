import { useState, useEffect } from "react";
import axios from 'axios';
import { info } from "../info";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  var config = {
    method: 'GET',
    url: info.SERVER_URL+'/products',
    headers: { 
      'access-token': localStorage.getItem("accessToken")
    }
  };
  useEffect(() => {
    let myCartProducts = [];

    //fetch cart products
    config.method = "GET"; 
    config.url = info.SERVER_URL+'/cart';
    axios(config).then(response => {
      if(response.data) {
        myCartProducts =  response.data;
        console.log("cart", myCartProducts);
      }

      //fetch products
      config.url = info.SERVER_URL+'/products';
      return axios(config);
    }).then(response => {
      console.log(response);
      if(response.data) {
        let originalProducts = response.data;
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
  }, []);

  let addToCart = (productId) => {
    config.method = "POST";
    config.url = info.SERVER_URL+'/cart';
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
    config.url = info.SERVER_URL+'/cart';
    config.data = JSON.stringify({ "productId": productId });

    setCartProducts([...cartProducts.filter(value => (value!==productId))]);
    setProducts([...products.map(product => { 
      if (product._id === productId)
        product.isAddedToCart = false;
      return product;
    })]);
  }

  return ( 
    <>
      <div className="row row-cols-1 row-cols-lg-4 row-cols-md-3 row-cols-sm-2">
        { (products.length>0) ?
        (products.map(product => { 
          return (
            <div className="col my-4" key={product._id}>
              <div className="card">
                <img src="https://place-hold.it/300x300/666" className="card-img" alt=""/>
                <div className="card-body">
                  <div className="d-flex justify-content-around">
                  <h5 className="text-truncate" title={ product.name }>{ product.name }</h5>
                  <small>{ "₹" + product.price }</small>
                  </div>
                  {
                    (!product.isAddedToCart) ? (
                      <button className="btn btn-primary" 
                      onClick={ () => { addToCart(product); product.isAddedToCart=true; }}>
                      Add to Cart<i className="fa fa-shopping-cart" aria-hidden="true"></i></button>
                    ) : (
                      <button className="btn btn-danger" 
                      onClick={ () => { removeFromCart(product); product.isAddedToCart=false; }}>
                      Remove from Cart</button>
                    )
                  }
                </div>
              </div> 
            </div>
          )})
        ) : 
        ( <p className="text-center">There are no products</p> ) }
      </div>
    </>
  );
}
 
export default Products;