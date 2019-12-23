import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
const fetch = require('node-fetch');

const loginAPIAddress = `https://flask.powerflexsystems.com/`;
// Will need to put the API address in a constant file and export that

// Consider to get a loader for the state

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    loginAttempted: false,
    isLoggedIn: false,
    token: '' ,
    allowAddFunds: false,
    isDebugger: false,
    paymentExempt: false,
    pfDriverAdmin: false,
    // Probably not the most secure way to do but
    // for this implementation, we will go with it
  }

  changeUserNameState = (event) => {
    this.setState({
      username: event.target.value
    })
  }

  changePasswordState = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  attemptLogin = async () => {
    let loginResponse = await fetch(loginAPIAddress, {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: this.state.username, // @powerflex.com
            password: this.state.password // ''
        }
      )
    })
    loginResponse = await loginResponse.json();
    if(loginResponse.msg === `Bad email or password`){
      // Put the string in a const file in the future
      this.setState({
        loginAttempted: true
      })
      return;
    }
    this.setState({
      isLoggedIn: true,
      token: loginResponse.access_token,
      allowAddFunds: loginResponse.allow_add_funds,
      isDebugger: loginResponse.is_debugger,
      paymentExempt: loginResponse.payment_exempt,
      pfDriverAdmin: loginResponse.pf_driver_admin,
    })
  }

  render(){
    const {username, password} = this.state;
    return(
        <div className='login'>
          <input
            placeholder='example@example.com'
            value={username}
            type='text'
            onChange={e => this.changeUserNameState(e)}
          />
          <input
            type='password'
            placeholder='Enter your password'
            value={password}
            onChange={e => this.changePasswordState(e)}
          />
          <button
            onClick={this.attemptLogin}
          >Submit</button>
          {this.state.loginAttempted && <p>Bad email or password</p>}
          {this.state.isLoggedIn && <Redirect to={{
            pathname: '/mainpage',
            state: {
              isLoggedIn: this.state.isLoggedIn,
              token: this.state.token,
              allowedAddFunds: this.state.allowAddFunds,
              isDebugger: this.state.isDebugger,
              paymentExempt: this.state.paymentExempt,
              pfDriverAdmin: this.state.pfDriverAdmin,
            }
          }}
          />}
      </div>
    )
  }
}

export default LoginPage;
