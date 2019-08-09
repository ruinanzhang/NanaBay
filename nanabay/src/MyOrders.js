import React from 'react';
import TopNavBar from './components/top_nav_bar.react.js';
import { getUserFromCookie } from './UserID';

class MyOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : true,
      orders : [],
    };

    const user = getUserFromCookie();
    if (user.id === null || user.id === '') {
      window.location.replace('/sign_in');
    } else {
      fetch(`http://localhost:4000/orders?id=${user.id}`)
      .then(response => response.json())
      .then(orders => {
        this.setState({ orders : orders });
        this.setState({ loading : false });
      });
    }
  }

  render() {
    let items = [];
    for (let i = 0; i < this.state.orders.length; i++) {
      items.push(
        <a href={`/item/${this.state.orders[i].item_id}`}>
          <div style={{ 'background-color' : '#EEEEEE' }}>
            <img src={this.state.orders[i].pic_url} />
            <p>Seller: {this.state.orders[i].seller_name}</p>
            <p>{this.state.orders[i].description}</p>
            <p>Price: {this.state.orders[i].price}</p>
            <p>Category: {this.state.orders[i].category}</p>
            <p>Item ID: {this.state.orders[i].item_id}</p>
            <p>Auction ID: {this.state.orders[i].auction_id}</p>
          </div>
        </a>
      );
    }
    
    return (
      <div>
        <TopNavBar />
        <h1>My Orders</h1>
        {
          this.state.loading
          ? <p>Loading</p>
          : {items}
        }
      </div>
    );
  }
}

export default MyOrders;