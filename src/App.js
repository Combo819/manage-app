import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Mainpage from "./components/mainpage";
import {message} from 'antd'
message.config({
  top: 100,
  duration: 3,
  maxCount: 3,
});
class App extends Component {
  render() {
    return (
      <div>
        <Mainpage />
      </div>
    );
  }
}

export default App;
