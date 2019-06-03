import React from "react";
import Home from "./components/Home";
import Header from "./components/Header";
import Join from "./components/Join";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Join} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
