import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3modal from "web3modal";
import axios from "axios";
import { toGatewayURL } from "nft.storage";

import { pageTemplate } from "./styles/gallery";

import { affeMarketAddress, mintArtAddress } from "../../config";
import AffeMarket from "../../artifacts/contracts/AffeMarket.sol/AffeMarket.json";
import MintArt from "../../artifacts/contracts/MintArt.sol/MintArt.json";

export default function Gallery() {
  const [nfts, setNfts] = useState([]);
  const [upload, setUpload] = useState("not-loaded");

  useEffect(() => {
    loadNfts();
  }, []);

  async function loadNfts() {
    // connect to the Mumbai testnet
    const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_MUMBAI_URL);
    // retrieve the MintArt contract information
    const tokenContract = new ethers.Contract(mintArtAddress, MintArt.abi, provider);
    // retrieve the AffeMarket contract information
    const marketContract = new ethers.Contract(affeMarketAddress, AffeMarket.abi, provider);
    // get function from the AffeMarket contract
    const data = await marketContract.getAffeItems();

    const items = await Promise.all(
      data.map(async (i) => {
        // get tokenURI from the AffeMarket contract
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        // retrieve the metadata from the tokenURI
        // const httpURI = tokenUri.replace(/^ipfs/, "https").replace(/\.metadata.json$/, "");
        const httpURI = toGatewayURL(tokenUri);
        const apiKey = process.env.REACT_APP_NFTSTORAGE_KEY;
        
        const meta = await axios.get(httpURI, {
          headers: {
            "Authorization": `Bearer ${apiKey}`,
          },
        });
        console.log(meta);
        // using ethers utils to get a more readable number
        console.log(i.price.toString());
        let price = ethers.utils.formatEther(i.price);

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
    setUpload("loaded");
  }

  async function buyNft(nft) {
    // connect to metamask
    const web3Modal = new Web3modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    // sign in to metamask
    const signer = provider.getSigner();
    // retrieve the AffeMarket contract information
    const tokenContract = new ethers.Contract(affeMarketAddress, AffeMarket.abi, signer);
    // use ethers utils to get a more readable number
    const price = ethers.utils.parseUnits(nft.price.toString(), "ethers");
    // get function from the AffeMarket contract and info NFT token contract
    const transaction = await tokenContract.createAffeSale(mintArtAddress, nft.tokenId, {
      value: price,
    });
    await transaction.wait();
    loadNfts();
  }
  if (upload === "loaded" && !nfts.length)
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
        <div className="card-group">
          {nfts.map((nft, index) => (
            <div className="card my-3 mx-3" key={index}>
              <img src={nft.image} className="card-img-top" alt="nft cards" />
              <div className="card-body">
                <h5 style={{ color: "#8a0000" }} className="card-title">
                  {nft.title}
                </h5>
                <p className="card-text">{nft.description}</p>
                <p style={{ color: "#262a2c" }} className="card-text">
                  {nft.price} Matic
                </p>
              </div>
              <div className="card-footer d-grid justify-content-mx-auto-center">
                <button
                  className="btn btn-small btn"
                  style={{ backgroundColor: "#fdbe02", border: "none" }}
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
