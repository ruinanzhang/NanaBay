import React from 'react';
import TopNavBar from './components/top_nav_bar.react.js';
import { getUserFromCookie } from './UserID';

class MySales extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : true,
      sales : [],
    };

    const user = getUserFromCookie();
    if (user.id === null || user.id === '') {
      window.location.replace('/sign_in');
    } else {
      fetch(`http://localhost:4000/sales?id=${user.id}`)
      .then(response => response.json())
      .then(sales => {
        console.log(sales);
        this.setState({ sales : sales });
        this.setState({ loading : false });
      });
    }
  }

  render() {
    let items = [];
    for (let i = 0; i < this.state.sales.length; i++) {
      items.push(
        <a href={`/seller_item/${this.state.sales[i].item_id}`}>
          <div style={{ 'background-color' : '#EEEEEE' }}>
            <p>{this.state.sales[i].description}</p>

            <p>
            Status:
            {
              Date.now() < (new Date(this.state.sales[i].auction_start_time)).getTime()
              ? 'The sell is not started !!'
              : (
                Date.now() >= (new Date(this.state.sales[i].auction_end_time)).getTime()
                ? 'The sell is finished !!'
                : 'The sell is in progress'
              )
            }
            </p>
            <p>Buyer: {this.state.sales[i].buyer_name}</p>
            <p>Latest bid: {this.state.sales[i].latest_bid}</p>
            <p>Item ID: {this.state.sales[i].item_id}</p>
          </div>
        </a>
      );
    }
    
    return (
      <div>
        <TopNavBar />
        <h1>My Sales</h1>
        {
          this.state.loading
          ? <p>Loading...</p>
          : items
        }
      </div>
    );
  }
}

export default MySales;