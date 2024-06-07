import React from "react";
import { couch, pin } from "../../assets";
const TenderDetailsDialog = ({ DialogData }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Cost</th>
                    <th>Amount</th>
                    <th>Total Cost</th>
                </tr>
            </thead>
            <tbody>
                <tr className='bg-[#E4E4EF]  p-5'>
                    <td colSpan={5}><img src={pin} alt="background" className='h-8 mr-5' />
                        <h2>Distance</h2></td>
                </tr>
                <tr>
                    <td></td>
                    <td><h3>Start address</h3><p>{DialogData[0]?.originaddress}</p></td>
                    <td>2 NIS</td>
                    <td>{DialogData[0]?.distance?.$numberDecimal}</td>
                    <td>{DialogData[0]?.distanceprice?.$numberDecimal}NIS</td>
                </tr>
                <tr>
                    <td></td>
                    <td><h3>Target address</h3><p>{DialogData[0]?.destinationaddress}</p></td>
                    <td>2 NIS</td>
                    <td>{DialogData[0]?.distance?.$numberDecimal}</td>
                    <td>{DialogData[0]?.distanceprice?.$numberDecimal}NIS</td>
                </tr>
                <tr className='bg-[#E4E4EF]'>
                    <td colSpan={5}>
                        <img src={pin} alt="background" className='h-8 mr-5' />
                        <h2>Floor</h2>
                    </td>
                </tr>
                <tr>
                    <td><p>Calculated at 10% for each floor,</p><p>from the cost of each item</p></td>
                    <td><p>{DialogData[0]?.originaddress}</p><h3>Floor {DialogData[0]?.originfloor}</h3></td>
                    <td>10%</td>
                    <td>{DialogData[0]?.itemsprice?.$numberDecimal}NIS</td>
                    <td>{DialogData[0]?.originfloorprice?.$numberDecimal}NIS</td>
                </tr>
                <tr>
                    <td></td>
                    <td><p>{DialogData[0]?.destinationaddress}</p><h3>Floor {DialogData[0]?.destinationfloor}</h3></td>
                    <td>2 NIS</td>
                    <td>{DialogData[0]?.itemsprice?.$numberDecimal}NIS</td>
                    <td>{DialogData[0]?.destinationfloorprice?.$numberDecimal}NIS</td>
                </tr>
                <tr className='bg-[#E4E4EF]  p-5'>
                    <td colSpan={5}>
                        <img src={pin} alt="background" className='h-8 mr-5' />
                        <h2>Accessibility</h2>
                    </td>
                </tr>
                <tr>
                    <td><p>Calculated at 10% for each level,</p><p>from the cost of each item</p></td>
                    <td><p>{DialogData[0]?.originaddress}</p><h3>{DialogData[0]?.origintruckAccess}</h3></td>
                    <td>10%</td>
                    <td>{DialogData[0]?.itemsprice?.$numberDecimal}NIS</td>
                    <td>{DialogData[0]?.origintruckaccessprice?.$numberDecimal}NIS</td>
                </tr>
                <tr>
                    <td></td>
                    <td><p>{DialogData[0]?.destinationaddress}</p><h3>{DialogData[0]?.destinationtruckAccess}</h3></td>
                    <td>2 NIS</td>
                    <td>{DialogData[0]?.itemsprice?.$numberDecimal}NIS</td>
                    <td>{DialogData[0]?.destinationtruckaccessprice?.$numberDecimal}NIS</td>
                </tr>
                <tr className='bg-[#E4E4EF]  p-5'>
                    <td colSpan={5}>
                        <img src={couch} alt="background" className='h-8 mr-5' />
                        <h2>Items</h2>
                    </td>
                </tr>
                {DialogData[0]?.items.map((item, index) => (
                    <tr key={index} className=" bg-gray-100 p-2">
                        <td></td>
                        <td>{item.name}</td>
                        <td>{item.price}NIS</td>
                        <td>{item.quantity}</td>
                        <td>{item.price * item.quantity}NIS</td>
                    </tr>
                ))}
                <tr className='bg-[#E4E4EF]  p-5'>
                    <td colSpan={5}>
                        <img src={couch} alt="background" className='h-8 mr-5' />
                        <h2>Disassembly</h2>
                    </td>
                </tr>
                {DialogData[0]?.disassembledItems.map((item, index) => (
                    <tr key={index} className="  bg-gray-100  p-2">
                        <td></td>
                        <td>{item.name}</td>
                        <td>{item.price}NIS</td>
                        <td>{item.quantity}</td>
                        <td>{item.price * item.quantity}NIS</td>
                    </tr>
                ))}
                <tr className='bg-[#E4E4EF]  p-5'>
                    <td colSpan={5}>
                        <img src={couch} alt="background" className='h-8 mr-5' />
                        <h2>Assemble</h2>
                    </td>
                </tr>
                {DialogData[0]?.assembledItems.map((item, index) => (
                    <tr key={index} className="  bg-gray-100  p-2">
                        <td></td>
                        <td>{item.name}</td>
                        <td>{item.price}NIS</td>
                        <td>{item.quantity}</td>
                        <td>{item.price * item.quantity}NIS</td>
                    </tr>
                ))}
                <tr className='bg-[#E4E4EF]  p-5'>
                    <td colSpan={5}>
                        <img src={couch} alt="background" className='h-8 mr-5' />
                        <h2>Boxes</h2>
                    </td>
                </tr>
                <tr className="  bg-gray-100  p-2">
                    <td></td>
                    <td>Supply of boxes</td>
                    <td>5 NIS</td>
                    <td>{DialogData[0]?.boxes}</td>
                    <td>{DialogData[0]?.boxesPrice?.$numberDecimal}NIS</td>
                </tr>
                <tr className='bg-[#E4E4EF]  p-5'>
                    <td colSpan={5}>
                        <img src={couch} alt="background" className='h-8 mr-5' />
                        <h2>Crane</h2>
                    </td>
                </tr>
                <tr className="  bg-gray-100  p-2">
                    <td></td>
                    <td><p>{DialogData[0]?.originaddress}</p><h3>Floor {DialogData[0]?.originfloor}</h3></td>
                    <td>100NIS</td>
                    <td>{DialogData[0]?.originCranePrice?.$numberDecimal}NIS</td>
                    <td>{DialogData[0]?.originCranePrice?.$numberDecimal * 100}NIS</td>
                </tr>
                <tr className="  bg-gray-100  p-2">
                    <td></td>
                    <td><p>{DialogData[0]?.destinationaddress}</p><h3>Floor {DialogData[0]?.destinationfloor}</h3></td>
                    <td>10 NIS</td>
                    <td>{DialogData[0]?.destinationCranePrice?.$numberDecimal}NIS</td>
                    <td>{DialogData[0]?.destinationCranePrice?.$numberDecimal * 100}NIS</td>
                </tr>
                <tr className='bg-[#E4E4EF]  p-5'>
                    <td colSpan={5}>
                        <img src={couch} alt="background" className='h-8 mr-5' />
                        <h2>Packing</h2>
                    </td>
                </tr>
                <tr className="  bg-gray-100  p-2">
                    <td></td>
                    <td><p>{DialogData[0]?.destinationaddress}</p><h3>Floor {DialogData[0]?.destinationfloor}</h3></td>
                    <td>10%</td>
                    <td>{DialogData[0]?.items.length}</td>
                    <td>{DialogData[0]?.packingprice?.$numberDecimal}NIS</td>
                </tr>
            </tbody>
        </table>
    );
};

export default TenderDetailsDialog;