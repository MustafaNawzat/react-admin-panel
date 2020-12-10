import Stores from "./components/Stores";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Store from "./components/Store";
import Navigation from "./components/Navigation";
import Products from "./components/Products";

function App() {

  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/">
          <Stores />
        </Route>
        <Route exact path="/store/:id" component={(props) => <Store  {...props} />} />
        <Route path="/store/:id/:id" component={(props) => <Products  {...props} />} />
      </Switch>
    </Router>
  );
}

export default App;
