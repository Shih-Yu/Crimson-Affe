<<<<<<< HEAD:src/pages/Home.jsx
import React from "react";
import logo from "../assets/home_logo.png";

const pageTemplate = {
  backgroundColor: "#f1eee4",
  color: "#424a4d",
  width: "100%",
  height: "515px",
  padding: "50px",
  margin: "50px",
};

const flex = {
  display: "flex",
  justifyContent: "center",
  backgroundColor: "#f1eee4",
};

const logoImage = {
  width: "500px",
  height: "500px",
  padding: "20px",
};
=======
import React from 'react';
import logo from "../assets/home_logo.png"
import { pageTemplate, flex, logoImage } from './styles/Home';
>>>>>>> 5037f327cad3a75642d0e86ce59395e414a230c0:src/pages/Home/index.jsx

export default function Home() {
  return (
    <div style={flex}>
      <div>
        <img src={logo} alt="Affe logo" style={logoImage} />
      </div>
      <div style={pageTemplate}>
        <h1 style={{ margin: "0", textAlign: "center" }}>Crimson Affe Marketplace</h1>
        <h3 style={{ margin: "0" }}>A decentralized NFT marketplace exchange for artists</h3>
      </div>
    </div>
  );
}
