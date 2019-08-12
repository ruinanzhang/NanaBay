import React from 'react';
import TopNavBar from './components/top_nav_bar.react.js';
import { getUserFromCookie } from './UserID';

class MyBids extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : true,
      bids : [],
    };

    const user = getUserFromCookie();
    if (user.id === null || user.id === '') {
      window.location.replace('/sign_in');
    } else {
      fetch(`http://localhost:4000/bids?id=${user.id}`)
      .then(response => response.json())
      .then(bids => {
        console.log(bids);
        this.setState({ bids : bids });
        this.setState({ loading : false });
      });
    }
  }

  render() {
    let items = [];
    for (let i = 0; i < this.state.bids.length; i++) {
      items.push(
        <a href={`/item/${this.state.bids[i].item_id}`}>
          <div style= {{'fontfamily': "Roboto Slab", 'fontSize': "15px", 'textAlign': "center", 'color': "#4CAAF0", 'backgroundColor' : "#FCEAF2 "}}>
            <img src={this.state.bids[i].pic_url} />
            <p>{this.state.bids[i].description}</p>
            <p>Seller: {this.state.bids[i].seller_name}</p>
            <p>Bid: {this.state.bids[i].bid}</p>
            <p>Minimum accept price: {this.state.bids[i].min_accept_price}</p>
            <p>Start time: {this.state.bids[i].start_time}</p>
            <p>End time: {this.state.bids[i].end_time}</p>
            <p>Bid time: {this.state.bids[i].my_bid_time}</p>
            <p>Item ID: {this.state.bids[i].item_id}</p>
            <p>Auction ID: {this.state.bids[i].auction_id}</p>
          </div>
        </a>
      );
    }
    
    return (
      <div>
        <TopNavBar />
        <h1 style = {{ 'fontSize': "25px",'textAlign': "center", 'fontfamily': "Roboto Slab", 'margin':"8px",'color' : "#4CAAF0"}}>My Bids</h1>
        {
          this.state.loading
          ? <p>Loading</p>
          : items
        }
      </div>
    );
  }
}

export default MyBids;