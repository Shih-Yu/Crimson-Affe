import React from 'react';
import logo from '../../assets/home_logo.png';
import {
  pageTemplate,
  pageTemplate2,
  flex,
  logoImage,
} from './styles/Home';
import image1 from '../assets/spacecowboy/spacecowboy1.jpeg';
import image2 from '../assets/spacecowboy/spacecowboy2.jpeg';

const images = [
  {
    id: 1,
    src: image1,
    title: 'Pink Night Sky',
    description: 'A galaxy far far away',
    price: 1175,
  },
  {
    id: 2,
    src: image2,
    title: 'Drunken Starry Night',
    description: 'Camping with friends and a camera',
    price: 950,
  },
];

export default function Home() {
  return (
    <>
      <div style={flex}>
        <div>
          <img src={logo} alt='Affe logo' style={logoImage} />
        </div>
        <div style={pageTemplate}>
          <h1 style={{ margin: '0', textAlign: 'center' }}>
            Crimson Affe Marketplace
          </h1>
          <h3 style={{ margin: '50px', paddingLeft: '220px' }}>
            A decentralized NFT marketplace exchange that promotes artist's
            ability to create and own their arts.
          </h3>
        </div>
      </div>
      <h2 style={{ textAlign: 'center', background: '#f1eee4', margin: '0' }}>Featured Artist</h2>
      <div style={pageTemplate2}>
        <div style={{ height: '600px', width: '1200px' }} className='card-group'>
          {images.map((nft, index) => (
            <div className='card my-3 mx-3' key={index}>
              <img src={nft.src} className='card-img-top' alt='nft cards' />
              <div className='card-body'>
                <h5 style={{ color: '#8a0000' }} className='card-title'>
                  {nft.title}
                </h5>
                <p className='card-text'>{nft.description}</p>
                <p style={{ color: '#262a2c' }} className='card-text'>
                  {nft.price} Matic
                </p>
              </div>
              <div className='card-footer d-grid justify-content-mx-auto-center'>
                <button
                  className='btn btn-lg'
                  style={{ backgroundColor: '#fdbe02', border: 'none' }}
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
