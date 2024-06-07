import React from 'react'
import { home_bg, hotairballoon, newCloud } from '../../assets';

const Sidediv = () => {
    return (
        <div className='md:col-span-4 md:flex md:flex-col hidden relative'>
            <div className=" w-[200px] h-[90px] ml-5">
                <img src={newCloud} alt="Cloud" className="cloud" />
            </div>
            <h2 className='text-4xl mt-5 font-bold text-center text-white'>Click <span className='text-orange-500 px-2'>n</span><span className='text-white'>Move</span></h2>
            <div className='flex justify-end mt-5'>
                <div className=" w-[100px] h-[50px] mr-10">
                    <img src={newCloud} alt="Cloud" className="smallcloud" />
                </div>
                <div className="w-[180px] h-[70px]">
                    <img src={newCloud} alt="Cloud" className="cloud" />
                </div>
            </div>
            <div className="w-[80px] h-[50px] mt-9 flex justify-center items-center mx-auto">
                <img src={hotairballoon} alt="Cloud" className="smallcloud delay-500" />
            </div>
            <div className='w-full h-[200px] mt-20 flex justify-end'>
                <img src={home_bg} alt="home_bg" className="w-full" />
            </div>
        </div>
    )
}

export default Sidediv