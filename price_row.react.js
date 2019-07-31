'use strict';

const e = React.createElement;

class PriceRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { price: 0, input: '' }
  }

  render() {
    return (
      <div>
        <p>Current price: {this.state.price}</p>
        <input onChange={ (e) => this.setState({ input: e.target.value }) }></input>
        <button onClick={() => {
          this.setState({ price : this.state.input });
        }}>
          Submit
        </button>
      </div>
    );
  }
}