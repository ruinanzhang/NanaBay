import React from 'react';
import TopNavBar from './components/top_nav_bar.react.js';
import { getUserFromCookie } from './UserID';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : true,
      results : [],
      search_query : this.props.match.params.query,
      search_history_loading : true,
      search_history : [],
    };

    fetch(`http://localhost:4000/search_history?user_id=${getUserFromCookie().id}`)
      .then(response => response.json())
      .then(history => {
        console.log(history);
        this.setState({
          search_history : history,
          search_history_loading : false,
        });
      });

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

    let search_history = [];
    for (var i = 0; i < this.state.search_history.length; i++) {
      search_history.push(
        <p>{this.state.search_history[i].filter_used}</p>
      );
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
        <div>
          <h2>Search</h2>
          <input value={this.state.search_query} onChange={(e) => {
            this.setState({ search_query : e.target.value });
          }} />
          <button onClick={() => {
            fetch(`http://localhost:4000/add_search_history?user_id=${getUserFromCookie().id}&search_time=${new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ')}&filter_used=${this.state.search_query}`)
              .then(window.location.href = `/search/${this.state.search_query}`)
          }}>
            Search
          </button>
        </div>
        <div>
          <h2>Search History</h2>
          {
            this.state.search_history_loading
            ? <p>Loading...</p>
            : search_history
          }
        </div>
        <h1>Search Result for "{this.props.match.params.query}"</h1>
        {items}
      </div>
    );
  }
}

export default SearchResults;