import React from 'react';
import { myStyle, myStyle2, myStyle3, myStyle4 } from './styles/footer'

export default function Footer() {
  return (
    <div>
    <div className='container-fluid' style={myStyle}>
      <div>
        <ul style={myStyle2}>
          <li>
            <a style={myStyle3} href='home'>
              Home
            </a>
          </li>
          <li>
            <a style={myStyle3} href='gallery'>
              Gallery
            </a>
          </li>
          <li>
            <a style={myStyle3} href='create-nft'>
                Create NFT
            </a>
          </li>
        </ul>
      </div>
      <div>
        <ul style={myStyle2}>
          <li>
            <a style={myStyle3} href='privacy'>
              Privacy
            </a>
          </li>
          <li>
            <a style={myStyle3} href='policy'>
              Policy
            </a>
          </li>
          <li>
            <a style={myStyle3} href='Terms of Service'>
              Terms of Service
            </a>
          </li>
          <li>
            <a style={myStyle3} href='Contact'>
              Contact
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div style={myStyle4} className="container-fluid">
      <p>Crimson Affe Copyright 2021</p>
    </div>
    </div>

  );
}
