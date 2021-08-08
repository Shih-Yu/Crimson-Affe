import React from 'react';
import logo from "../assets/home_logo.png"
import { pageTemplate, flex, logoImage } from './styles/Home';

export default function Home() {
  return (
    <div style={ flex }>
      <div>
        <img src={ logo } alt="Affe logo" style={ logoImage } />
      </div>
    <div style={pageTemplate}>
      <h1 style={{margin: "0", textAlign: "center"}}>Home</h1>
      <p style={{margin: "0"}}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam magni accusamus deserunt beatae, praesentium fuga, ab, repudiandae totam voluptatibus libero a aut. Dolores officiis, ipsum vero tempora eius soluta totam.</p>
      </div>
      </div>
  )
}
