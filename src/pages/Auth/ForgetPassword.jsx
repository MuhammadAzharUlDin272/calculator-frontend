import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import VerificationInput from 'react-verification-input';
import { clearEmail, setEmail } from '../../slices/emailslice';
import Sidediv from './Sidediv';

const ForgetPassword = () => {
    const email = useSelector(state => state.email);
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const [count, setcount] = useState(1);
    const [form, setForm] = useState({
        email: "",
        verificationCode:"",
        password:"",
        confirmpassword:""
    });

    const handleVerificationInputChange = (value) => {
        setForm({ ...form, verificationCode: value });
    };

    useEffect(() => { }, [count]);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleVerifyEmail = async () => {
        if (form.email === "") {
            toast.error('Please fill in email');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(form.email)) {
            toast.error('Please enter a valid email address');
            return;
        }
        
        try {
            const response = await axios.post('https://homecalculatorbackend-ni04.onrender.com/api/verifyemail', {
                email: form.email,
            });
            // Handle successful login, such as storing the token in local storage and redirecting to another page
            toast.success('Email Exist!');
            setcount(2);
            dispatch(setEmail(form.email));
            return;
        } catch (error) {
            toast.error('Email does not exist ');
            return;
            // Handle any error messages or logging
        }
    };

    const handleVerifyCode = async () => {
        if (form.verificationCode === "") {
            toast.error('Please fill in verificationCode');
            return;
        }


        try {
            const response = await axios.post('https://homecalculatorbackend-ni04.onrender.com/api/verifycode', {
                email: email,
                verificationCode: form.verificationCode
            });
            // Handle successful login, such as storing the token in local storage and redirecting to another page
            toast.success('Verification successful!');
            setcount(3);
            return;
        } catch (error) {
            toast.error('Verification failed');
            return;
            // Handle any error messages or logging
        }
    };

    const handlePasswordReset = async () => {
        if (form.password === "") {
            toast.error('Please fill in password');
            return;
        }
        if (form.password.length < 8) {
            toast.error('confirm password length should be greater than 8');
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

        try {
            const response = await axios.put('https://homecalculatorbackend-ni04.onrender.com/api/updatepassword', {
                email: email,
                password: form.password
            });
            // Handle successful login, such as storing the token in local storage and redirecting to another page
            toast.success('New password created!');
            // Clear the email from Redux state
            dispatch(clearEmail());
            navigate('/');

        } catch (error) {
            toast.error('Invalid credentials. Please try again.');
            // Handle any error messages or logging
        }
    };

    return (
        <div className='grid grid-cols-12 h-screen'>
            <Sidediv />
            {count == 1 && (
                <div className='md:col-span-8 col-span-12 bg-white'>
                    <div className='flex justify-center items-center flex-col h-full'>
                        <h1 className='text-3xl'>Forgot Password</h1>
                        <p className='w-96'>Enter the email you used to create your account so we can send you instructions on how to reset your password.</p>
                        <div className='flex flex-col'>
                            <h3 className='mb-1 mt-10'>Email</h3>
                            <input
                                name='email'
                                value={form.email}
                                onChange={handleFormChange}
                                className='md:w-[400px] w-[250px] h-[44px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                                placeholder="Enter Email"
                            />
                            <button className='bg-[#2676E5] w-full text-white p-2 mt-5 rounded-md' onClick={handleVerifyEmail}>Verify Email</button>
                        </div>
                    </div>
                </div>
            )}
            {count == 2 && (
                <div className='md:col-span-8 col-span-12 bg-white'>
                    <div className='flex justify-center items-center flex-col h-full'>
                        <h1 className='text-3xl'>Verification code</h1>
                        <h2 className='text-sm'>We sent a verification code to</h2>
                        <h2>{email}</h2>
                        <div className='flex flex-col mt-5'>
                            <div className='flex justify-center'>
                                <VerificationInput onChange={handleVerificationInputChange} />
                            </div>
                            <button className='bg-[#2676E5] w-full text-white p-2 mt-5 rounded-md' onClick={handleVerifyCode}>Verify</button>
                            <p className='text-center mt-10'>Haven’t received an email?</p>
                            <p className='text-center'>Check your email inbox or spam folder</p>
                            <p className='text-center'><span className='text-[#2676E5]'><Link to="/register">Resend Email</Link></span></p>
                        </div>
                    </div>
                </div>
            )}
            {count == 3 && (
                <div className='md:col-span-8 col-span-12 bg-white'>
                    <div className='flex justify-center items-center flex-col h-full'>
                        <h1 className='text-3xl'>Create new Password</h1>
                        <h2 className='text-sm'>Choose a new password for your account</h2>
                        <div className='flex flex-col'>
                            <h3 className='mb-1'>Password</h3>
                            <input
                                name='password'
                                value={form.password}
                                type='password'
                                onChange={handleFormChange}
                                className='md:w-[400px] w-[250px] h-[44px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none'
                                placeholder="Enter at least 8 character"
                            />
                            <h3 className='mb-1'>Confirm Password</h3>
                            <input
                                name='confirmpassword'
                                value={form.confirmpassword}
                                type='password'
                                onChange={handleFormChange}
                                className='md:w-[400px] w-[250px] h-[44px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none'
                                placeholder="Enter at least 8 character"
                            />
                            <button className='bg-[#2676E5] w-full text-white p-2 mt-5 rounded-md' onClick={handlePasswordReset}>Create</button>
                        </div>
                    </div>
                </div>
            )}
        </div >
    )
}

export default ForgetPassword;
