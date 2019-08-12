import React from 'react';
import TopNavBar from './components/top_nav_bar.react.js';
import { getUserFromCookie } from './UserID';


class Sell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category : '',
      condition : '',
      description : '',
      pic_url : '',
      min_accept_price : '',
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
        <h1 style = {{ 'fontSize': "25px",'textAlign': "center", 'fontfamily': "Roboto Slab", 'margin':"8px",'color' : "#4CAAF0"}}>Sell</h1>
        <div style = {{'color' : "#4CAAF0", 'textAlign':"center", 'backgroundColor': "#E8F5F6" }}>
          <div>
              <p>Description: </p>
              <input value={this.state.description} onChange={(e) => {
                this.setState({ description : e.target.value });
              }} />
          </div>
          <div>
              <p>Minimum accept price: </p>
              <input value={this.state.min_accept_price} onChange={(e) => {
                this.setState({ min_accept_price : e.target.value });
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
        </div>
        <p> </p>
        <p> </p>
        <p> </p>
        <div style = {{'textAlign': "center"}}>
          <button style = {{'textAlign': "center", 'borderRadius': "12px", 'backgroundColor' : "#F5D8E6  ", 'color':"#0694FC ", 'fontSize': "20px"}} onClick={() => {
            fetch(`http://localhost:4000/add_item?item_id=${Math.floor(Math.random() * 100000000)}&auction_id=${Math.floor(Math.random() * 100000000)}&user_id=${getUserFromCookie().id}&category=${this.state.category}&condition=${this.state.condition}&description=${this.state.description}&pic_url=${this.state.pic_url}&min_accept_price=${this.state.min_accept_price}&start_time=${this.state.start_time}&end_time=${this.state.end_time}`)
            .then(window.open('/sales'));

          }}>
            Post
          </button>
         </div>
      </div>
    );
  }
}

export default Sell;