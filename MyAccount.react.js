'use strict';


const e = React.createElement;

class MyAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email : 'a@gmail.com',
      email_editable : false,
      username : 'nanako',
      username_editable : false,
      address : '67 E 11 st',
      address_editable : false,
      phone : '123456789',
      phone_editable : false,
      password : '******',
      password_editable : false,
    };
  }

  render() {
    return (
      <div>
        <h1>My Account</h1>
        <div>
          {
            this.state.email_editable
            ? <div>
                <p>Email:</p>
                <input onChange={(e) => this.setState({email : e.target.value})} />
                <button onClick={() => this.setState({email_editable : false})}>Save</button>
              </div>
            : <div>
                <p>Email: {this.state.email}</p>
                <button onClick={() => this.setState({email_editable : true})}>Edit</button>
              </div>
          }
          {
            this.state.username_editable
            ? <div>
                <p>Username:</p>
                <input onChange={(e) => this.setState({username : e.target.value})} />
                <button onClick={() => this.setState({username_editable : false})}>Save</button>
              </div>
            : <div>
                <p>Username: {this.state.username}</p>
                <button onClick={() => this.setState({username_editable : true})}>Edit</button>
              </div>
          }
          {
            this.state.address_editable
            ? <div>
                <p>Address:</p>
                <input onChange={(e) => this.setState({address : e.target.value})} />
                <button onClick={() => this.setState({address_editable : false})}>Save</button>
              </div>
            : <div>
                <p>Address: {this.state.address}</p>
                <button onClick={() => this.setState({address_editable : true})}>Edit</button>
              </div>
          }
          {
            this.state.phone_editable
            ? <div>
                <p>Phone:</p>
                <input onChange={(e) => this.setState({phone : e.target.value})} />
                <button onClick={() => this.setState({phone_editable : false})}>Save</button>
              </div>
            : <div>
                <p>Phone: {this.state.phone}</p>
                <button onClick={() => this.setState({phone_editable : true})}>Edit</button>
              </div>
          }
          {
            this.state.password_editable
            ? <div>
                <p>Password:</p>
                <input onChange={(e) => this.setState({password : e.target.value})} />
                <button onClick={() => this.setState({password_editable : false})}>Save</button>
              </div>
            : <div>
                <p>Password: {this.state.password}</p>
                <button onClick={() => this.setState({password_editable : true})}>Edit</button>
              </div>
          }
        </div>
      </div>
    );
  }
}

const domContainer = document.querySelector('#container');
ReactDOM.render(e(MyAccount), domContainer);