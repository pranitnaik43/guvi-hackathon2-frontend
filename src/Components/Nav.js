import {NavLink, withRouter} from 'react-router-dom';

const Nav = () => {
  return ( 
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <NavLink className="nav-link" to="/home">Home</NavLink>
          <NavLink className="nav-link" to="/products">Products</NavLink>
          <NavLink className="nav-link" to="/contact">Contact Us</NavLink>
          <NavLink className="nav-link" to="/login">Login</NavLink>
          <NavLink className="nav-link" to="/signup">Register</NavLink>
          <NavLink className="nav-link" to="/cart">View Cart</NavLink>
        </ul>
      </div>
    </nav>
    </> 
  );
}
 
export default withRouter(Nav);