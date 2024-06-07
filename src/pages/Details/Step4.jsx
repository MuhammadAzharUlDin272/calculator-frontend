import React from 'react';
import TruckBtn from '../../components/TruckBtn';
import { boxes_img, cute_boxes } from '../../assets';

const Step4 = ({ progress, handleProgressChange, step }) => {
    return (
        <div className="flex justify-center items-center flex-col h-full">
            <h1 className='md:text-5xl text-3xl font-semibold mt-10 mb-5'>Add boxs to your truck</h1>
            <p className='mt-6'>Bags also count as boxs</p>

            {/* Progress bar */}
            <div className="flex justify-center items-center mt-8 px-3">
                <p className='mr-8 font-medium'>I dont have at all</p>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleProgressChange}
                    style={{
                        width: '35%', // Adjust width as needed
                        background: `linear-gradient(to right, #ff7f0e 0%, #ff7f0e ${progress}%, #868686 ${progress}%, #868686 100%)`, // Orange to grey gradient
                        appearance: 'none', // Removes default styles
                        height: '13px', // Adjust height as needed
                        borderRadius: '5px', // Rounded corners
                        outline: 'none', // Removes outline
                    }}
                />
                <p className='ml-8 font-medium'>I have to many</p>
            </div>

            <div className="text-center text-2xl mt-4 font-semibold pb-8">
                <p>{progress}</p>
            </div>
            <TruckBtn onClick={step} />
            {/* Background image */}
            <img src={boxes_img} alt="background" className='absolute bottom-0 w-full h-1/2 -z-20' />

            {/* Cute boxes component */}
            <img src={cute_boxes} alt="cute boxes" className='absolute bottom-0 right-36 h-1/3 -z-20 mb-16 hidden lg:block' />
        </div>
    )
}

export default Step4