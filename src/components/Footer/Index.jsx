import React from 'react';
import { myStyle, myStyle2, myStyle3, myStyle4 } from './styles/footer'

export default function Footer() {
  return (
    <div>
    <div className='container-fluid' style={myStyle}>
      <div>
        <ul style={myStyle2}>
          <li>
            <a style={myStyle3} href='Home'>
              Home
            </a>
          </li>
          <li>
            <a style={myStyle3} href='Gallery'>
              Gallery
            </a>
          </li>
          <li>
            <a style={myStyle3} href='Curator Login'>
              Curator Login
            </a>
          </li>
        </ul>
      </div>
      <div>
        <ul style={myStyle2}>
          <li>
            <a style={myStyle3} href='Privacy'>
              Privacy
            </a>
          </li>
          <li>
            <a style={myStyle3} href='Policy'>
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
