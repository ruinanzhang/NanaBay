import React from 'react';
import TopNavBar from './components/top_nav_bar.react.js';

class SellerItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : true,
      items : [],
    };

    fetch(`http://localhost:4000/seller_item?id=${this.props.match.params.id}`)
      .then(response => response.json())
      .then(items => {
        console.log(items);
        this.setState({ items : items });
        this.setState({ loading : false });
      });
  }

  render() {
    let history = [];
    for (let i = 0; i < this.state.items.length; i++) {
      history.push(
        <div style={{ 'color' : "#4CAAF0", 'textAlign':"center", 'backgroundColor': "#E8F5F6" }}>
          <p>Buyer name: {this.state.items[i].buyer_name}</p>
          <p>Buyer reputation: {this.state.items[i].buyer_reputation}</p>
          <p>Bid amount: {this.state.items[i].bid_amount}</p>
        </div>
      );
    }

    return (
      <div>
        <TopNavBar />
        {
          this.state.loading
          ? <p>Loading</p>
          : <div>
              <h1 style = {{ 'fontSize': "25px",'textAlign': "center", 'fontfamily': "Roboto Slab", 'margin':"8px",'color' : "#4CAAF0"}}>Top 3 bids are:</h1>
              {history}
            </div>
        }
      </div>
    );
  }
}

export default SellerItem;