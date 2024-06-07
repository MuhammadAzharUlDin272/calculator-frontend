import React, { useState } from 'react'
import Sidediv from '../Auth/Sidediv'
import { useAuth } from '../../AuthProvider';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { setTenderId } from '../../slices/tenderslice';

const TenderForm = () => {
  const dispatch = useDispatch();
  const user = useAuth();
  const userId = user?.user;
  const navigate=useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const price = useSelector(state => Math.round(state.items.totalPrice));;
  const baselineForm = useSelector(state => state.items.baseline);
  const distance = useSelector(state => state.items.distanceInKm);
  const distanceprice = useSelector(state => state.items.distancePrice);
  const originfloorprice = useSelector(state => state.items.originfloorprice);
  const destinationfloorprice = useSelector(state => state.items.destinationfloorprice);
  const origintruckaccessprice = useSelector(state => state.items.origintruckaccessprice);
  const destinationtruckaccessprice = useSelector(state => state.items.destinationtruckaccessprice);
  const itemsprice = useSelector(state => state.items.itemsPrice);
  const items = useSelector(state => state.items.items);
  const assembledItems = useSelector(state => state.items.assembledItems);
  const disassembledItems = useSelector(state => state.items.disassembledItems);
  const boxesPrice = useSelector(state => state.items.boxesPrice);
  const boxes = useSelector(state => state.items.boxes);
  const originCranePrice = useSelector(state => state.items.originCranePrice);
  const destinationCranePrice = useSelector(state => state.items.destinationCranePrice);
  const packingprice = useSelector(state => state.items.packingprice);
  const [form, setForm] = useState({
    phonenumber: "",
    name: "",
    starthours: "",
    endhours: "",
    transportdate: "",
    arrivaldate: "",
    additionalDetails: "",
    movingPrice: price,
    originaddress: baselineForm.originaddress,
    destinationaddress: baselineForm.destinationaddress,
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
		e.preventDefault();
		if (form.name.trim() === "") {
			toast.error('Please fill in full name');
			return;
		}
		if (form.phonenumber.trim() === "") {
			toast.error('Please fill in phone number');
			return;
		}
		if (form.transportdate.trim() === "") {
			toast.error('Please select the date of transport');
			return;
		}
		if (form.arrivaldate.trim() === "") {
			toast.error('Please select the date of arrival');
			return;
		}
		if (form.starthours.trim() === "") {
			toast.error('Please select the start hours');
			return;
		}
		if (form.endhours.trim() === "") {
			toast.error('Please select the end hours');
			return;
		}
		if (form.additionalDetails.trim() === "") {
			toast.error('Please provide additional details');
			return;
		}
		try {
			const response = await axios.post('https://homecalculatorbackend-ni04.onrender.com/api/tenders/sendtender', {
				userId,
				name: form.name,
				phonenumber: form.phonenumber,
				additionalDetails: form.additionalDetails,
				movingPrice: form.movingPrice,
				originaddress: form.originaddress,
				destinationaddress: form.destinationaddress,
				transportdate: form.transportdate,
				arrivaldate: form.arrivaldate,
				starthours: form.starthours,
				endhours: form.endhours,
			});
			await axios.post('https://homecalculatorbackend-ni04.onrender.com/api/tenders/tenderdetails', {
				tenderId: response?.data?.tenderId,
				originaddress: baselineForm.originaddress,
				distance: distance,
				distanceprice: distanceprice,
				destinationaddress: baselineForm.destinationaddress,
				originfloor: baselineForm.originfloor,
				itemsprice: itemsprice,
				originfloorprice: originfloorprice,
				destinationfloor: baselineForm.destinationfloor,
				destinationfloorprice: destinationfloorprice,
				origintruckAccess: baselineForm.origintruckAccess,
				origintruckaccessprice: origintruckaccessprice,
				destinationtruckAccess: baselineForm.destinationtruckAccess,
				destinationtruckaccessprice: destinationtruckaccessprice,
				items: items,
				assembledItems: assembledItems,
				disassembledItems: disassembledItems,
				boxes: boxes,
				boxesPrice: boxesPrice,
				originCranePrice: originCranePrice,
				destinationCranePrice: destinationCranePrice,
				packingprice: packingprice,
			});
      dispatch(setTenderId(response?.data?.tenderId));
      navigate(`/userdashboard`);
			setFormSubmitted(true);
			// Handle any additional logic, such as redirecting to another page
		} catch (error) {
			toast.error('An error occurred. Please try again later.');
			// Handle any error messages or logging
		}
	};
  return (
    <div className='grid grid-cols-12 h-screen'>
      <Sidediv />
      <div className='md:col-span-8 col-span-12 bg-white'>
        <div className='flex justify-center items-center flex-col h-full'>
          <h1 className="text-2xl mb-2 align-center">
            Interested in a tender?
          </h1>
          <h2 className="text-md p-4 text-slate-500 text-center">
            Let us do the hard work for you.
            <br />
            You just leave details, and we will take care of locating you
            The best offer!
          </h2>

          <h3 className="text-md my-4 text-slate-400">
            Please note - flexibility in delivery dates and times is possible
            Help you get better offers.
          </h3>
          <div className='flex flex-col'>
            <div className='flex '>
              <div className='mr-3'>
                <h3 className='mb-1'>Full Name</h3>
                <input
                  name='name'
                  value={form.name}
                  onChange={handleFormChange}
                  className='w-[200px] h-[44px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <h3 className='mb-1'>Phone Number</h3>
                <input
                  name='phonenumber'
                  value={form.phonenumber}
                  onChange={handleFormChange}
                  className='w-[200px] h-[44px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
            <div className='flex '>
              <div className='mr-3'>
                <h3 className='mb-1'>Date of Transport</h3>
                <input
                  type='date'
                  name='transportdate'
                  value={form.transportdate}
                  onChange={handleFormChange}
                  className='w-[200px] h-[44px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <h3 className='mb-1'>Date of Arrival</h3>
                <input
                  type='date'
                  name='arrivaldate'
                  value={form.arrivaldate}
                  onChange={handleFormChange}
                  className='w-[200px] h-[44px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
            <div className='flex '>
              <div className='mr-3'>
                <h3 className='mb-1'>Starting Time</h3>
                <input
                  type='time'
                  name='starthours'
                  value={form.starthours}
                  onChange={handleFormChange}
                  className='w-[200px] h-[44px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <h3 className='mb-1'>Ending Time</h3>
                <input
                  type='time'
                  name='endhours'
                  value={form.endhours}
                  onChange={handleFormChange}
                  className='w-[200px] h-[44px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
            <h3 className='mb-1'>More Details</h3>
            <textarea
              name='additionalDetails'
              value={form.additionalDetails}
              onChange={handleFormChange}
              className='w-[410px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
              placeholder="Enter your More Details"
              rows="3"
            />
            <button className='bg-[#2676E5] w-full text-white p-2 mt-5 rounded-md' onClick={handleSubmit}>Create a tender</button>
          </div>
        </div>
      </div>
    </div >
  )
}

export default TenderForm