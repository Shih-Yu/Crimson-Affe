// import './App.css';
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Routes from './Router';
import { Header, Footer } from './components'
import './App.css';
 
function App() {
  return (
    <div>
      <Header />
      <Routes/>
      <Footer />
    </div>
  );
}

export default App;
