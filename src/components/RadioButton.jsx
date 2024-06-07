import React from 'react';

const RadioButton = ({ id, name, value, checked, onChange, label }) => {
  return (
    <div className="w-1/2 border-r-[1px] border-[#cccccc] flex  justify-center items-center px-2 gap-[12px] h-[44px]">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        className={`w-5 h-5 ${checked ? 'bg-[#7F56D9]' : 'border-[1px] bg-white border-[#cccccc]'}  rounded-full`}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default RadioButton;
