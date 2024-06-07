import React from 'react';
import FloorSelect from '../../components/FloorSelect';
import GooglePlacesAutocomplete from '../../components/GooglePlacesAutocomplete';
import RadioButton from '../../components/RadioButton';
import TruckBtn from '../../components/TruckBtn';
import { rocket } from '../../assets';

const Step1 = ({ form, handleFormChange, step }) => {
    return (
        <div className="flex justify-center items-center flex-col h-full">
            <h1 className="md:text-5xl text-3xl font-semibold mt-10 mb-5">Taking off</h1>
            <h2 className="text-sm">Enter the details of your origin address</h2>

            {/* address */}
            <div className="flex flex-col">
                <h3 className='mb-1 mt-10'>Origin address</h3>
                <GooglePlacesAutocomplete value={form.originaddress} onChange={handleFormChange} name="originaddress" placeholder="Select origin address" />
                <div className='flex justify-between'>
                    <div>
                        <h3 className='mb-1 mt-5'>Is there an elevator?</h3>
                        <div className='flex gap-2 border-[1px] border-[#cccccc] rounded-md bg-white w-[200px]'>
                            <RadioButton id="elevatorone" name="originelevator" value="yes" checked={form.originelevator === "yes"} onChange={handleFormChange} label="Yes" />
                            <RadioButton id="elevatortwo" name="originelevator" value="no" checked={form.originelevator === "no"} onChange={handleFormChange} label="No" />
                        </div>
                    </div>
                    <div>
                        <h3 className='mb-1 mt-5'>Select floor number</h3>
                        <FloorSelect name="originfloor" value={form.originfloor} onChange={(e) => handleFormChange(e)} options={[...Array(20)].map((_, index) => index + 1)} />
                    </div>
                </div>
                <h3 className='mb-1 mt-5'>Truck access</h3>
                <div className='flex gap-2 border-[1px] border-[#cccccc] bg-white rounded-md w-[300px] h-[44px]'>
                    <RadioButton id="accessone" name="origintruckAccess" value="easy" checked={form.origintruckAccess === "easy"} onChange={handleFormChange} label="Easy" />
                    <RadioButton id="accesstwo" name="origintruckAccess" value="medium" checked={form.origintruckAccess === "medium"} onChange={handleFormChange} label="Medium" />
                    <RadioButton id="accessthree" name="origintruckAccess" value="hard" checked={form.origintruckAccess === "hard"} onChange={handleFormChange} label="Hard" />
                </div>
            </div>

            {/* access to truck */}
            <div className='flex flex-col justify-end items-end px-8 mt-[30px]'>
            </div>
            {/* moving truck button */}
            <TruckBtn onClick={step} />
            <img src={rocket} alt="rocket" className="rocket-animation absolute bottom-14 left-10 w-26 h-40 max-md:w-24 max-md:h-24 z-10" />
        </div>
    );
};

export default Step1;
