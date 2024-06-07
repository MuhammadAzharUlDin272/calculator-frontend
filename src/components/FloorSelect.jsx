import React from 'react';

const FloorSelect = ({ name, value, onChange, options }) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="px-2 h-[44px] w-[82px] border border-[#cccccc] border-opacity-100 rounded-md bg-white"
    >
      {options.map((option, index) => (
        <option key={index} value={option} className="bg-[#96E0F8]">
          {option}
        </option>
      ))}
    </select>
  );
};

export default FloorSelect;
