class SearchItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'What are you looking for today?'
    };

    this.handleChange = this.handleChange.bind(this);
    
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

 // this.state.value should perfrom as a sql search condition in the item table using Like operation. 
 //At the same time, the "this.state.value" value need to be recored in the Search table with its time and user_id

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Search:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}