import React, { Component } from 'react';
import './App.css';
import Search from './component/Search';
import Footer from './component/Footer';


class App extends Component {

  
  render() {

  return (
    <div className="App">
     <Search />
     <Footer />
    </div>
    
  );
  }
}

export default App;