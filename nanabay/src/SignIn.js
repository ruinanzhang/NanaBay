import React from 'react';
import { setUserInCookie } from './UserID';

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
        {
          this.state.error
          ? <p style={{ color : '#FF0000'}}>Cannot find matching username/password</p>
          : null
        }
        <p>Username:</p>
        <input onChange={ (e) => this.setState({ username: e.target.value }) }></input>
        <p>Password:</p>
        <input onChange={ (e) => this.setState({ password: e.target.value }) }></input>
        <button onClick={() => {
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
        <button onClick={() => {
          window.location.href = "/sign_up";
        }}>
          Sign Up
        </button>
        {
          this.state.login_in_progress
          ? <p>Logging in...</p>
          : null
        }
      </div>
    );
  }
}

export default SignIn;
