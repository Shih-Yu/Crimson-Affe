import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import logo from "../assets/crimson_affe.png";
import { ROUTES } from "../utils/constants";

export default function Header() {
  const myStyle = {
    backgroundColor: "#424a4d",
    color: "#f1eee4",
    paddingRight: "50px",
  };
  return (
    <div>
      <Navbar style={myStyle}>
        <Container>
          <Navbar.Brand href="/home" style={myStyle}>
            <Nav.Link href={ROUTES.home}>
              <img src={logo} alt="crimson affe logo"></img>
            </Nav.Link>
            Crimson Affe
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
