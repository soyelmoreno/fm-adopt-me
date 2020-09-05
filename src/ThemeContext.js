import {createContext} from 'react';

// Example of why you might want to use context: user login data. Without
// context, you might put that global info in App and pass it down to every
// child, potentially in many children and down multiple levels. This is called
// "prop-drilling" and it can be burdensome and annoying. Can solve this with
// Redux. But Redux is hard and often overkill. Context is new to React, and we
// can use it for this. Can load info into a data store that your entire React
// application can use and update. But now, instead of everything being
// explicit, things have implicit dependencies.

// For this example, we'll make a theme for our application.
// Give it a hook. State and updater (placeholders for now)
const ThemeContext = createContext(['green', () => {}]);

export default ThemeContext;
