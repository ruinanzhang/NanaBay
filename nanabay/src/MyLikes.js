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
          <div style={{ 'background-color' : '#EEEEEE' }}>
            <img src={this.state.likes[i].pic_url} />
            <p>{this.state.likes[i].description}</p>
            <p>Price: {this.state.likes[i].price}</p>
            <p>Category: {this.state.likes[i].category}</p>
            <p>Item ID: {this.state.likes[i].item_id}</p>
          </div>
        </a>
      );
    }
    
    return (
      <div>
        <TopNavBar />
        <h1>My Likes</h1>
        {
          this.state.loading
          ? <p>Loading...</p>
          : items
        }
      </div>
    );
  }
}

export default MyLikes;