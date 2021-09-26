import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Nav from './Components/Nav';
import Products from './Components/Products';
import Home from './Components/Home';

function App() {
  return (
    <BrowserRouter>
      <h1 className="logo m-2">EquipNow</h1>
      <Nav/>
      <div className="container-fluid">
        <Switch>
        <Route exact path="/home" component={Home}></Route>
          <Route path="/products" component={Products}></Route>
          <Route path="/products/:id" component={Products}></Route>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
