// import './App.css';
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Routes from './Router';
import { Header, Footer } from './components'
 
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
