import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setEmail } from '../../slices/emailslice';
import Sidediv from './Sidediv';
import GoogleCityAutocomplete from '../../components/GeogleCityAutocomplete';
import { useJsApiLoader } from '@react-google-maps/api';
import { setPassword } from '../../slices/passwordslice';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [count, setcount] = useState(1);
    const [userType, setUserType] = useState("company");
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmpassword: "",
        companyName: "",
        agreed: false,
        numberOfTrucks: "1-10",
        phoneNumber: "",
        city: "",
        companyId: null
    });

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyAuIchE5mdfEw_S7oM8I5ZkpCcQyWOMg-Y',
        libraries: ['places']
      })

    useEffect(() => { }, [count]);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setForm({ ...form, [name]: checked });
    };

    const handlestepone = async () => {
        if (form.fullName === "") {
            toast.error('Please fill in full name');
            return;
        }
        if (form.password === "") {
            toast.error('Please fill in password');
            return;
        }
        if (form.password.length < 8) {
            toast.error('password length should be greater than 8');
            return;
        }
        if (form.confirmpassword === "") {
            toast.error('Please fill in confirm password');
            return;
        }
        if (form.confirmpassword.length < 8) {
            toast.error('confirm password length should be greater than 8');
            return;
        }
        if (form.confirmpassword != form.password) {
            toast.error('password and confirm password must be the same');
            return;
        }
        setcount(2);
    };
    const handlesteptwo = async () => {
        if (form.companyName === "") {
            toast.error('please fill company name');
            return;
        }
        if (form.companyId === "") {
            toast.error('please fill company Id');
            return;
        }
        if (form.phoneNumber === "") {
            toast.error('please fill company phone number');
            return;
        }
        setcount(3);
    };

    const handleprevious = () => {
        setcount((prevCount) => prevCount - 1);
    };

    const handlestepthree = async () => {
        setcount(4);
    };

    const handlestepfour = async() => {
        if (form.email === "") {
            toast.error('Please fill in email');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(form.email)) {
            toast.error('Please enter a valid email address');
            return;
        }
        if (!form.agreed) {
            toast.error('please agree to privacy policy');
            return;
        }

        console.log(form);
        try {
            const response = await axios.post('https://homecalculatorbackend-ni04.onrender.com/api/register', {
                name: form.fullName,
                email: form.email,
                password: form.password,
                userType: userType
            });
            const response1 = await axios.post('https://homecalculatorbackend-ni04.onrender.com/api/company/add', {
                companyName: form.companyName,
                userId: response?.data?.userId,
                numberOfTrucks: form.numberOfTrucks,
                city: form.city,
                companyId: form.companyId,
                phoneNumber:form.phoneNumber
            });
            toast.success('Registration successful!');
            dispatch(setEmail(form.email));
            dispatch(setPassword(form.password));
            navigate("/verify")
            // Handle any additional logic, such as redirecting to another page
        } catch (error) {
            toast.error('An error occurred. Please try again later.');
            // Handle any error messages or logging
        }
    }

    return (
        <div className='grid grid-cols-12 h-screen'>
            <Sidediv />
            <div className='md:col-span-8 col-span-12 bg-white'>
                <div className='flex justify-center items-center flex-col h-full'>
                    <h1 className='text-3xl font-semibold'>Create your Account</h1>
                    {count == 1 && (
                        <div className='flex flex-col'>
                            <h3 className='mb-1 mt-5'>Full Name</h3>
                            <input
                                name='fullName'
                                value={form.fullName}
                                onChange={handleFormChange}
                                className='md:w-[400px] w-[250px] h-[44px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                                placeholder="Enter your full name"
                            />
                            <h3 className='mb-1'>Password</h3>
                            <input
                                name='password'
                                value={form.password}
                                onChange={handleFormChange}
                                onFocus={true}
                                onBlur={false}
                                type='password'
                                className='md:w-[400px] w-[250px] h-[44px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                                placeholder="Enter at least 8 characters"
                            />
                            <h3 className='mb-1'>Confirm Password</h3>
                            <input
                                name='confirmpassword'
                                value={form.confirmpassword}
                                onChange={handleFormChange}
                                type='password'
                                className='md:w-[400px] w-[250px] h-[44px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                                placeholder="Enter at least 8 characters"
                            />
                            <button className='bg-[#2676E5] w-full text-white p-2 mt-5 rounded-md' onClick={handlestepone}>Next</button>
                            <p className='text-center mt-5'>Already have an Account? <span className='text-[#2676E5]'><Link to="/login">Sign In</Link></span></p>
                        </div>
                    )}
                    {count == 2 && userType == "company" && (
                        <div className='flex flex-col'>
                            <h3 className='mb-1 mt-5'>Company/Account name</h3>
                            <input
                                name='companyName'
                                value={form.companyName}
                                onChange={handleFormChange}
                                className='md:w-[400px] w-[250px] h-[44px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                                placeholder="For example, company’s or department’s name"
                            />
                            <h3 className='mb-1'>Company Business Number/ID</h3>
                            <input
                                type='number'
                                name='companyId'
                                value={form.companyId}
                                onChange={handleFormChange}
                                className='md:w-[400px] w-[250px] h-[44px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                                placeholder="For example, company’s business Id"
                            />
                            <h3 className='mb-1'>Company Phone Number</h3>
                            <input
                                name='phoneNumber'
                                value={form.phoneNumber}
                                onChange={handleFormChange}
                                className='md:w-[400px] w-[250px] h-[44px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                                placeholder="For example, company’s Phone Number"
                            />

                            <div className='flex justify-center items-center'>
                                <button className='bg-white w-full text-black p-2 mt-5 rounded-md border border-black mr-2' onClick={handleprevious}>Previous</button>
                                <button className='bg-[#2676E5] w-full text-white p-2 mt-5 rounded-md' onClick={handlesteptwo}>Next</button>
                            </div>
                            <p className='text-center mt-5'>Already have an Account? <span className='text-[#2676E5]'><Link to="/login">Sign In</Link></span></p>
                        </div>
                    )}
                    {count == 3 && (
                        <div className='flex flex-col'>
                            <h3 className='mb-1 mt-5'>Number of Trucks</h3>
                            <div className='flex mb-1'>
                                <div className={`border rounded-full mr-3 p-2 ${form.numberOfTrucks === '1-10' ? 'border-blue-500' : 'border-black'}`}>
                                    <input
                                        type="radio"
                                        id="oneTruck"
                                        name="numberOfTrucks"
                                        value="1-10"
                                        className='mr-2'
                                        defaultChecked={form.numberOfTrucks === '1-10'}
                                        onClick={handleFormChange}
                                    />
                                    <label htmlFor="oneTruck">1-10</label>
                                </div>
                                <div className={`border rounded-full mr-3 p-2 ${form.numberOfTrucks === '11-50' ? 'border-blue-500' : 'border-black'}`}>
                                    <input
                                        type="radio"
                                        id="twoTrucks"
                                        name="numberOfTrucks"
                                        value="11-50"
                                        className='mr-2'
                                        defaultChecked={form.numberOfTrucks === '11-50'}
                                        onClick={handleFormChange}
                                    />
                                    <label htmlFor="twoTrucks">11-50</label>
                                </div>
                                <div className={`border rounded-full mr-3 p-2 ${form.numberOfTrucks === '51-200' ? 'border-blue-500' : 'border-black'}`}>
                                    <input
                                        type="radio"
                                        id="threeTrucks"
                                        name="numberOfTrucks"
                                        value="51-200"
                                        className='mr-2'
                                        defaultChecked={form.numberOfTrucks === '51-200'}
                                        onClick={handleFormChange}
                                    />
                                    <label htmlFor="threeTrucks">51-200</label>
                                </div>
                                <div className={`border rounded-full mr-3 p-2 ${form.numberOfTrucks === '200+' ? 'border-blue-500' : 'border-black'}`}>
                                    <input
                                        type="radio"
                                        id="fourTrucks"
                                        name="numberOfTrucks"
                                        value="200+"
                                        className='mr-2'
                                        defaultChecked={form.numberOfTrucks === '200+'}
                                        onClick={handleFormChange}
                                    />
                                    <label htmlFor="fourTrucks">200+</label>
                                </div>
                            </div>

                            <h3 className='mb-1'>In which cities do you operate?</h3>
                            <GoogleCityAutocomplete value={form.city} onChange={handleFormChange} name="city" placeholder="Select city" />
                            {/* <div className='flex mb-1'>
                                <div className={`border rounded-full mr-3 p-2 ${form.city === 'Tel aviv' ? 'border-blue-500' : 'border-black'}`}>
                                    <input
                                        type="radio"
                                        id="onecity"
                                        name="city"
                                        value="Tel aviv"
                                        className='mr-2'
                                        defaultChecked={form.city === 'Tel aviv'}
                                        onClick={handleFormChange}
                                    />
                                    <label htmlFor="onecity">Tel aviv</label>
                                </div>
                                <div className={`border rounded-full mr-3 p-2 ${form.city === 'Haifa' ? 'border-blue-500' : 'border-black'}`}>
                                    <input
                                        type="radio"
                                        id="twocity"
                                        name="city"
                                        value="Haifa"
                                        className='mr-2'
                                        defaultChecked={form.city === 'Haifa'}
                                        onClick={handleFormChange}
                                    />
                                    <label htmlFor="twocity">Haifa</label>
                                </div>
                                <div className={`border rounded-full mr-3 p-2 ${form.city === 'Jerusalem' ? 'border-blue-500' : 'border-black'}`}>
                                    <input
                                        type="radio"
                                        id="threecity"
                                        name="city"
                                        value="Jerusalem"
                                        className='mr-2'
                                        defaultChecked={form.city === 'Jerusalem'}
                                        onClick={handleFormChange}
                                    />
                                    <label htmlFor="threecity">Jerusalem</label>
                                </div>
                                <div className={`border rounded-full mr-3 p-2 ${form.city === 'Beer Sheva' ? 'border-blue-500' : 'border-black'}`}>
                                    <input
                                        type="radio"
                                        id="fourcity"
                                        name="city"
                                        value="Beer Sheva"
                                        className='mr-2'
                                        defaultChecked={form.city === 'Beer Sheva'}
                                        onClick={handleFormChange}
                                    />
                                    <label htmlFor="fourcity">Beer Sheva</label>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className={`border rounded-full mr-3 p-2 ${form.city === 'Ashkelon' ? 'border-blue-500' : 'border-black'}`}>
                                    <input
                                        type="radio"
                                        id="fivecity"
                                        name="city"
                                        value="Ashkelon"
                                        className='mr-2'
                                        defaultChecked={form.city === 'Ashkelon'}
                                        onClick={handleFormChange}
                                    />
                                    <label htmlFor="fivecity">Ashkelon</label>
                                </div>
                                <div className={`border rounded-full mr-3 p-2 ${form.city === 'Holon' ? 'border-blue-500' : 'border-black'}`}>
                                    <input
                                        type="radio"
                                        id="sixcity"
                                        name="city"
                                        value="Holon"
                                        className='mr-2'
                                        defaultChecked={form.city === 'Holon'}
                                        onClick={handleFormChange}
                                    />
                                    <label htmlFor="sixcity">Holon</label>
                                </div>
                                <div className={`border rounded-full mr-3 p-2 ${form.city === 'Other' ? 'border-blue-500' : 'border-black'}`}>
                                    <input
                                        type="radio"
                                        id="sevencity"
                                        name="city"
                                        value="Other"
                                        className='mr-2'
                                        defaultChecked={form.city === 'Other'}
                                        onClick={handleFormChange}
                                    />
                                    <label htmlFor="sevencity">Other</label>
                                </div>
                            </div> */}
                            <div className='flex justify-center items-center'>
                                <button className='bg-white w-full text-black p-2 mt-5 rounded-md border border-black mr-2' onClick={handleprevious}>Previous</button>
                                <button className='bg-[#2676E5] w-full text-white p-2 mt-5 rounded-md' onClick={handlestepthree}>Next</button>
                            </div>
                            <p className='text-center mt-5'>Already have an Account? <span className='text-[#2676E5]'><Link to="/login">Sign In</Link></span></p>
                        </div>
                    )}
                    {count == 4 && (
                        <div className='flex flex-col'>
                            <h3 className='mb-1 mt-5'>Email</h3>
                            <input
                                name='email'
                                value={form.email}
                                type='email'
                                onChange={handleFormChange}
                                className='md:w-[400px] w-[250px] h-[44px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                                placeholder="Enter your email address"
                            />

                            <div className='flex justify-center items-center'>
                                <button className='bg-white w-full text-black p-2 mt-5 rounded-md border border-black mr-2' onClick={handleprevious}>Previous</button>
                                <button className='bg-[#2676E5] w-full text-white p-2 mt-5 rounded-md' onClick={handlestepfour}>Register</button>
                            </div>
                            <div className='flex mt-5 justify-center items-center'>
                                <input
                                    type="checkbox"
                                    name="agreed"
                                    checked={form.agreed}
                                    onChange={handleCheckboxChange}
                                    className='mr-2'
                                />
                                <p>By proceeding, you agree to the</p>
                            </div>
                            <p className='text-center'><span className='text-[#2676E5]'>Term of Service</span> and  <span className='text-[#2676E5]'>Privacy Policy</span></p>
                            <p className='text-center mt-5'>Already have an Account? <span className='text-[#2676E5]'><Link to="/login">Sign In</Link></span></p>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};

export default Register;
