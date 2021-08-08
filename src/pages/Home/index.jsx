import React from 'react';
import logo from '../../assets/home_logo.png'
import { pageTemplate, flex, logoImage } from './styles/Home';

export default function Home() {
  return (
    <div style={flex}>
      <div>
        <img src={logo} alt="Affe logo" style={logoImage} />
      </div>
      <div style={pageTemplate}>
        <h1 style={{ margin: "0", textAlign: "center" }}>Crimson Affe Marketplace</h1>
        <h3 style={{ margin: "50px", paddingLeft: "250px" }}>A decentralized NFT marketplace exchange that promotes artist's ablility to create and own their arts.</h3>
      </div>
    </div>
  );
}
