import React from 'react';
import FloorSelect from '../../components/FloorSelect';
import GooglePlacesAutocomplete from '../../components/GooglePlacesAutocomplete';
import RadioButton from '../../components/RadioButton';
import TruckBtn from '../../components/TruckBtn';
import { firstballoon, secondballoon, thirdballoon } from '../../assets';

const Step2 = ({ form, handleFormChange, step }) => {
    return (
        <div className="flex justify-center items-center flex-col h-full">
            <h1 className="md:text-5xl text-3xl font-semibold mt-10 mb-5">Landing</h1>
            <h2 className="text-sm">Enter the details of your destination address</h2>

            {/* address */}
            <div className="flex flex-col">
                <h3 className='mb-1 mt-10'>Destination address</h3>
                <GooglePlacesAutocomplete value={form.destinationaddress} onChange={handleFormChange} name="destinationaddress" placeholder="Select destination address" />
                <div className='flex justify-between'>
                    <div>
                        <h3 className='mb-1 mt-5'>Is there an elevator?</h3>
                        <div className='flex gap-2 border-[1px] border-[#cccccc] rounded-md bg-white w-[200px]'>
                            <RadioButton id="elevatorthree" name="destinationelevator" value="yes" checked={form.destinationelevator === "yes"} onChange={handleFormChange} label="Yes" />
                            <RadioButton id="elevatorfour" name="destinationelevator" value="no" checked={form.destinationelevator === "no"} onChange={handleFormChange} label="No" />
                        </div>
                    </div>
                    <div>
                        <h3 className='mb-1 mt-5'>Select floor number</h3>
                        <FloorSelect name="destinationfloor" value={form.destinationfloor} onChange={(e) => handleFormChange(e)} options={[...Array(20)].map((_, index) => index + 1)} />
                    </div>
                </div>
                <h3 className='mb-1 mt-5'>Truck access</h3>
                <div className='flex gap-2 border-[1px] border-[#cccccc] bg-white rounded-md w-[300px] h-[44px]'>
                    <RadioButton id="accessfour" name="destinationtruckAccess" value="easy" checked={form.destinationtruckAccess === "easy"} onChange={handleFormChange} label="Easy" />
                    <RadioButton id="accessfive" name="destinationtruckAccess" value="medium" checked={form.destinationtruckAccess === "medium"} onChange={handleFormChange} label="Medium" />
                    <RadioButton id="accesssix" name="destinationtruckAccess" value="hard" checked={form.destinationtruckAccess === "hard"} onChange={handleFormChange} label="Hard" />
                </div>
            </div>

            {/* access to truck */}
            <div className='flex flex-col justify-end items-end px-8 mt-[30px]'>
            </div>
            {/* moving truck button */}
            <TruckBtn onClick={step} />
            <img src={firstballoon} alt="firstballoon" className='parcel-animation absolute bottom-0 md:h-40 h-20 left-[200px] -z-30' />
            <img src={thirdballoon} alt="thirdballoon" className='parcel-animation absolute bottom-0 md:h-36 h-16 left-[100px] -z-30' />
            <img src={secondballoon} alt="secondballoon" className='parcel-animation absolute bottom-0 md:h-32 h-12 left-[20px] -z-30' />
        </div>
    );
};

export default Step2;
