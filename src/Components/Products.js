import { useState, useEffect } from "react";
import axios from 'axios';
import { info } from "../info";

const Products = () => {
  const [products, setProducts] = useState([]);
  const isAdmin = true;
  let originalProducts = [];

  useEffect(() => {
    var config = {
      method: 'get',
      url: info.SERVER_URL+'/products',
      headers: { 
        'access-token': localStorage.getItem("accessToken")
      }
    };
    axios(config).then(response => {
      console.log(response);
      if(response.data!==null && response.data!==undefined) {
        originalProducts = response.data;
        originalProducts.forEach(element => {
          element.isAddedToCart = false;
          if(isAdmin){
            element.canEdit = false;
          }
        });
        setProducts(originalProducts);
      }
    });
  }, []);

  let addToCart = (product) => {
    
  }

  let removeFromCart = (id) => {

  }

  return ( 
    <>
      <div className="row row-cols-1 row-cols-lg-4 row-cols-md-3 row-cols-sm-2">
        { (products.length>0) ?
        (products.map(product => { 
          return (
            <div className="col mt-4" key={product._id}>
              <div className="card">
                <img src="https://place-hold.it/300x300/666" className="card-img" alt=""/>
                <div className="card-body d-flex justify-content-between">
                  <h5 className="card-text">{ product.name }</h5>
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