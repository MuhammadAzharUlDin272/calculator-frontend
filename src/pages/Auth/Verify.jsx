import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import VerificationInput from "react-verification-input";
import { clearEmail } from '../../slices/emailslice';
import Sidediv from './Sidediv';
import { clearPassword } from '../../slices/passwordslice';
import { useAuth } from '../../AuthProvider';

const Verify = () => {
    const email = useSelector(state => state.email);
    const password = useSelector(state => state.password);
    const auth = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        verificationCode: "",
    });

    const handleVerificationInputChange = (value) => {
        setForm({ ...form, verificationCode: value });
    };

    const handleLoginClick = async () => {
        if (form.verificationCode === "") {
            toast.error('Please fill in verificationCode');
            return;
        }


        try {
            const response = await axios.post('https://homecalculatorbackend-ni04.onrender.com/api/verify', {
                email: email,
                verificationCode: form.verificationCode
            });
            // Handle successful login, such as storing the token in local storage and redirecting to another page
            toast.success('Verification successful!');
            auth.loginAction({
                email: email,
                password: password,
            });
            toast.success('Login successful!');
            // Clear the email from Redux state
            dispatch(clearEmail());
            dispatch(clearPassword());

            // Navigate to the login page
        } catch (error) {
            toast.error('Verification failed');
            // Handle any error messages or logging
        }
    };

    return (
        <div className='grid grid-cols-12 h-screen'>
            <Sidediv />
            <div className='md:col-span-8 col-span-12 bg-white'>
                <div className='flex justify-center items-center flex-col h-full'>
                    <h1 className='text-3xl'>Verification code</h1>
                    <h2 className='text-sm'>We sent a verification code to</h2>
                    <h2>{email}</h2>
                    <div className='flex flex-col mt-5'>
                        <div className='flex justify-center'>
                            <VerificationInput onChange={handleVerificationInputChange} />
                        </div>
                        <button className='bg-[#2676E5] w-full text-white p-2 mt-5 rounded-md' onClick={handleLoginClick}>Verify</button>
                        <p className='text-center mt-10'>Haven’t received an email?</p>
                        <p className='text-center'>Check your email inbox or spam folder</p>
                        <p className='text-center'><span className='text-[#2676E5]'><Link to="/register">Resend Email</Link></span> or <span className='text-[#2676E5]'><Link to="/register">Sign in with different email address.</Link></span></p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Verify;
