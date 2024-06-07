import { useJsApiLoader } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';
import { FaCircleChevronLeft } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { basebg, crane2, items_bg, progress_bar, progress_bar_baseline, progress_bar_destination, progress_bar_items, progress_bar_services, servicesbg2, sun } from '../assets';
import Assemble from '../components/Assemble';
import Cloud from '../components/Cloud';
import Crane from '../components/Crane';
import Disassemble from '../components/Disassemble';
import Packaging from '../components/Packaging';
import Storage from '../components/Storage';
import TruckBtn from '../components/TruckBtn';
import SmallCloud from '../components/smallCloud';
import { listOfItems } from "../constants/index";
import { addBaseline, addBoxes, addItems, calculate, changeItemQuantity, removeItem } from '../slices/slices';
import { getDistance } from '../utils';
import Step1 from './Details/Step1';
import Step2 from './Details/Step2';
import Step3 from './Details/Step3';
import Step4 from './Details/Step4';
import { decrementCount, resetCount, setCount } from '../slices/countslice';

const Baseline = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const baselineForm = useSelector(state => state.items.baseline);
  const Boxes = useSelector(state => state.items.boxes);
  const [progress, setProgress] = useState(Boxes);
  const [form, setForm] = useState(baselineForm);
  const [form1,setform1]=useState({
    progress: 0,
  })
  const count = useSelector(state => state.count.count);
  //lists
  const reduxItems = useSelector(state => state.items.items);
  const [selectedItems, setSelectedItems] = useState(reduxItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => { }, [count]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAuIchE5mdfEw_S7oM8I5ZkpCcQyWOMg-Y',
    libraries: ['places']
  })

  const handleInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filteredItems = listOfItems.filter(item =>
      item.heading.toLowerCase().includes(query)
    );
    setFilteredItems(filteredItems);
  };

  const handleQuantityChange = (name, change) => {
    setSelectedItems(prevItems => {
      const newItems = prevItems.map(item => {
        if (item.name === name) {
          const updatedQuantity = item.quantity + change;
          if (updatedQuantity <= 0) {
            dispatch(removeItem({ item }));
            return null; // Returning null to be filtered out later
          }
          return { ...item, quantity: updatedQuantity };
        }
        return item;
      });
      return newItems.filter(item => item !== null && item.quantity > 0); // Filtering out null items
    });
    dispatch(changeItemQuantity({ name, change }));
  };


  const handleSelectChange = (item) => {
    const isItemSelected = selectedItems.some(i => i.name === item.name);

    if (isItemSelected) {
      const updatedSelectedItems = selectedItems.filter(i => i.name !== item.name);
      setSelectedItems(updatedSelectedItems);
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }

    dispatch(removeItem({ item }))
  };

  useEffect(() => {
    setFilteredItems(listOfItems)
  }, [])
  //list end

  const state = useSelector(state => state.items);

  const handleCalculate = async () => {
    const distance = await getDistance(baselineForm.originaddress, baselineForm.destinationaddress);
    
    if (distance?.data?.price !== null) {
      dispatch(calculate({ ...state, distance: distance?.data?.price,distanceInKm:distance?.data?.distanceInKm }));
      dispatch(resetCount())
    }
    navigate('/summary');
  };

  const handleProgressChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value >= 0 && value <= 100) {
      setform1((prevForm) => ({
        ...prevForm,
        progress: value, // Add progress to the form state
      }));
      setProgress(value); // Update the local progress state
    }
  };


  const stepone = () => {
    if (form.originaddress === "") {
      toast.error('Please fill your origin address');
      return;
    }
    dispatch(setCount(2));
  }
  const steptwo = () => {
    if (form.destinationaddress === "") {
      toast.error('Please fill your destination address');
      return;
    }
    dispatch(addBaseline({originaddress: form.originaddress,originfloor:form.originfloor,originelevator:form.originelevator,origintruckAccess:form.origintruckAccess,
      destinationaddress: form.destinationaddress,destinationfloor:form.destinationfloor,destinationelevator:form.destinationelevator,destinationtruckAccess:form.destinationtruckAccess
    }))
    dispatch(setCount(3));
  }

  const stepthree = () => {
    dispatch(addItems(selectedItems));
    dispatch(setCount(4));
  }

  const stepfour = () => {
    dispatch(addBoxes(progress));
    dispatch(setCount(5));
  }

  const progressbar = (count) => {
    switch (count) {
      case 1: return progress_bar_baseline;
      case 2: return progress_bar_destination;
      case 3: return progress_bar_items;
      case 4: return progress_bar;
      case 5: return progress_bar_services;
    }
  }

  const handleprevious = () => {
    dispatch(decrementCount());
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === 'originfloor' || name === 'destinationfloor') {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: parseInt(value), // Parse the value to ensure it's an integer
      }));
    } else {
      setForm({ ...form, [name]: value });
    }
  };


  if (!isLoaded) {
    return <h1>loading</h1>
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <img src={progressbar(count)} className='h-2 mt-4 w-full px-6' />
      <div className="absolute md:top-[124px] top-[60px] left-[58px] max-md:left-[14px] md:w-[250px] w-[150px] md:h-[140px] h-[120px] -z-[20]">
        <Cloud />
      </div>
      <div className="absolute md:top-[207px] top-[110px] right-[10px] md:right-[50px] md:w-[250px] w-[120px] h-[118px] -z-[20]">
        <Cloud />
      </div>
      <div className="absolute md:top-[134px] top-[100px] md:right-[50px] right-[150px] md:w-[100px] w-[80px] h-[62px] -z-[20]">
        <SmallCloud />
      </div>
      <img src={sun} alt="sun" className="absolute top-5 right-[20px] md:h-28 h-20 -z-[20]" />

      {count == 1 && isLoaded && (
        <Step1 form={form} handleFormChange={handleFormChange} step={stepone} />
      )}

      {count == 2 && (
        <Step2 form={form} handleFormChange={handleFormChange} step={steptwo} />
      )}

      {count == 3 && (
        <Step3 handleInputChange={handleInputChange} filteredItems={filteredItems} selectedItems={selectedItems} handleQuantityChange={handleQuantityChange} handleSelectChange={handleSelectChange} step={stepthree} searchQuery={searchQuery} />
      )}

      {count == 4 && (
        <Step4 progress={progress} handleProgressChange={handleProgressChange} step={stepfour} />
      )}
      {
        count == 5 && (
          <div className="flex justify-center items-center flex-col h-full">
            <h1 className='mt-20 font-semibold text-3xl px-3'>Additional service</h1>

            <Assemble />
            <Disassemble />
            <Packaging />
            <Storage />
            <Crane />

            {/* moving truck button */}
            <div className="w-full flex justify-center mt-4">
              <TruckBtn onClick={handleCalculate} />
            </div>
            <div className="absolute top-[244px] left-[58px] max-md:left-[14px] w-[250px] h-[140px] -z-[40]">
              <img src={crane2} alt="crane" />
            </div>
          </div>
        )
      }
      {count > 1 && (
        <FaCircleChevronLeft className='block absolute top-10 left-2 md:top-1/2 md:left-10 w-10 h-10 mr-10 text-[#008EF5] hover:text-[#006EF5]' onClick={handleprevious} />
      )}

      {/* base */}
      <div className="flex flex-col w-full items-center md:h-[150px]">
        {/* <img src={marker} alt="marker" className='absolute bottom-14 right-10 w-26 h-40 max-md:w-14 max-md:h-24 z-30'/>
        <img src={grass} alt="grass" className='z-20 w-full object-cover'/> */}
        {count <= 2 && (
          <img src={basebg} alt="grayslab" className='-z-20 w-full object-cover' />
        )}
        {count == 3 && (
          <img src={items_bg} alt="items_bg" className="w-full" />
        )}
        {count == 5 && (
          <img src={servicesbg2} alt="services_bg" />
        )}
      </div>
    </div>
  )
}

export default Baseline;
