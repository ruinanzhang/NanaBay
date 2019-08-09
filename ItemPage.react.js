'use strict';

const e = React.createElement;

class ItemPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {    
    return (
      <div>
        <h1>Nana's poop</h1>
        <p>Description</p>
        <p>$10000.00</p>
      </div>
    );
  }
}



const domContainer = document.querySelector('#container');
ReactDOM.render(e(ItemPage), domContainer);