import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    var accessToken = localStorage.getItem('accessToken');
    var userId = localStorage.getItem('userId');
    var isAdmin = localStorage.getItem('isAdmin');
    console.log(accessToken)
    console.log(userId,isAdmin);
  },[]);
  return ( <></> );
}
 
export default Home;