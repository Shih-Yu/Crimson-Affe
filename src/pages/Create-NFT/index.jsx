import React from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { pageTemplate, form, h1 } from "./styles/createNFT";
import { useState } from "react";
import { ethers } from "ethers";
import { RouterBrowser as Redirect } from "react-router-dom";
import { NFTStorage, File } from "nft.storage";

// NFT.Storage connection
const apiKey = process.env.NFTSTORAGE_KEY;
const client = new NFTStorage({ token: apiKey });

export default function CreateNFT() {
  const [file, setFile] = useState(null);
  const [formInput, setFormInput] = useState({
    name: "",
    artPiece: "",
    price: "",
    description: "",
  });

  async function onChange(event) {
    const files = event.target.files[0];
    try {
      const metadata = await client.store({
        name: "",
        artPiece: "",
        price:"",
        description: "",
        image: new File(files)
      })
    } catch(error) {
      console.log(error)
  }
  
  
  return (
    <div style={pageTemplate}>
      <fieldset style={form}>
        <div style={h1}>
          <h1>Curate NFT</h1>
        </div>

        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Artist Name</Form.Label>
            <Form.Control type="text" placeholder="Artist Name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Name of Art Piece</Form.Label>
            <Form.Control type="text" placeholder="Art Name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Price In Matic</Form.Label>
            <Form.Control type="text" placeholder="Price" />
          </Form.Group>

          <FloatingLabel controlId="floatingTextarea2" className="mb-2" label="Description">
            <Form.Control
              as="textarea"
              placeholder="Description of Art"
              style={{ height: "100px" }}
            />
          </FloatingLabel>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload File</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          <Button style={{ backgroundColor: "#fdbe02", border: "none" }} type="submit">
            Submit
          </Button>
        </Form>
      </fieldset>
    </div>
  );
}
