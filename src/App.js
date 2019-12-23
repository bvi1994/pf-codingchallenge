import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom'
import './App.css';
import LoginPage from './components/loginPage/loginComponent/loginPage';
import MainPage from './components/mainPage/mainPageComponent/mainPage.js';

class App extends Component {
  render(){
    return (
      <Switch>
        <LoginPage
          exact path='/'
        />
        <MainPage
          exact path='/mainPage'
        />
      </Switch>
    );
  }
}

export default App;
