import React from "react";
import logo from "../../assets/home_logo.png";
import { pageTemplate, flex, logoImage } from "./styles/Home";
import Web3Modal from 'web3modal';
import { ethers } from "ethers";
import { affeMarketAddress, mintArtAddress } from "../../config";
import AffeMarket from "../../artifacts/contracts/AffeMarket.sol/AffeMarket.json";
import MintArt from "../../artifacts/contracts/MintArt.sol/MintArt.json";

export default function Home() {
  async function connecting() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const affeContract = new ethers.Contract(affeMarketAddress, AffeMarket.abi, signer);
    const mintArtContract = new ethers.Contract(mintArtAddress, MintArt.abi, provider);
  }

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
      <button onClick={connecting}>Connect</button>
    </div>
  );
}
