'use strict';


const e = React.createElement;

class Main extends React.Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      <div>
        <h1>Main Page</h1>
      </div>
    );
  }
}

const domContainer = document.querySelector('#container');
ReactDOM.render(e(Main), domContainer);