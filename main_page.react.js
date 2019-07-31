'use strict';

const e = React.createElement;

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { price: 0, input: '' }
  }

  render() {
    let rows = [];
    for (var i = 0; i < 10; i++) {
      rows.push(<PriceRow />);
    } 

    return (
      <div>
        <h1>NANA BAY</h1>
        {rows}
      </div>
    );
  }
}

const domContainer = document.querySelector('#main_page');
ReactDOM.render(e(MainPage), domContainer);