import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
class App extends Component {
  constructor() {
    super();
    this.state = {
      response: 0,
      endpoint: '/',
      room: 'global',
      newRoom: 'global',
      text: 0
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    this.socket = socketIOClient(endpoint);
    this.socket.on('update', data => this.setState({ response: data }));
    this.socket.on('privatemessage', data => console.log(data));
  }
  render() {
    const { response } = this.state;
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>{response || 'loading'}</h1>
        <form>
          <input
            type="text"
            value={this.state.text}
            onChange={e => {
              this.setState({ text: e.target.value });
            }}
          />

          <a
            href="/"
            onClick={e => {
              e.preventDefault();
              console.log(this.state.text);
              if (isNaN(this.state.text)) {
                alert('only numbers');
              } else {
                this.socket.emit('setCouter', this.state.text);
              }
            }}
          >
            set counter
          </a>
        </form>
        <div>To create a new Room just goto a new room</div>
        <input
          type="text"
          value={this.state.newRoom}
          onChange={e => {
            this.setState({ newRoom: e.target.value });
          }}
        />

        <a
          href="/"
          onClick={e => {
            e.preventDefault();
            this.socket.emit('changeRoom', this.state.newRoom);
          }}
        >
          Goto
        </a>
      </div>
    );
  }
}

export default App;
