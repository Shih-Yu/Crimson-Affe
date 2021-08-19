import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Web3modal from 'web3modal';
import axios from 'axios';
import { pageTemplate } from './styles/gallery';
import image1 from '../assets/MarcelStrauss/marcelstrauss1.jpg';
import image2 from '../assets/MarcelStrauss/marcelstrauss2.jpg';
import image3 from '../assets/MarcelStrauss/marcelstrauss3.jpg';
import image4 from '../assets/MarcelStrauss/marcelstrauss4.jpg';
import image5 from '../assets/MarcelStrauss/marcelstrauss5.jpg';
import image6 from '../assets/spacecowboy/spacecowboy1.jpeg';
import image7 from '../assets/spacecowboy/spacecowboy2.jpeg';
import image8 from '../assets/spacecowboy/spacecowboy3.jpeg';
import image9 from '../assets/spacecowboy/spacecowboy4.jpeg';
import image10 from '../assets/spacecowboy/spacecowboy5.jpeg';

import { affeMarketAddress, mintArtAddress } from '../../config';
import AffeMarket from '../../artifacts/contracts/AffeMarket.sol/AffeMarket.json';
import MintArt from '../../artifacts/contracts/MintArt.sol/MintArt.json';

export default function Gallery() {
  const [nfts, setNfts] = useState([]);
  const [upload, setUpload] = useState('not-loaded');

  useEffect(() => {
    loadNfts();
  }, []);

  const images = [
    {
      id: 1,
      src: image1,
      title: 'Color Bubble',
      description: 'Dimensional Colorful Circles',
      price: 375,
    },
    {
      id: 2,
      src: image2,
      title: 'Crismson Sea',
      description: 'Shades of red in the void',
      price: 1250,
    },
    {
      id: 3,
      src: image3,
      title: 'Cotton Candy',
      description: 'Liquid Cotton Candy',
      price: 700,
    },
    {
      id: 4,
      src: image4,
      title: 'Dark Skies',
      description: 'Thunderstorms in Sunlight',
      price: 475,
    },
    {
      id: 5,
      src: image5,
      title: 'Dark Skies 2',
      description: 'Thunderstorms in Sunlight',
      price: 275,
    },
  ];

  const photos = [
    {
      id: 1,
      src: image6,
      title: 'Pink Night Sky',
      description: 'A galaxy far far away',
      price: 1175,
    },
    {
      id: 2,
      src: image7,
      title: 'Drunken Starry Night',
      description: 'Camping with a camera',
      price: 950,
    },
    {
      id: 3,
      src: image8,
      title: 'Solar System',
      description: 'Space - a place to feel small',
      price: 450,
    },
    {
      id: 4,
      src: image9,
      title: 'Sunburst Space',
      description: 'Darkness surrounds bright star',
      price: 975,
    },
    {
      id: 5,
      src: image10,
      title: 'North',
      description: 'Northern Lights',
      price: 275,
    },
  ];

  async function loadNfts() {
    // connect to the Mumbai testnet
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.REACT_APP_MUMBAI_URL
    );
    // retrieve the MintArt contract information
    const tokenContract = new ethers.Contract(
      mintArtAddress,
      MintArt.abi,
      provider
    );
    // retrieve the AffeMarket contract information
    const marketContract = new ethers.Contract(
      affeMarketAddress,
      AffeMarket.abi,
      provider
    );
    // get function from the AffeMarket contract
    const data = await marketContract.getAffeItems();

    const items = await Promise.all(
      data.map(async (i) => {
        // get tokenURI from the AffeMarket contract
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        // retrieve the metadata from the tokenURI
        const meta = await axios.get(tokenUri);
        // using ethers utils to get a more readable number
        let price = ethers.utils.formatUnits(i.price.toString(), 'ethers');
        // setting object of the items available for sale to display on gallery page
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
      setNfts(items);
      setUpload('loaded');
  }
  
  async function buyNft(nft) {
    // connect to metamask
    const web3Modal = new Web3modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    // sign in to metamask
    const signer = provider.getSigner();
    // retrieve the AffeMarket contract information
    const tokenContract = new ethers.Contract(
      affeMarketAddress,
      AffeMarket.abi,
      signer
    );
    // use ethers utils to get a more readable number
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ethers');
    // get function from the AffeMarket contract and info NFT token contract
    const transaction = await tokenContract.createAffeSale(
      mintArtAddress,
      nft.tokenId,
      {
        value: price,
      }
    );
    await transaction.wait();
    loadNfts();
  }
    if (upload === 'loaded' && !nfts.length) 
      return <h1 className="text-center">No NFTs available</h1>;

  return (
    <>
      <div style={pageTemplate}>
        {/* <div className='card-group'>
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
                  onClick={() => buyNft(nft)}
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div> */}
        <div className='card-group'>
          {nfts.map((nft, index) => (
            <div className='card my-3 mx-3' key={index}>
              <img src={nft.image} className='card-img-top' alt='nft cards' />
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
                  className='btn btn-small btn'
                  style={{ backgroundColor: '#fdbe02', border: 'none' }}
                  onClick={() => buyNft(nft)}
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
