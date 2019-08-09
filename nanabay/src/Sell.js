import React from 'react';
import TopNavBar from './components/top_nav_bar.react.js';

class Sell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category : '',
      condition : '',
      description : '',
      pic_url : '',
      price : '',
      start_time : '',
      end_time : '',
    };
  }

  render() {
    if (this.state.loading) {
      return <p>Loading</p>;
    }
    
    return (
      <div>
        <TopNavBar />
        <h1>Sell</h1>
        <div>
            <p>Description: </p>
            <input value={this.state.description} onChange={(e) => {
              this.setState({ description : e.target.value });
            }} />
        </div>
        <div>
            <p>Minimum accept price: </p>
            <input value={this.state.price} onChange={(e) => {
              this.setState({ price : e.target.value });
            }} />
        </div>
        <div>
            <p>Start time: </p>
            <input value={this.state.start_time} onChange={(e) => {
              this.setState({ start_time : e.target.value });
            }} />
        </div>
        <div>
            <p>End time: </p>
            <input value={this.state.end_time} onChange={(e) => {
              this.setState({ end_time : e.target.value });
            }} />
        </div>
        <div>
            <p>Condition: </p>
            <input value={this.state.condition} onChange={(e) => {
              this.setState({ condition : e.target.value });
            }} />
        </div>
        <div>
            <p>Category: </p>
            <input value={this.state.category} onChange={(e) => {
              this.setState({ category : e.target.value });
            }} />
        </div>
        <div>
            <p>Picture URL: </p>
            <input value={this.state.pic_url} onChange={(e) => {
              this.setState({ pic_url : e.target.value });
            }} />
        </div>
        <button onClick={() => {
          fetch(`http://localhost:4000/add_item?item_id=${Math.floor(Math.random() * 100000000)}&auction_id=${Math.floor(Math.random() * 100000000)}&user_id=1&category=${this.state.category}&condition=${this.state.condition}&description=${this.state.description}&pic_url=${this.state.pic_url}&price=${this.state.price}&start_time=${this.state.start_time}&end_time=${this.state.end_time}`)
          .then(window.open('/sales'));

        }}>
          Post
        </button>
      </div>
    );
  }
}

export default Sell;