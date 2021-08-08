import React from 'react';

const myStyle = {
  backgroundColor: '#424a4d',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  padding: '30px',
};

const myStyle2 = {
  listStyleType: 'none',
  color: '#f1eee4',
};

const myStyle3 = {
  textDecoration: 'none',
  color: '#f1eee4',
  padding: '20px',
};

const myStyle4 = {
  margin: '0',
  backgroundColor: '#424a4d',
  color: '#f1eee4',
  textAlign: 'center'
}

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
