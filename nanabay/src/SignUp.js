import React from 'react';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '',
                   username: '',
                   address : '',
                   paypal_account : '',
                   phone: '',
                   password: '',
                   show_error: false}
  }

  validate(input) {
    return input.length > 0; 
  }

  render() {
    return (
      <div>
      <h1>Sign Up</h1> 
        <div>
          {this.state.show_error ? <p style={{ color : '#FF0000' }}>Some of the fields are not filled in correctly</p> : null}
          <p>Email:</p>
          <input onChange={ (e) => this.setState({ email: e.target.value }) }></input>
          <p>Username:</p>
          <input onChange={ (e) => this.setState({ username: e.target.value }) }></input>
          <p>Address:</p>
          <input onChange={ (e) => this.setState({ address: e.target.value }) }></input>
          <p>Phone:</p>
          <input onChange={ (e) => this.setState({ phone: e.target.value }) }></input>
          <p>Paypal account:</p>
          <input onChange={ (e) => this.setState({ paypal_account: e.target.value }) }></input>
          <p>Password:</p>
          <input onChange={ (e) => this.setState({ password: e.target.value }) }></input>
          <button onClick={() => {
            if (!this.validate(this.state.email) ||!this.validate(this.state.username) || !this.validate(this.state.address) || !this.validate(this.state.phone) || !this.validate(this.state.paypal_account) || !this.validate(this.state.password)) {
              this.setState( { show_error : true });
              return;
            } else {
              this.setState( { show_error : false });
              fetch(`http://localhost:4000/add_user?user_id=${Math.floor(Math.random() * 100000000)}&email=${this.state.email}&username=${this.state.username}&address=${this.state.address}&phone=${this.state.phone}&register_date=${new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ')}&last_active=${new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ')}&paypal_account=${this.state.paypal_account}&seller_rep=123&buyer_rep=123&password=${this.state.password}`)
                .then(window.location.href = 'sign_in');
            }
          }}>
            Submit
          </button>
        </div>
      </div>

    );
  }
}

export default SignUp;
