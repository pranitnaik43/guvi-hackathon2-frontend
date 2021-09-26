import { useState, useEffect } from "react";
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    var url = "http://localhost:3001/"
    axios.get(url+"products").then(response => {
      console.log(response);
      if(response.data!==null && response.data!==undefined) {
        setProducts(response.data);
      }
    });
  }, []);

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
                  <button className="btn btn-primary"><i className="fa fa-shopping-cart" aria-hidden="true"></i></button>
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