// Imports the default export from the react package
import React, {useState} from 'react';
// Imports only the render method exported from the reactDOM package
import {render} from 'react-dom';
import SearchParams from './SearchParams';
// Import Reach Router and also the second page
import {Router, Link} from '@reach/router';
import Details from './Details';
import ThemeContext from './ThemeContext';

const App = () => {
  // Create a hook to pass in to ThemeContext.
  // BTW, it doesn't have to be a hook. Could be anything, like just a config
  // object.
  const themeHook = useState('peru');
  return (
    <React.StrictMode>
      <ThemeContext.Provider value={themeHook}>
        {/* Now, everything inside here has available, as a global app state, this themeHook */}
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
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};

render(<App />, document.getElementById('root'));
