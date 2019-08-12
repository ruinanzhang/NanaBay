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



const p1Style = {
  fontSize: '25px',
  textAlign: 'center',
  color : '#F7649D',
  fontfamily: 'Roboto Slab',
  margin:"8px",
  border: '2px solid pink',
  width : '100%'
};

const p2Style = {
  fontSize: '15px',
  textAlign: 'center',
  color : 'pink',
  fontfamily: 'Roboto Slab',
  margin:"8px",
  width : '100%'
};



const formstyle = {
  padding: '12px 12px',
  margin: '10px 510px 10px 510px',
  border: '2px solid pink',
  backgroundcolor: '#3CBC8D',
  textAlign: 'center'
};

class Home extends React.Component {
  constructor(props) {
    super(props);

    const user = getUserFromCookie();
    if (user.id === null || user.id === '') {
      window.location.replace('/sign_in');
    }

    this.state = {
      search_query : '',
      search_history_loading : true,
      search_history : [],
    };

    fetch(`http://localhost:4000/search_history?user_id=${user.id}`)
      .then(response => response.json())
      .then(history => {
        console.log(history);
        this.setState({
          search_history : history,
          search_history_loading : false,
        });
      });
  }

  render() {
    let search_history = [];
    for (var i = 0; i < this.state.search_history.length; i++) {
      search_history.push(
        <p>{this.state.search_history[i].filter_used}</p>
      );
    }

    return (
      <div>
        <TopNavBar />
        <p> </p>
        <p> </p>
        <div style = {{'fontSize': "25px",'color': "#F7649D", 'textAlign': "center", 'backgroundColor': "#FAEBF3"}}>Main Page</div>
        <div style = {{'color' : 'pink', 'textAlign' : 'center'}}>
          <p style = {{'margin' : "30px 20px"}}></p>
          <div styel = {p2Style}> What do you want to search today?</div>
          <p style = {{'margin' : "30px 20px"}}></p>
          <input style = {formstyle} placeholder="search category..." value={this.state.search_query} onChange={(e) => {
            this.setState({ search_query : e.target.value });
          }} />
          <button onClick={() => {
            fetch(`http://localhost:4000/add_search_history?user_id=${getUserFromCookie().id}&search_time=${new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ')}&filter_used=${this.state.search_query}`)
              .then(window.location.href = `/search/${this.state.search_query}`)
          }}>
            Search
          </button>
        </div>
        <p style = {{'margin' : "30px 20px"}}></p>
        <div style = {{'color' : "#80E4F8", 'textAlign':"center", 'backgroundColor': "#E8F5F6"}}>
          <div style = {p2Style}>Your search history :</div>
          {
            this.state.search_history_loading
            ? <p>Loading...</p>
            : search_history
          }
        </div>
      </div>
    );
  }
}
export default App;
