// Imports the default export from the react package
import React from "react";
// Imports only the render method exported from the reactDOM package
import { render } from "react-dom";
import SearchParams from "./SearchParams";
// Import Reach Router and also the second page
import { Router, Link } from "@reach/router";
import Details from "./Details";

const App = () => {
  return (
    <React.StrictMode>
      <div>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <Router>
          {/* Reach Router uses a scoring system to choose the route that matches *the best*.
          So, order does not matter (very much)*/}
          <SearchParams path="/" />
          <Details path="/details/:id" />
        </Router>
      </div>
    </React.StrictMode>
  );
};

render(<App />, document.getElementById("root"));
