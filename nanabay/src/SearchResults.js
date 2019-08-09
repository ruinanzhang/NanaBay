import React from 'react';
import TopNavBar from './components/top_nav_bar.react.js';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : true,
      results : [],
    };

    fetch(`http://localhost:4000/search?query=${this.props.match.params.query}`)
      .then(response => response.json())
      .then(results => {
        console.log(results);
        this.setState({ results : results });
        this.setState({ loading : false });
      });
  }

  render() {
    if (this.state.loading) {
      return <p>Loading</p>;
    }

    let items = [];

    if (this.state.results.length === 0) {
      items.push(<p>Cannot find any result with keyword "{this.props.match.params.query}"</p>);
    }

    for (let i = 0; i < this.state.results.length; i++) {
      items.push(
        <a href={`/item/${this.state.results[i].item_id}`}>
          <div style={{ 'background-color' : '#EEEEEE' }}>
            <img src={this.state.results[i].pic_url} />
            <p>{this.state.results[i].Description}</p>
            <p>Price: {this.state.results[i].price}</p>
            <p>Category: {this.state.results[i].category}</p>
            <p>Condition: {this.state.results[i].condition}</p>
            <p>Item ID: {this.state.results[i].item_id}</p>
            <p>Seller ID: {this.state.results[i].seller_id}</p>
          </div>
        </a>
      );
    }
    
    return (
      <div>
        <TopNavBar />
        <h1>Search Result for "{this.props.match.params.query}"</h1>
        {items}
      </div>
    );
  }
}

export default SearchResults;