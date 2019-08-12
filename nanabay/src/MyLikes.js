import React from 'react';
import TopNavBar from './components/top_nav_bar.react.js';
import { getUserFromCookie } from './UserID';

class MyLikes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : true,
      likes : [],
    };

    const user = getUserFromCookie();
    if (user.id === null || user.id === '') {
      window.location.replace('/sign_in');
    } else {
      fetch(`http://localhost:4000/likes?id=${user.id}`)
        .then(response => response.json())
        .then(likes => {
          this.setState({ likes : likes });
          this.setState({ loading : false });
        });
    }
  }



  render() {
    let items = [];
    for (let i = 0; i < this.state.likes.length; i++) {
      items.push(
        <a href={`/item/${this.state.likes[i].item_id}`}>
          <div style={{ 'color' : "#4CAAF0", 'textAlign':"center", 'backgroundColor': "#E8F5F6" }}>
            <img style = {{'borderRadius': "50%", 'width': "20%"}} src={this.state.likes[i].pic_url}/>
            <p>{this.state.likes[i].description}</p>
            <p>Category: {this.state.likes[i].category}</p>
            <p>Item ID: {this.state.likes[i].item_id}</p>
          </div>
        </a>
      );
    }
    
    return (
      <div>
        <TopNavBar />
        <h1 style = {{ 'fontSize': "25px",'textAlign': "center", 'fontfamily': "Roboto Slab", 'margin':"8px",'color' : "#4CAAF0"}} >My Likes</h1>
        <p> </p>
        {
          this.state.loading
          ? <p style = {{'fontSize': "15px", 'textAlign': "center", 'color': "pink"}} >Loading...</p>
          : items
        }

      </div>
    );
  }
}

export default MyLikes;