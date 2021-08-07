import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import "./Header";

export default function Header() {
  return (
    <div>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand href="#home">Brand link</Navbar.Brand>

          <Nav className="justify-content-end">
            <Nav.Item>
              <Nav.Link href="/home">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="">Gallery</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="">
                <span>
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
