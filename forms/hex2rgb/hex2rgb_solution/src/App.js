import React from 'react';
import './App.css';
import InputHex from './components/InputHex';

function Convert(props) {
    
    const handleSubmit = evt => {
      evt.preventDefault();
    }

      return (
        <form onSubmit={handleSubmit}> 
          <InputHex />
        </form>
      )
}

Convert.propTypes = {

}

export default Convert