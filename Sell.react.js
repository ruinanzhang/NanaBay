'use strict';


const e = React.createElement;

class Sale extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Sell</h1>
        <span>
          <p>Description</p>
          <input />
        </span>
        <span>
          <p>Minimum Price</p>
          <input />
        </span>
        <span>
          <p>Starting Date</p>
          <input />
        </span>
        <span>
          <p>Ending Date</p>
          <input />
        </span>
        <button>Sell</button>
      </div>
    );
  }
}

const domContainer = document.querySelector('#container');
ReactDOM.render(e(Sale), domContainer);