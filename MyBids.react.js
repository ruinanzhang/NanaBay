'use strict';

const e = React.createElement;

class MyLikeItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>{this.props.name}</div>;
  }
}

class MyBids extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let items = [];
    for (var i = 0; i < 10; i++) {
      items.push(<MyLikeItem name="hello" />);
    }
    
    return (
      <div>
        <h1>My Bids</h1>
        {items}
      </div>
    );
  }
}



const domContainer = document.querySelector('#my_bids');
ReactDOM.render(e(MyBids), domContainer);