

const e = React.createElement;

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Email: '', input1: '',
                   // UserId: '', input : '',
                   UserName: '', input2 : '',
                   Address : '', input3 :'',
                   Phone: '', input4 :'',
                   Password: '', input5 :'',
                   ShowError: false}
  }

  validate(input) {
    return input.length > 0; 
  }

  render() {
    return (
      <div>
      <h1> Welcome to the singUp Page</h1> 
        <div>
          {this.state.ShowError ? <p>Error</p> : null}
          <p>Email: {this.state.Email}</p>
          <input onChange={ (e) => this.setState({ input1: e.target.value }) }></input>
          <p>UserName: {this.state.UserName}</p>
          <input onChange={ (e) => this.setState({ input2: e.target.value }) }></input>
          <p>Address: {this.state.Address}</p>
          <input onChange={ (e) => this.setState({ input3: e.target.value }) }></input>
          <p>Phone: {this.state.Phone}</p>
          <input onChange={ (e) => this.setState({ input4: e.target.value }) }></input>
          <p>Password: {this.state.Password}</p>
          <input onChange={ (e) => this.setState({ input5: e.target.value }) }></input>
          <button onClick={() => {
            if (!this.validate(this.state.input1) ||!this.validate(this.state.input2) || !this.validate(this.state.input3) || !this.validate(this.state.input4) || !this.validate(this.state.input5)) {
              this.setState( { ShowError : true});
              return;
            }
            else{
            this.setState({ Email : this.state.input1 });
            this.setState({ UserName : this.state.input2 });
            this.setState({ Address : this.state.input3 });
            this.setState({ Phone : this.state.input4 });
            this.setState({ Password : this.state.input5 });
  // load all info to database 
            window.location.href = "main.html"
            }
          }}>
            Submit
          </button>
        </div>
      </div>

    );
  }
}

const domContainer = document.querySelector('#container');
ReactDOM.render(e(SignUpPage), domContainer);