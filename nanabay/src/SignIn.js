import React from 'react';
import { setUserInCookie } from './UserID';

const p1Style = {
  fontSize: '25px',
  textAlign: 'center',
  color : 'pink',
  border: '2px solid pink',
  fontfamily: 'Roboto Slab',
  margin:"8px"

};

const p2style = {
  fontSize: '15px',
  textAlign: 'center',
  color : 'pink',
  fontfamily: 'Roboto Slab',
  margin : '10px 0px 0px 0p'
};

const p3style = {
  fontSize: '15px',
  textAlign: 'center',
  color : 'pink',
  fontfamily: 'Roboto Slab',
  margin : '10px 0px 0px 0p'
};

const formstyle = {
  padding: '12px 12px',
  margin: '10px 510px 10px 510px',
  border: '2px solid pink',
  backgroundcolor: '#3CBC8D',
  textAlign: 'center'
};

class SignIn extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      username: '',
      password : '',
      login_in_progress : false,
      error : false,
    }
  }

  render() {
    return (
      
      <div>
        <div style = {p1Style}> 
          <p></p>
          Welcome to Nanabay.com, please login use your username and password! :)
          <p></p>
        </div>
        {

          this.state.error
          ? <p style={{ color : '#FF0000'}}>Cannot find matching username/password</p>
          : null
        }
      
        <p style = {p2style}>Username:</p>
        <input style = {formstyle} onChange={ (e) => this.setState({ username: e.target.value }) }></input>
        <p style = {p2style}>Password:</p>
        <input style = {formstyle} onChange={ (e) => this.setState({ password: e.target.value }) }></input>
        <button style = {formstyle} onClick={() => {
          this.setState({
            login_in_progress : true,
            error : false,
          });
          fetch(`http://localhost:4000/login?username=${this.state.username}&password=${this.state.password}`)
            .then(response => response.json())
            .then(user_ids => {
              this.setState({ login_in_progress : false });
              if (user_ids.length > 0) {
                setUserInCookie(user_ids[0].user_id, this.state.username);
                window.location.href = '/';
              } else {
                this.setState({ error : true });
              }
            });
        }}>
          Login
        </button>
        <button style = {formstyle} onClick={() => {
          window.location.href = "/sign_up";
        }}>
          Sign Up
        </button>
        {
          this.state.login_in_progress
          ? <p style = { p3style}> Logging in...</p>
          : null
        }
      </div>
    );
  }
}

export default SignIn;
