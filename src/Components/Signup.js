import axios from 'axios';
import { useState } from 'react';
import { info } from '../info';
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
toast.configure() 

const Signup = ({history}) => {
  const [data, setData] = useState(
    {
      name: "",
      email: "",
      password: "",
    }
  );

  const handleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(data.name==="" || data.email==="" || data.password===""){
      toast.error('Please fill all the details', {autoClose: 5000});
    } else {
      // console.log(data);
      var config = {
        method: 'post',
        url: info.SERVER_URL+"/auth/signup",
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      axios(config).then(response => {
        var message = JSON.stringify(response.data.message)
        if(message==="Signup Done") {
          toast.success(message, {autoClose: 5000});
          history.push("/home")
        } else {
          toast.error("Registration Failed:"+ message, {autoClose: 5000});
        }
        console.log();
      }).catch(function (error) {
        console.log(error);
      });
    }
  }
  return ( 
    <>
      {/* {console.log("DATA",data)} */}
      <form className="loginForm my-4 w-50 mx-auto">
        <div className="form-group">
          <label htmlFor="name" className="text-warning">Name</label>
          <input name="name" type="text" className="form-control" onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="email" className="text-warning">Email address</label>
          <input name="email" type="email" className="form-control" onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="password" className="text-warning">Password</label>
          <input name="password" type="password" className="form-control" onChange={handleChange}/>
        </div>
        <button type="submit" className="btn btn-primary" 
        onClick={ handleSubmit }>Submit</button>
      </form>
    </>
  );
}
 
export default Signup;