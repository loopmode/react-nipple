import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import ReactNippleExample from "./ReactNippleExample";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-examples">
          <ReactNippleExample
            title="Dynamic"
            width={450}
            height={150}
            options={{ mode: "dynamic", color: "red" }}
          />
          <ReactNippleExample
            title="Static 1"
            width={250}
            height={250}
            options={{
              mode: "static",
              color: "green",
              position: { top: "50%", left: "50%" }
            }}
          />
          <ReactNippleExample
            title="Static 2"
            width={250}
            height={250}
            options={{
              mode: "static",
              color: "blue",
              position: { top: "50%", left: "50%" }
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;
