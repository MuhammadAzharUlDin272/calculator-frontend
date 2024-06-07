import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../AuthProvider';
import Sidediv from './Sidediv';

const Login = () => {
    const auth = useAuth();
    const navigate=useNavigate();
    useEffect(() => {
        if (auth.token && auth.userType==="company") {
            navigate('/dashboard');
        }
    }, [auth.token, navigate]);
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleLoginClick = async () => {
        if (form.email === "") {
            toast.error('Please fill in email');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(form.email)) {
            toast.error('Please enter a valid email address');
            return;
        }
        if (form.password === "") {
            toast.error('Please fill in password');
            return;
        }

        try {
            auth.loginAction(form);
            // Handle successful login, such as storing the token in local storage and redirecting to another page
            toast.success('Login successful!');
        } catch (error) {
            toast.error('Invalid credentials. Please try again.');
            // Handle any error messages or logging
        }
    };

    return (
        <div className='grid grid-cols-12 h-screen'>
            <Sidediv />
            <div className='md:col-span-8 col-span-12 bg-white'>
                <div className='flex justify-center items-center flex-col h-full'>
                    <h1 className='text-3xl'>Click n Move welcome to</h1>
                    <h2 className='text-sm'>Get started by creating a free user account</h2>
                    <div className='flex flex-col'>
                        <h3 className='mb-1 mt-10'>Email</h3>
                        <input
                            name='email'
                            value={form.email}
                            onChange={handleFormChange}
                            className='md:w-[400px] w-[250px] h-[44px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                            placeholder="Enter Email"
                        />
                        <h3 className='mb-1'>Password</h3>
                        <input
                            name='password'
                            value={form.password}
                            type='password'
                            onChange={handleFormChange}
                            className='md:w-[400px] w-[250px] h-[44px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none'
                            placeholder="Enter password"
                        />
                        <div className='flex justify-between mt-2'>
                            <h3 className='text-[#2676E5]'><Link to="/forgetpassword">Forgot password</Link></h3>
                            <div className='flex'>
                                <input type="checkbox" name="" id="" className='mr-2' />
                                <h3>Remember me </h3>
                            </div>
                        </div>
                        <button className='bg-[#2676E5] w-full text-white p-2 mt-5 rounded-md' onClick={handleLoginClick}>Login</button>
                        <p className='text-center mt-10'>Don’t have an account yet? <span className='text-[#2676E5]'><Link to="/register">Sign Up</Link></span></p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Login;
