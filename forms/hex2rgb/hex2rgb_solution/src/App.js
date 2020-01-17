import React, { useState } from 'react';
import './App.css';
import InputHex from './components/InputHex';
import HexToRgb from './components/HexToRgb';

function Convert(props) {
  const [hexCode, setHexCode] = useState({
    name: ''
  })

  const handleSubmit = evt => {
    evt.preventDefault();
    setHexCode(prevForm => ({...prevForm, name: evt.target[0].value}))
    evt.persist()
  }

  console.log(hexCode.name);

  return (
    <form className='wrap-background' onSubmit={handleSubmit}> 
      <div className='wrap-main absolute'>
        <div className='wrap-main'>
          <input id="hexName" name="hexCode" type='text'/>
        </div>
        <HexToRgb hexCode={hexCode.name}/>
      </div>
      
      {/* <InputHex /> */}
    </form>
  )
}

Convert.propTypes = {

}

export default Convert