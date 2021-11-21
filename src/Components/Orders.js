import { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  var config = {
    method: 'GET',
    headers: { 
      'access-token': localStorage.getItem("accessToken")
    }
  };

  const getDate = (timestamp, prefix="") => {
    // return (typeof timestamp === typeof Date) ? (prefix + timestamp.toLocaleDateString()) : "";
    return timestamp;
  }

  useEffect(() => {
    //fetch orders
    config.url = process.env.REACT_APP_SERVER_URL+'/orders';
    (async () => {
      let response = await axios(config);
      if(response.data) {
        console.log(response.data);
        response.data.reverse();
        setOrders(response.data);
      }
    })();
    // eslint-disable-next-line
  }, []);

  return ( 
    <div className="container px-4 px-lg-5 my-5">
      <header>
        <h1 className=" text-primary text-center">Rented Products</h1>
      </header>
      <hr/>
      {
        (orders && orders.length>0) ? (
          <div className='row d-flex justify-content-center'>
            {
              orders.map(order => (
                <div className="col-12 col-md-10 col-lg-8" key={order._id}>
                  <div className="card mt-3">
                    <div className="card-header d-flex">
                      <div>{(order.timestamp) ? getDate(order.timestamp) : ('')}</div>
                      <div className="ml-auto">Total</div>
                    </div>
                      <ul className="list-group list-group-flush">
                        {
                          order.productDetails.map((product, index) => (
                            <li className="list-group-item" key={index}>
                              <span>{product.name}</span>
                            </li>
                          ))
                        }
                      </ul>
                  </div>
                </div>
              ))
            }
          </div>
        ) : (<h5 className="text-center text-info">Empty</h5>)
      }
    </div>
  );
}
 
export default Orders;

