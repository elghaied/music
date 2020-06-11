import React, { Component } from 'react';
import './App.css';
import Search from './component/Search';

class App extends Component {
  render() {
    const {loading} = this.props;
  const loadingclass = "loadingclass";
  return (
    <div className={`App ${loading ? loadingclass : null}`}>
     <Search />
    </div>
  );
  }
}

export default App;