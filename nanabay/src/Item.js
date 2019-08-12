import React from 'react';
import TopNavBar from './components/top_nav_bar.react.js';
import { getUserFromCookie } from './UserID';

const formstyle = {
  padding: '12px 12px',
  border: '2px solid pink',
  backgroundcolor: '#3CBC8D',
  textAlign: 'center',

};



class MyItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : true,
      item : null,
      bid : 0,
    };

    const user = getUserFromCookie();
    // if (user.id === null || user.id === '') {
    //   window.location.replace('/sign_in');
    // }

    fetch(`http://localhost:4000/item?id=${this.props.match.params.id}`)
      .then(response => response.json())
      .then(items => {
        console.log(items);
        this.setState({ item : items[0] });
        this.setState({ loading : false });
      });
  }



  render() {
    if (this.state.loading) {
      return <p style = {{'fontfamily': "Roboto Slab", 'fontSize': "15px", 'textAlign': "center", 'color': "pink"}}>Loading</p>;
    }
    
    return (
      <div >
        <TopNavBar />
        <div style = {{'fontfamily': "Roboto Slab", 'fontSize': "20px", 'textAlign': "center", 'color': "#4CAAF0"}}>{this.state.item.description}</div>
        <p> </p>
        <div style = {{'fontfamily': "Roboto Slab", 'fontSize': "15px", 'textAlign': "center", 'color': "pink"}}> Below are all info about this item:</div>
        <p> </p>
        <div style = {{'fontfamily': "Roboto Slab", 'fontSize': "15px", 'textAlign': "center", 'color': "#4CAAF0", 'backgroundColor' : "#B8D9F2"}}>
          

          <p>Seller: {this.state.item.seller_name}</p>
          <p>Seller reputation: {this.state.item.seller_rep}</p>
          <p>Category: {this.state.item.category}</p>
          <p>Condition: {this.state.item.condition}</p>
          <p>Seller reputation: {this.state.item.seller_rep}</p>
          <p>Minimum bid accept price: {this.state.item.min_bid_accept_price}</p>
          <p>Auction start time: {this.state.item.auction_start_time}</p>
          <p>Auction end time: {this.state.item.auction_end_time}</p>
          <p>Item ID: {this.state.item.item_id}</p>
          <p>Auction ID: {this.state.item.auction_id}</p>

        </div>
        <div style = {{'textAlign': "center"}}>
          <button style = {{'textAlign': "center", 'borderRadius': "12px", 'backgroundColor' : "#F5D8E6  ", 'color':"#0694FC ", 'fontSize': "20px"}}onClick={() => {
            fetch(`http://localhost:4000/like?user_id=${getUserFromCookie().id}&item_id=${this.state.item.item_id}`);
          }}>
            Like
          </button>
        </div>
        <div>
          <h2 style = {{'fontfamily': "Roboto Slab", 'fontSize': "20px", 'textAlign': "center", 'color': "#4CAAF0"}}>Bid</h2>
          <p style = {{'fontfamily': "Roboto Slab", 'fontSize': "20px", 'textAlign': "center", 'color': "#4CAAF0"}}>Notice: your bid amout must bigger than last bid amout showing above!!</p>
          <div style = {{'textAlign': "center"}}>
          <input style = {formstyle} placeholder="How much you would like to pay?..." value={this.state.bid} onChange={(e) => {
            this.setState({ bid : e.target.value });
          }} />
          </div>
          <p> </p>
          <div style = {{'textAlign': "center"}}>
          <button style = {{'textAlign': "center", 'borderRadius': "12px", 'backgroundColor' : "#F5D8E6  ", 'color':"#0694FC ", 'fontSize': "20px"}} onClick={() => {
            fetch(`http://localhost:4000/add_bid?auction_id=${this.state.item.auction_id}&item_id=${this.state.item.item_id}&buyer_id=${getUserFromCookie().id}&bid=${this.state.bid}&bid_time=${new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ')}`)
            .then(window.location.href = '/bids');
          }}>
            Submit Bid
          </button>
          </div>
        </div>
      </div>
    );
  }
}

export default MyItem;