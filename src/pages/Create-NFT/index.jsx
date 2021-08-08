import React from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { pageTemplate, form, h1 } from './styles/createNFT'


export default function CreateNFT() {
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
          <Button style={ { backgroundColor: "#fdbe02", border: "none" }} type="submit">
            Submit
          </Button>
        </Form>
      </fieldset>
    </div>
  );
}
