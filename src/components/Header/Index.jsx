import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import logo from "../../assets/crimson_affe.png";
import { myStyle } from './styles/header';
import { ROUTES } from "../../utils/constants/routes";

export default function Header() {
  
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
              <Nav.Link href="">
                <span style={{ color: "#fdbe02" }}>
                  <i class="fas fa-wallet fa-3x"></i>
                </span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
