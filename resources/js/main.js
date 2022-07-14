import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';


import Main from './components/MainComponent';

// if (document.getElementById('employeeApp')) {
//     ReactDOM.render(<App />, document.getElementById('employeeApp'));
// }

ReactDOM.render((
    <BrowserRouter basename="/">  {/* Basename gets the base url for when you reload (404 kung hindi sa basename)*/}
      <Main /> { /* The various pages will be displayed by the `Main` component. */}
    </BrowserRouter>
    ), document.getElementById('mainApp')
  );