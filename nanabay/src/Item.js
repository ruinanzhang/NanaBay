import React from 'react';
import TopNavBar from './components/top_nav_bar.react.js';

class MyItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : true,
      item : null,
      bid : 0,
    };

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
      return <p>Loading</p>;
    }
    
    return (
      <div>
        <TopNavBar />
        <h1>{this.state.item.description}</h1>
        <div style={{ 'background-color' : '#EEEEEE' }}>
          <img src={this.state.item.pic_url} />
          <p>Seller: {this.state.item.seller_name}</p>
          <p>Seller reputation: {this.state.item.seller_rep}</p>
          <p>Category: {this.state.item.category}</p>
          <p>Condition: {this.state.item.condition}</p>
          <p>Seller reputation: {this.state.item.seller_rep}</p>
          <p>Price: {this.state.item.price}</p>
          <p>Minimum bid accept price: {this.state.item.min_bid_accept_price}</p>
          <p>Auction start time: {this.state.item.auction_start_time}</p>
          <p>Auction end time: {this.state.item.auction_end_time}</p>
          <p>Item ID: {this.state.item.item_id}</p>
          <p>Auction ID: {this.state.item.auction_id}</p>
        </div>
        <div>
          <h2>Bid</h2>
          <input value={this.state.bid} onChange={(e) => {
            this.setState({ bid : e.target.value });
          }} />
          <button onClick={() => {
            fetch(`http://localhost:4000/add_bid?auction_id=${this.state.item.auction_id}&item_id=${this.state.item.item_id}&buyer_id=1&bid=${this.state.bid}&bid_time=${new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ')}`)
            .then(window.location.href = '/bids');
          }}>
            Submit Bid
          </button>
        </div>
      </div>
    );
  }
}

export default MyItem;