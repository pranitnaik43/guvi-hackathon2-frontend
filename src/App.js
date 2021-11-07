import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "./store";
import './App.css';
import Nav from './Components/Nav';
import Products from './Components/Products';
import Home from './Components/Home';
import Cart from './Components/Cart';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <h1 className="logo m-2">EquipNow</h1>
        <Nav/>
        <div className="container-fluid">
          <Switch>
          <Route exact path="/home" component={Home}></Route>
            <Route path="/products" component={Products}></Route>
            <Route path="/products/:id" component={Products}></Route>
            <Route path="/cart" component={Cart}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/signup" component={Signup}></Route>
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>
          </Switch>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
