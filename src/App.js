import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connect, Provider} from 'react-redux';
import { store } from './redux/store';
import './App.css';

import View from './component/view/view'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div className="App">
      
      {/* <View/> */}
      <BrowserRouter basename="/admin">
       {/* <BrowserRouter> */}
            <Route path={`/`} component={View} />
        </BrowserRouter>
      </div>
      </Provider>
    );
  }
}

export default App;
