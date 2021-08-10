import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3modal from "web3modal";
import axios from "axios";
import { pageTemplate } from "./styles/gallery";
​
import { affeMarketAddress, mintArtAddress } from "../../config";
import AffeMarket from "../../artifacts/contracts/AffeMarket.sol/AffeMarket.json";
import MintArt from "../../artifacts/contracts/MintArt.sol/MintArt.json";
​
​
export default function Gallery() {
  const [nfts, setNfts] = useState([]);
  const [upload, setUpload] = useState('not-loaded');
​
  useEffect(() => {
    loadNfts();
  }, []);
​
  async function loadNfts() {
    const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.infura.io/v3/b614365440b14601b712b84bae5812ee");
    const tokenContract = new ethers.Contract(mintArtAddress, MintArt.abi, provider);
    const marketContract = new ethers.Contract(affeMarketAddress, AffeMarket.abi, provider);
    const data = await marketContract.getAffeItems();
​
    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), 'ethers');
        let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        artPiece: meta.data.artPiece,
        description: meta.data.description,
      };
      return item;
      })
    );
    setNfts(items);
    setUpload('loaded');
  }
​
  async function buyNft(nft) {
    const web3Modal = new Web3modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
​
    const tokenContract = new ethers.Contract(affeMarketAddress, AffeMarket.abi, signer);
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ethers');
​
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
​
  if (upload === "loaded" && !nfts.length) {
    return <h1 className="text-center px-20 py-10">No NFTs available</h1>;
  }
​
  return (
    <>
      <div style={pageTemplate}>I am gallery page</div>
        <div class="card-group">
          {
            nfts.map((nft, index) => (
            
          <div className="card my-3 mx-3" key={index}>
            <img src={nft.image} class="card-img-top" alt="nft cards"/>
              <div className="card-body">
                <h5 className="card-title">{nft.artPiece}</h5>
                <p className="card-text">{nft.description}</p>
                <small className="text-muted">{nft.name}</small>
                <p className="card-text">{nft.price} Matic</p>
              </div>
              <div className="card-footer">
                <button 
                className="btn btn-small btn" 
                style={{ backgroundColor: "#fdbe02", border: "none" }}
                onClick={() => buyNft(nft)}>
                Buy
                </button>
              </div>
            </div>
            ))
          }
        </div>
    </>
  );
}
​