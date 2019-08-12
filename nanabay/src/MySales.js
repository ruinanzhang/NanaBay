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
          <div style={{ 'color' : "#4CAAF0", 'textAlign':"center", 'backgroundColor': "#E8F5F6" }}>
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
            <p> Click here to see the top 3 bids! </p>
            <p>Item ID: {this.state.sales[i].item_id}</p>
          </div>
        </a>
      );
    }
    
    return (
      <div>
        <TopNavBar />
        <h1 style = {{ 'fontSize': "25px",'textAlign': "center", 'fontfamily': "Roboto Slab", 'margin':"8px",'color' : "#4CAAF0"}}>My Sales</h1>
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