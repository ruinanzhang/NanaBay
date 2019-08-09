import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import MyAccount from './MyAccount';
import MyLikes from './MyLikes';
import MyOrders from './MyOrders';
import MyBids from './MyBids';
import MySales from './MySales';
import Item from './Item';
import Sell from './Sell';
import SellerItem from './SellerItem';
import SearchResults from './SearchResults';
import SignIn from './SignIn';
import SignUp from './SignUp';
import TopNavBar from './components/top_nav_bar.react.js';
import { getUserFromCookie } from './UserID';

const App = () => (
  <BrowserRouter>
    <div>
      <Route exact path='/' component={Home} />
      <Route path='/account' component={MyAccount} />
      <Route path='/likes' component={MyLikes} />
      <Route path='/orders' component={MyOrders} />
      <Route path='/bids' component={MyBids} />
      <Route path='/sales' component={MySales} />
      <Route path='/item/:id' component={Item} />
      <Route path='/sell' component={Sell} />
      <Route path='/seller_item/:id' component={SellerItem} />
      <Route path='/search/:query' component={SearchResults} />
      <Route path='/sign_in' component={SignIn} />
      <Route path='/sign_up' component={SignUp} />
    </div>
  </BrowserRouter>
)


class Home extends React.Component {
  constructor(props) {
    super(props);

    const user = getUserFromCookie();
    if (user.id === null || user.id === '') {
      window.location.replace('/sign_in');
    }
  }

  render() {
    return (
      <div>
        <TopNavBar />
        <h1>Main Page</h1>
      </div>
    );
  }
}
export default App;
