import React from 'react';

const Loader = ({ placement }) => {
  return (
    <div className='loader-Outer-div' style={placement}> 
      <div className="ldsEllipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
