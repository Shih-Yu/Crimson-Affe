// import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateNFT from "./pages/CreateNFT";

function App() {
  return (
    <div>
      <Router>
        <Route path="/home" component={Home} />
        <Route path="/create-nft" component={CreateNFT} />
      </Router>
    </div>
  );
}

export default App;
