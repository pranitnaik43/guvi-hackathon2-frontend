import axios from 'axios';
import { useState } from 'react';
import { info } from '../info';
import {toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
toast.configure() 

const Login = ({history}) => {
  const [data, setData] = useState(
    {
      email: "",
      password: "",
    }
  );

  const handleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(data.email==="" || data.password===""){
      toast.error('Please fill all the details', {autoClose: 5000});
    } else {
      // console.log(data);
      var config = {
        method: 'post',
        url: info.SERVER_URL+"/auth/signin",
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      axios(config).then(response => {
        var message = JSON.stringify(response.data.message)
        var accessToken = response.data.accessToken;
        if(accessToken!==null) {
          toast.success("Login Successful", {autoClose: 5000});
          localStorage.setItem('accessToken', accessToken);
          history.push("/home")
        } else {
          toast.error("Registration Failed:"+ message, {autoClose: 5000});
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
  }
  return ( 
    <>
    {/* {console.log(data)} */}
      <form className="loginForm my-4 w-50 mx-auto">
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
 
export default Login;