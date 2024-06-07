import axios from "axios";
import React, { useState } from "react";
import Confetti from "react-confetti";
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { greenarrow } from "../assets";
import { useAuth } from "../AuthProvider";

const Form = ({ toggleSummary }) => {
	const user = useAuth();
    const userId = user?.user;
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
	const [formData, setFormData] = useState({
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


	const handleSubmit = async (e) => {
		e.preventDefault();
		if (formData.name.trim() === "") {
			toast.error('Please fill in full name');
			return;
		}
		if (formData.phonenumber.trim() === "") {
			toast.error('Please fill in phone number');
			return;
		}
		if (formData.transportdate.trim() === "") {
			toast.error('Please select the date of transport');
			return;
		}
		if (formData.arrivaldate.trim() === "") {
			toast.error('Please select the date of arrival');
			return;
		}
		if (formData.starthours.trim() === "") {
			toast.error('Please select the start hours');
			return;
		}
		if (formData.endhours.trim() === "") {
			toast.error('Please select the end hours');
			return;
		}
		if (formData.additionalDetails.trim() === "") {
			toast.error('Please provide additional details');
			return;
		}
		try {
			const response = await axios.post('https://homecalculatorbackend-ni04.onrender.com/api/tenders/sendtender', {
				userId,
				name: formData.name,
				phonenumber: formData.phonenumber,
				additionalDetails: formData.additionalDetails,
				movingPrice: formData.movingPrice,
				originaddress: formData.originaddress,
				destinationaddress: formData.destinationaddress,
				transportdate: formData.transportdate,
				arrivaldate: formData.arrivaldate,
				starthours: formData.starthours,
				endhours: formData.endhours,
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
			setFormSubmitted(true);
			// Handle any additional logic, such as redirecting to another page
		} catch (error) {
			toast.error('An error occurred. Please try again later.');
			// Handle any error messages or logging
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleXClick = () => {
		// Close the form
		toggleSummary();
	};

	if (formSubmitted) {
		return (
			<div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-gray-500">
				<div
					id="confetti-container"
					className="absolute top-0 left-0 w-full h-full z-10 flex justify-center items-center"
				>
					<Confetti
						width={window.innerWidth}
						height={window.innerHeight}
					/>
				</div>
				<div className="absolute top-0 flex flex-col items-center z-20">
					<img
						src={greenarrow}
						alt="Green Arrow"
						className="w-20 h-20 mb-4 mt-20"
					/>
					<p className="text-white text-4xl font-bold my-4 ">
						Your bid was successfully accepted!
					</p>
					<p className="text-white text-xl text-center mb-4">
						We work hard to find you the best offers.
						<br />
						You will receive the offers directly to WhatsApp, and you can choose the offer
						The best for you.
					</p>
					<button
						onClick={() => setFormSubmitted(false)}
						className="absolute top-20 right-1"
					>
						<FaTimes className="text-white text-2xl cursor-pointer" />
					</button>
				</div>
			</div>
		);
	} else {
		return (
			<div>
				{!formSubmitted && (
					<div className="relative">
						<FaTimes
							className="absolute right-4 top-5 text-gray-600 cursor-pointer h-16"
							onClick={handleXClick}
						/>
						<div className="bg-white rounded-3xl flex flex-col justify-center items-center p-12 overflow-hidden">
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
							<div>
								<div className="grid grid-cols-12 gap-6">
									<div className="col-span-6">
										<label
											htmlFor="name"
											className="block mb-1"
										>
											Full Name
										</label>
										<input
											type="text"
											name="name"
											className="w-full border rounded p-1"
											placeholder="Enter full name"
											value={formData.name}
											onChange={handleChange}
										/>
									</div>
									<div className="col-span-6">
										<label
											htmlFor="phonenumber"
											className="block mb-1"
										>
											Phone Number
										</label>
										<input
											type="text"
											name="phonenumber"
											className="border rounded p-1 w-full"
											placeholder="053-2836698"
											value={formData.phonenumber}
											onChange={handleChange}
										/>
									</div>
									<div className="col-span-6">
										<label
											htmlFor="transportdate"
											className="block mb-1"
										>
											Date of Transport
										</label>
										<input
											type="date"
											name="transportdate"
											className="w-full border rounded p-1"
											placeholder="13/10/2024"
											value={formData.transportdate}
											onChange={handleChange}
										/>
									</div>
									<div className="col-span-6">
										<label
											htmlFor="arrivaldate"
											className="block mb-1"
										>
											Date of Arrival
										</label>
										<input
											type="date"
											name="arrivaldate"
											className="w-full border rounded p-1"
											placeholder="13/10/2024"
											value={formData.arrivaldate}
											onChange={handleChange}
										/>
									</div>
									<div className="col-span-6">
										<label
											htmlFor="starthours"
											className="block mb-1"
										>
											Time span
										</label>
										<input
											type="time"
											name="starthours"
											className="w-full border rounded p-1"
											value={formData.starthours}
											onChange={handleChange}
										/>
									</div>
									<div className="col-span-6">
										<label
											htmlFor="starthours"
											className="block mb-1"
										>
											Time span
										</label>
										<input
											type="time"
											name="endhours"
											className="w-full border rounded p-1"
											value={formData.endhours}
											onChange={handleChange}
										/>
									</div>
								</div>
								<div className="col-span-12">
									<label
										htmlFor="additionalDetails"
										className="block mb-1"
									>
										More Details
									</label>
									<textarea
										name="additionalDetails"
										className=" border rounded p-1 text-right w-full"
										rows="3"
										value={formData.additionalDetails}
										onChange={handleChange}
									></textarea>
								</div>
								<div className="flex justify-center">
									<button
										onClick={handleSubmit}
										className="bg-blue-500 hover:bg-blue-700 text-white text-xl py-3 px-16 rounded-lg"
									>
										Submit a tender
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
};

export default Form;
