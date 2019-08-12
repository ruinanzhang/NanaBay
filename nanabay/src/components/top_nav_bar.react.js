import React from 'react';
import {getUserFromCookie, unsetUserInCookie} from '../UserID';

const p1Style = {
  fontSize: '15px',
  textAlign: 'center',
  color : '#F7649D',
  fontfamily: 'Roboto Slab',
  margin:"8px",
  width : '10%',
  display : 'inline-flex',
  backgroundcolor: 'blue'

};

const p2Style = {
  fontSize: '20px',
  textAlign: 'center',
  color : '#F7649D',
  fontfamily: 'Roboto Slab',
  margin:"8px",
  width : '10%',
  display : 'inline-flex',
  backgroundcolor: 'blue'

};

class TopNavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  	const user = getUserFromCookie();
    return (
      	<div>
	      <div style={{'fontSize': '20px','color' : 'pink', 'backgroundcolor': 'blue'}}>
	      	<a href="/">
	      		<div style={p1Style}>Nanabay.com</div>
			</a>
			<a href="/likes">
				<div style={p1Style}>My Likes</div>
			</a>
			
			<a href="/bids">
				<div style={p1Style}>My Bids</div>
			</a>
			<a href="/sales">
				<div style={p1Style}>My Sales</div>
			</a>
			<a href="/sell">
				<div style={p1Style}>Sell</div>
			</a>
			<div>
			  {
			  	user.id === null || user.id === ''
			  	? <button onClick={() => {document.location.href = "/sign_in"} }>Login</button>
			  	: <div>
			  		<p>Hello {user.name}, welcome to Nanabay! </p>
			  		<a href="/account">
						<div style={p1Style}>My Account</div>
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