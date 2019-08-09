import React from 'react';
import {getUserFromCookie, unsetUserInCookie} from '../UserID';

class TopNavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  	const user = getUserFromCookie();
    return (
      	<div>
	      <div style={{'width' : '100%', 'backgroundColor': 'grey', 'display': 'inline-flex'}}>
	      	<a href="/">
	      		<div style={{color : 'blue'}}>Nanabay.com</div>
			</a>
			<a href="/likes">
				<div>My Likes</div>
			</a>
			<a href="/orders">
				<div>My Orders</div>
			</a>
			<a href="/bids">
				<div>My Bids</div>
			</a>
			<a href="/sales">
				<div>My Sales</div>
			</a>
			<a href="/sell">
				<div>Sell</div>
			</a>
			<div>
			  {
			  	user.id === null || user.id === ''
			  	? <button onClick={() => {document.location.href = "/sign_in"} }>Login</button>
			  	: <div>
			  		<p>Hello {user.name}</p>
			  		<a href="/account">
						<div>My Account</div>
					</a>
					<button onClick={() => {unsetUserInCookie(); document.location.reload();} }>Logout</button>
				  </div>
			  }
			</div>
	      </div>
	    </div>
     );
  } 
}

export default TopNavBar;