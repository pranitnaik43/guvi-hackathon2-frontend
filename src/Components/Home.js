import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    var accessToken = localStorage.getItem('accessToken');
    var userId = localStorage.getItem('userId');
    var isAdmin = localStorage.getItem('isAdmin');
  },[]);
  return ( <></> );
}
 
export default Home;