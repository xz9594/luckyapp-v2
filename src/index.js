import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route } from 'react-router-dom';
import Luru from './Luru';
import Choujiang from './Choujiang';

class App extends Component {
  render() {
    return (
      <div>
          {this.props.children}
      </div>
    );
  }
}

ReactDOM.render(
  (<HashRouter>
    <App>
        <Route exact path="/" component={Luru} />
        <Route exact path="/choujiang" component={Choujiang} />
    </App>
  </HashRouter>),
  document.getElementById('root')
);
