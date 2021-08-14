import React from "react";
import logo from "../../assets/home_logo.png";
import { pageTemplate, flex, logoImage } from "./styles/Home";
import Web3Modal from 'web3modal';
import { ethers } from "ethers";
import { affeMarketAddress, mintArtAddress } from "../../config";
import AffeMarket from "../../artifacts/contracts/AffeMarket.sol/AffeMarket.json";
import MintArt from "../../artifacts/contracts/MintArt.sol/MintArt.json";

export default function Home() {

  return (
    <div style={flex}>
      <div>
        <img src={logo} alt="Affe logo" style={logoImage} />
      </div>
      <div style={pageTemplate}>
        <h1 style={{ margin: "0", textAlign: "center" }}>Crimson Affe Marketplace</h1>
        <h3 style={{ margin: "50px", paddingLeft: "250px" }}>
          A decentralized NFT marketplace exchange that promotes artist's ablility to create and own
          their arts.
        </h3>
      </div>
    </div>
  );
}
