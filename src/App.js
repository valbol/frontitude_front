import React from 'react';

import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';

import Main from './components/Main';

const App = () => {

    return (

        <Router>
          <Main />
        </Router>
      
    );
};

export default App;
