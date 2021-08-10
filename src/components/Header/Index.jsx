import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import logo from "../../assets/crimson_affe.png";
import { myStyle } from './styles/header';
import { ROUTES } from "../../utils/constants/routes";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { affeMarketAddress, mintArtAddress } from "../../config"
import AffeMarket from "../../artifacts/contracts/AffeMarket.sol/AffeMarket.json";
import MintArt from "../../artifacts/contracts/MintArt.sol/MintArt.json";

export default function Header() {
  
  async function walletConnect() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    await new ethers.Contract(affeMarketAddress, AffeMarket.abi, signer);
    await new ethers.Contract(mintArtAddress, MintArt.abi, provider)
  }
  return (
    <div>
      <Navbar style={myStyle}>
        <Container>
          <Navbar.Brand href={ROUTES.home} style={myStyle}>
            <Nav.Link href={ROUTES.home}>
              <img src={logo} alt="crimson affe logo"></img>
            </Nav.Link>
          </Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Item>
              <Nav.Link href={ROUTES.home} style={myStyle}>
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href={ROUTES.gallery} style={myStyle}>
                Gallery
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href={ROUTES.createNFT} style={myStyle}>
                Create NFT
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="" onClick={walletConnect}>
                <span style={{ color: "#fdbe02" }}>
                  <i className="fas fa-wallet fa-3x"></i>
                </span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
