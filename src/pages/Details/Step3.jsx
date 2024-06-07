import React from 'react';
import { IoIosAdd } from 'react-icons/io';
import { RiSubtractFill } from 'react-icons/ri';
import TruckBtn from '../../components/TruckBtn';

const Step3 = ({ handleInputChange, filteredItems, selectedItems, handleQuantityChange, handleSelectChange, step, searchQuery }) => {
    return (
        <div className="flex justify-center items-center flex-col h-full">
            <h1 className="md:text-5xl text-3xl font-semibold mt-10 mb-5">Add items to your truck</h1>

            <div className='flex flex-col'>
                <h2 className='mb-1 mt-10'>Search Items</h2>
                <input
                    type="text"
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    style={{ maxHeight: "100px" }}
                    placeholder="Wardrobe, Refrigerator,Drawers"
                    value={searchQuery}
                />
                <div className='bg-white w-full text-black rounded-md max-h-[200px] overflow-y-scroll'>
                    {filteredItems.map((item, index) => (
                        <div key={index} className="p-2">
                            <div>
                                <h2 className='font-bold text-lg bg-gray-200 p-1'>{item.heading}</h2>
                                <ul>
                                    {item.subheading.map((subItem, subIndex) => {
                                        const isSelected = selectedItems.some(selectedItem => selectedItem.name === subItem.name);

                                        return (
                                            <li key={subIndex} className="cursor-pointer hover:bg-gray-100 flex gap-2 items-center" onClick={() => handleSelectChange(subItem)}>
                                                {isSelected && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 24 24">
                                                        <path fill="#7F56D9" d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59z" />
                                                    </svg>
                                                )}
                                                {subItem.name}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='flex flex-col w-full items-center py-2 mb-5'>
                    {selectedItems.map((item, index) => (
                        <div key={index} className='flex justify-between w-full p-2'>
                            <div className='flex gap-5'>
                                <button onClick={() => handleQuantityChange(item.name, 1)}>
                                    <IoIosAdd className='bg-white rounded-md w-5 h-5' />
                                </button>
                                <p>{item.quantity}</p>
                                <button onClick={() => handleQuantityChange(item.name, -1)}>
                                    <RiSubtractFill className='bg-white rounded-md w-5 h-5' />
                                </button>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <p>{item.name}</p>
                                <button onClick={() => handleSelectChange(item)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 24 24">
                                        <g fill="black">
                                            <path fill="#7F56D9" d="M5.47 5.47a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 0 1-1.06-1.06l3-3a.75.75 0 0 1 1.06 0" />
                                            <path fill="#7F56D9" d="M18.53 5.47a.75.75 0 0 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06-1.06l3-3a.75.75 0 0 1 0-1.06" />
                                        </g>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <TruckBtn onClick={step} />
        </div>
    );
};

export default Step3;
