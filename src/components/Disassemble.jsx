import React, { useState, useEffect} from 'react'
import { IoIosAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { useSelector, useDispatch } from 'react-redux';
import { addDisassembledItems, changeDisassembledItemQuantity, removeDisassembledItem } from '../slices/slices';
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";


const Disassemble = () => {
    const items = useSelector(state => state.items.items);   
    const disassembledItems = useSelector(state => state.items.disassembledItems)
    const [toggle, setToggle] = useState(false)
    const [listToggle, setListToggle] = useState(false)
    const [disassembleItems, setDisasembleItems] = useState(disassembledItems)
    const dispatch = useDispatch()
    
    const handleItemSelect = index => {
        const selectedItem = items[index];
        setDisasembleItems(prevSelectedItems =>
            prevSelectedItems.includes(selectedItem)
                ? prevSelectedItems.filter(item => item !== selectedItem)
                : [...prevSelectedItems, selectedItem]
        );
    };
    
    const handleSelectAll = () => {
        setDisasembleItems(items);
    };

    const handleQuantityChange = (name, change) => {
    
        setDisasembleItems(prevItems => {
            const newItems = prevItems.map((item, index) => {
                if (item.name === name) {
                    // Calculate the maximum quantity that can be added without exceeding the total available
                    const maxQuantity = items.find(i => i.name === name).quantity;
                    const updatedQuantity = Math.min(item.quantity + change, maxQuantity);
                    if (updatedQuantity <= 0) {
                        dispatch(removeDisassembledItem({ item }));
                        return null; // Returning null to be filtered out later
                    }
                    return { ...item, quantity: updatedQuantity };
                }
                return item;
            });
    
            return newItems.filter(item => item !== null && item.quantity > 0); // Filtering out null items
        });
        dispatch(changeDisassembledItemQuantity({ name, change }));

    };
    
    

    useEffect(() => {
        dispatch(addDisassembledItems(disassembleItems))
    }, [disassembleItems, dispatch])
    
    

  return (
    <div className='bg-white md:w-full w-[300px] p-4 rounded-md relative flex flex-col mb-5'>
        <div className='flex w-full justify-between'>
            <button onClick={()=>setToggle((prev)=>!prev)}>
                {toggle===true ? <FaAngleUp /> : <FaAngleDown />}
            </button>
            <h4>assembly</h4>
        </div>
        <div className={`${toggle ? 'block' : 'hidden'} ${listToggle && 'hidden'} flex flex-col w-full justify-center items-center gap-2 mt-4`}>
            <p className='text-md text-center md:w-[400px] w-[250px]'>Storage services allow you to store the contents of the apartment for a certain period. Set a start date, and an estimated end date of the required storage period.</p>
            {disassembleItems.map((item, index) => (
                <div key={index} className='flex justify-between w-full p-2'>
                <div className='flex gap-5'>
                  <button onClick={() => handleQuantityChange(item.name, 1)}>
                    <IoIosAdd className='bg-[#96E0F8] text-white w-5 h-5 rounded-md' />
                  </button>
                  <p>{item.quantity}</p>
                  <button onClick={() => handleQuantityChange(item.name, -1)}>
                    <RiSubtractFill className='bg-[#96E0F8] text-white w-5 h-5 rounded-md' />
                  </button>
                </div>
                <div className='flex gap-2 items-center'>
                  <p>{item.name}</p>
                  {/* <button onClick={()=>handleSelectChange(item)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 24 24">
                      <g fill="black" fill-rule="evenodd" clip-rule="evenodd">
                        <path fill="#7F56D9" d="M5.47 5.47a.75.75 0 0 1 1.06 0l12 12a.75.75 0 1 1-1.06 1.06l-12-12a.75.75 0 0 1 0-1.06" />
                        <path fill="#7F56D9" d="M18.53 5.47a.75.75 0 0 1 0 1.06l-12 12a.75.75 0 0 1-1.06-1.06l12-12a.75.75 0 0 1 1.06 0" />
                      </g>
                    </svg>
                  </button> */}
                </div>
              </div>
            ))}
            <button className='flex gap-2 items-center justify-end' onClick={()=>setListToggle((prev)=>!prev)}>
                <span>Add items</span>
                <span>
                    <FaCirclePlus className='text-blue-500' />
                </span>
            </button>
        </div>
        <div className={`${listToggle ? 'block' : 'hidden'} flex flex-col w-full justify-center items-center gap-2 mt-4 border-[1px] border-gray-200 rounded-t-md max-h-[200px]`}>
            <div className="flex flex-col justify-end w-full">
                <div className="mt-2 flex gap-2 items-center justify-end w-full hover:bg-gray-100 cursor-pointer pr-2" onClick={()=>handleSelectAll()}>Select all</div>
                <div className="max-h-[150px] overflow-y-auto">
                    {items.map((item, index) => {
                        const isSelected = disassembleItems.some(selectedItem => selectedItem.name === item.name);
                        return(
                            <div className="flex gap-2 items-center justify-end w-full hover:bg-gray-100 cursor-pointer" onClick={()=>handleItemSelect(index)} key={index}>
                                <p className="mr-2">
                                    {item.name}
                                </p>
                                {isSelected && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 24 24">
                                    <path fill="#7F56D9" d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59z" />
                                </svg>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
        <div className={`${listToggle ? 'block' : 'hidden'} w-full border-[1px] border-gray-200 rounded-b-md p-4 flex justify-center`}>
            <button className='bg-[#008EF5] hover:bg-blue-600 text-white px-6 py-2 rounded-md' onClick={()=>{setListToggle(false)}}>Close</button>
        </div>
    </div>
  )
}

export default Disassemble
