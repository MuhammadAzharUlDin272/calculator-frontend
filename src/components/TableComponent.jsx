import React from 'react';
import { MdEdit } from "react-icons/md";
import { useSelector } from 'react-redux';
import { pin, couch } from '../assets';

const TableComponent = () => {
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
    const price = useSelector(state => Math.round(state.items.totalPrice));;
    return (
        <div className='bg-white p-20'>
            <h2 className='text-center mb-5 font-bold text-xl'>Total Cost: {price}</h2>
            <table className='border border-black'>
                <thead>
                    <tr className='bg-gray-100 p-2 border border-black'>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Cost</th>
                        <th>Amount</th>
                        <th>Total Cost</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='bg-[#E4E4EF]  p-5 border border-black'>
                        <td colSpan={6}><img src={pin} alt="background" className='h-8 mr-5' />
                            <h2>Distance</h2></td>
                    </tr>
                    <tr className='bg-gray-100 p-2 border border-black'>
                        <td></td>
                        <td><h3>Start address</h3><p>{baselineForm.originaddress}</p></td>
                        <td>2 NIS</td>
                        <td>{distance}</td>
                        <td>{distanceprice}NIS</td>
                        <td><MdEdit className='text-blue-900' /></td>
                    </tr>
                    <tr className='bg-gray-100 p-2 border border-black'>
                        <td></td>
                        <td><h3>Target address</h3><p>{baselineForm.destinationaddress}</p></td>
                        <td>2 NIS</td>
                        <td>{distance}</td>
                        <td>{distanceprice}NIS</td>
                        <td><MdEdit className='text-blue-900' /></td>
                    </tr>
                    <tr className='bg-[#E4E4EF] border border-black'>
                        <td colSpan={6}>
                            <img src={pin} alt="background" className='h-8 mr-5' />
                            <h2>Floor</h2>
                        </td>
                    </tr>
                    <tr className='bg-gray-100 p-2 border border-black'>
                        <td><p>Calculated at 10% for each floor,</p><p>from the cost of each item</p></td>
                        <td><p>{baselineForm.originaddress}</p><h3>Floor {baselineForm.originfloor}</h3></td>
                        <td>10%</td>
                        <td>{itemsprice}NIS</td>
                        <td>{originfloorprice}NIS</td>
                        <td><MdEdit className='text-blue-900' /></td>
                    </tr>
                    <tr className='bg-gray-100 p-2 border border-black'>
                        <td></td>
                        <td><p>{baselineForm.destinationaddress}</p><h3>Floor {baselineForm.destinationfloor}</h3></td>
                        <td>2 NIS</td>
                        <td>{itemsprice}NIS</td>
                        <td>{destinationfloorprice}NIS</td>
                        <td><MdEdit className='text-blue-900' /></td>
                    </tr>
                    <tr className='bg-[#E4E4EF]  p-5 border border-black'>
                        <td colSpan={6}>
                            <img src={pin} alt="background" className='h-8 mr-5' />
                            <h2>Accessibility</h2>
                        </td>
                    </tr>
                    <tr className='bg-gray-100 p-2 border border-black'>
                        <td><p>Calculated at 10% for each level,</p><p>from the cost of each item</p></td>
                        <td><p>{baselineForm.originaddress}</p><h3>{baselineForm.origintruckAccess}</h3></td>
                        <td>10%</td>
                        <td>{itemsprice}NIS</td>
                        <td>{origintruckaccessprice}NIS</td>
                        <td><MdEdit className='text-blue-900' /></td>
                    </tr>
                    <tr className='bg-gray-100 p-2 border border-black'>
                        <td></td>
                        <td><p>{baselineForm.destinationaddress}</p><h3>{baselineForm.destinationtruckAccess}</h3></td>
                        <td>2 NIS</td>
                        <td>{itemsprice}NIS</td>
                        <td>{destinationtruckaccessprice}NIS</td>
                        <td><MdEdit className='text-blue-900' /></td>
                    </tr>
                    <tr className='bg-[#E4E4EF]  p-5 border border-black'>
                        <td colSpan={6}>
                            <img src={couch} alt="background" className='h-8 mr-5' />
                            <h2>Items</h2>
                        </td>
                    </tr>
                    {items.map((item, index) => (
                        <tr key={index} className=" bg-gray-100 p-2 border border-black">
                            <td></td>
                            <td>{item.name}</td>
                            <td>{item.price}NIS</td>
                            <td>{item.quantity}</td>
                            <td>{item.price * item.quantity}NIS</td>
                            <td><MdEdit className='text-blue-900' /></td>
                        </tr>
                    ))}
                    <tr className='bg-[#E4E4EF]  p-5 border border-black'>
                        <td colSpan={6}>
                            <img src={couch} alt="background" className='h-8 mr-5' />
                            <h2>Disassembly</h2>
                        </td>
                    </tr>
                    {disassembledItems.map((item, index) => (
                        <tr key={index} className="  bg-gray-100  p-2 border border-black">
                            <td></td>
                            <td>{item.name}</td>
                            <td>{item.price}NIS</td>
                            <td>{item.quantity}</td>
                            <td>{item.price * item.quantity}NIS</td>
                            <td><MdEdit className='text-blue-900' /></td>
                        </tr>
                    ))}
                    <tr className='bg-[#E4E4EF]  p-5 border border-black'>
                        <td colSpan={6}>
                            <img src={couch} alt="background" className='h-8 mr-5' />
                            <h2>Assemble</h2>
                        </td>
                    </tr>
                    {assembledItems.map((item, index) => (
                        <tr key={index} className="  bg-gray-100  p-2 border border-black">
                            <td></td>
                            <td>{item.name}</td>
                            <td>{item.price}NIS</td>
                            <td>{item.quantity}</td>
                            <td>{item.price * item.quantity}NIS</td>
                            <td><MdEdit className='text-blue-900' /></td>
                        </tr>
                    ))}
                    <tr className='bg-[#E4E4EF]  p-5 border border-black'>
                        <td colSpan={6}>
                            <img src={couch} alt="background" className='h-8 mr-5' />
                            <h2>Boxes</h2>
                        </td>
                    </tr>
                    <tr className="  bg-gray-100  p-2 border border-black">
                        <td></td>
                        <td>Supply of boxes</td>
                        <td>5 NIS</td>
                        <td>{boxes}</td>
                        <td>{boxesPrice}NIS</td>
                        <td><MdEdit className='text-blue-900' /></td>
                    </tr>
                    <tr className='bg-[#E4E4EF]  p-5 border border-black'>
                        <td colSpan={6}>
                            <img src={couch} alt="background" className='h-8 mr-5' />
                            <h2>Crane</h2>
                        </td>
                    </tr>
                    <tr className="  bg-gray-100  p-2 border border-black">
                        <td></td>
                        <td><p>{baselineForm.originaddress}</p><h3>Floor {baselineForm.originfloor}</h3></td>
                        <td>100NIS</td>
                        <td>{originCranePrice}NIS</td>
                        <td>{originCranePrice * 100}NIS</td>
                        <td><MdEdit className='text-blue-900' /></td>
                    </tr>
                    <tr className="  bg-gray-100  p-2 border border-black">
                        <td></td>
                        <td><p>{baselineForm.destinationaddress}</p><h3>Floor {baselineForm.destinationfloor}</h3></td>
                        <td>10 NIS</td>
                        <td>{destinationCranePrice}NIS</td>
                        <td>{destinationCranePrice * 100}NIS</td>
                        <td><MdEdit className='text-blue-900' /></td>
                    </tr>
                    <tr className='bg-[#E4E4EF]  p-5 border border-black'>
                        <td colSpan={6}>
                            <img src={couch} alt="background" className='h-8 mr-5' />
                            <h2>Packing</h2>
                        </td>
                    </tr>
                    <tr className="  bg-gray-100  p-2 border border-black">
                        <td></td>
                        <td><p>{baselineForm.destinationaddress}</p><h3>Floor {baselineForm.destinationfloor}</h3></td>
                        <td>10%</td>
                        <td>{items.length}</td>
                        <td>{packingprice}NIS</td>
                        <td><MdEdit className='text-blue-900' /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TableComponent