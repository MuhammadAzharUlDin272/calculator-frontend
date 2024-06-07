import React, { useRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';

const GoogleCityAutocomplete = ({ value, onChange, name, placeholder, onPlaceSelect }) => {
  const autocompleteRef = useRef(null);

  const handlePlaceSelect = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      if (place && place.name) {
        onChange({ target: { name, value: place.name } }); // Pass the selected address to onChange
      }
    }
  };

  return (
    <Autocomplete
      onLoad={autocomplete => { autocompleteRef.current = autocomplete; }}
      onPlaceChanged={handlePlaceSelect}
    >
      <input
        value={value}
        onChange={(e) => onChange(e)}
        name={name}
        className='md:w-[400px] w-[300px] h-[44px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none'
        placeholder={placeholder}
      />
    </Autocomplete>
  );
};

export default GoogleCityAutocomplete;
