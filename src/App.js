import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'

import './App.css';
import Catalogue from './components/Catalogue'
import Header from './components/Header'
import MonPotager from './components/MonPotager';
import Login from './components/Login';

class App extends Component {
  state = {
    email: localStorage.getItem('email') || ''
  }

  render() {
    return (
      <div className="App container">
        <BrowserRouter>
          <Header email= {this.state.email}></Header>

          <div className="App row">
            <Route path="/cataloguePlant" exact render={() =>
              <Catalogue />
            } />
            <Route path="/potagerPlants" exact render={() =>
              <MonPotager />
            } />
            <Route path="/login" exact render={() =>
              <Login />
            } />
            <Route exact={true} path="/logout" 
                  render={(props)=>{
                        localStorage.clear();
                        return <MonPotager />;
            }} />
          </div>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
