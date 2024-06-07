import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useAuth } from '../../AuthProvider';
import axios from "axios";

const PriceDialog = ({ DialogData, onCloseAndRefetch }) => {
    const user = useAuth();
    const userId = user?.user;
    const tenderId = DialogData?.id;

    const [field, setField] = useState({
        price: '',
        transportdate: '',
        arrivaldate: '',
        starthours: '',
        endhours: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setField(prevField => ({ ...prevField, [name]: value }));
    };

    const handleApply = async () => {
        if (!field.price || !field.transportdate || !field.arrivaldate || !field.starthours || !field.endhours) {
            toast.error('All fields are required');
            return;
        }

        try {
            const response = await axios.post('https://homecalculatorbackend-ni04.onrender.com/api/priceoffer/sendoffer', {
                userId,
                tenderId,
                priceOffer: field.price,
                transportdate: field.transportdate,
                arrivaldate: field.arrivaldate,
                starthours: field.starthours,
                endhours: field.endhours,
            });

            toast.success('Offer sent successfully');
            onCloseAndRefetch();
        } catch (error) {
            toast.error('Failed to send offer');
        }
    };

    return (
        <div>
            <div className='flex justify-between mb-2'>
                <p>Tender Id:{DialogData?.id}</p>
                <p>Current best price offer:{DialogData?.bestOffer}</p>
            </div>
            <hr />
            <form>
                <div className='flex'>
                    <div className='mr-3'>
                        <label htmlFor="price" className="block mb-1">Price</label>
                        <input
                            type="number"
                            name="price"
                            className="w-full border rounded p-1"
                            value={field.price}
                            onChange={handleChange}
                            placeholder="Price"
                        />
                    </div>
                    <div className='mr-3'>
                        <label htmlFor="starthours" className="block mb-1">Start Time</label>
                        <input
                            type="time"
                            name="starthours"
                            className="w-full border rounded p-1"
                            value={field.starthours}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='mr-3'>
                        <label htmlFor="endhours" className="block mb-1">End Time</label>
                        <input
                            type="time"
                            name="endhours"
                            className="w-full border rounded p-1"
                            value={field.endhours}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex">
                    <div className='mr-3'>
                        <label htmlFor="transportdate" className="block mb-1">Date of Transport</label>
                        <input
                            type="date"
                            name="transportdate"
                            className="w-full border rounded p-1"
                            value={field.transportdate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='mr-3'>
                        <label htmlFor="arrivaldate" className="block mb-1">Date of Arrival</label>
                        <input
                            type="date"
                            name="arrivaldate"
                            className="w-full border rounded p-1"
                            value={field.arrivaldate}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </form>
            <div className='mt-3'>
                <button className="bg-orange-400 rounded-lg p-3 text-white" onClick={handleApply}>Apply</button>
            </div>
        </div>
    )
}

export default PriceDialog;
