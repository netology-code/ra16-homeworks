import React from 'react';
import logo from './logo.svg';
import './css/main.css';
import ShopItemFunc from './ShopItemFunc'

const item = {
  brand: 'Tiger of Russia',
  title: 'Leonard coat',
  description: 'Minimalistic coat in cotton-blend',
  descriptionFull: 'Men\'s minimalistic overcoat in cotton-blend. Features a stand-up collar, concealed front closure and single back vent. Slim fit with clean, straight shape. Above-knee length.',
  price: 399,
  currency: 'RUB'
}

function App() {
  return (
    <div className="container">
      <div className="background-element"></div>
      <div className="highlight-window">
        <div className='highlight-overlay'></div>
      </div>
      <div className="window">
        <ShopItemFunc item={item} />
      </div>
    </div>  
  );
}

export default App;
