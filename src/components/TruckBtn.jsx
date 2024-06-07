import React from 'react';
import { arrow, truck } from '../assets';

const TruckBtn = ({onClick}) => {
    return (
        <div className="w-full flex justify-center mt-[40px]">
            <div className='text-white text-lg  '>
                <button onClick={onClick} className='w-full flex gap-5 items-center justify-center'>
                    <img src={truck} alt="truck" className='moving-truck ml-96' />
                </button>
                <div className='w-full flex items-center justify-center'>
                    <img src={arrow} alt="arrow" />
                </div>
                <h2 className='w-full text-xl flex items-center justify-center bm-font'>Click <span className='text-orange-500 px-2'>n</span>Move</h2>
            </div>
        </div>
    )
}

export default TruckBtn