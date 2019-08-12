import React from 'react';
import TopNavBar from './components/top_nav_bar.react.js';
import { getUserFromCookie } from './UserID';

class MyAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : true,
      email : '',
      email_editable : false,
      user_name : '',
      user_name_editable : false,
      address : '',
      address_editable : false,
      phone : '',
      phone_editable : false,
      password : '',
      password_editable : false,
      register_date : '',
      active_status : '',
      last_active : '',
      paypal_account : '',
      seller_rep : '',
      buyer_rep : '',
    };

    const user = getUserFromCookie();
    if (user.id === null || user.id === '') {
      window.location.replace('/sign_in');
    } else {
      fetch(`http://localhost:4000/user?id=${user.id}`)
      .then(response => response.json())
      .then(user => {
      	this.setState(user[0]);
      	this.setState({ loading : false });
      });
    }
  }

  getRow(title, key, editable_key) {
    if (editable_key !== null && this.state[editable_key]) {
      	return (
		    <div>
		        <p>{title}:</p>
		        <input value={this.state[key]} onChange={(e) => {
		        	let state = {};
		      		state[key] = e.target.value;
		        	this.setState(state);
		       	}} />
		        <button onClick={() => {
		        	let state = {};
		      		state[editable_key] = false;
		        	this.setState(state)
		        	fetch(`http://localhost:4000/update_user?id=${getUserFromCookie().user_id}&column=${key}&value=${this.state[key]}`)
				      .then(console.log('update succeed'))
		        }}>
		          Save
		        </button>
		    </div>
		);
    } else {
    	return (
	    	<div>
	        	<p>{title}: {this.state[key]}</p>
	        	<button onClick={() => {
		        	let state = {};
		      		state[editable_key] = true;
		        	this.setState(state)
		        }}>
		        	Edit
		        </button>
	      	</div>
	    );
    }
  }

  getContent() {
  	return (
  	  <div>
  	  	{this.getRow('Email', 'email', 'email_editable')}
  	  	{this.getRow('User', 'user_name', 'user_name_editable')}
  	  	{this.getRow('Address', 'address', 'address_editable')}
  	  	{this.getRow('Phone', 'phone', 'phone_editable')}
  	  	{this.getRow('Register Date', 'register_date', null)}
  	  	{this.getRow('Active Status', 'active_status', null)}
  	  	{this.getRow('Last Active', 'last_active', null)}
  	  	{this.getRow('Paypal Account', 'paypal_account', null)}
		{this.getRow('Seller Reputation', 'seller_rep', null)}
		{this.getRow('Buyer Reputation', 'buyer_rep', null)}
        </div>
  	);
  }

  render() {

    return (
      <div>
      	<TopNavBar />
        <h1>My Account</h1>
		{this.state.loading ? <div>Loading...</div> : this.getContent()}
      </div>  
    );
  }
}

export default MyAccount;
