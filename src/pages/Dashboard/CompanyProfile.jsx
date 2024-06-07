import React, { useState } from 'react'
import { CiStar } from 'react-icons/ci'
import { FaBell, FaRegUserCircle } from 'react-icons/fa'
import { FaCircleUser } from 'react-icons/fa6'

const CompanyProfile = () => {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmpassword: "",
        companyName: "",
        agreed: false,
        numberOfTrucks: "1-10",
        phoneNumber: "",
        city: "Tel aviv",
        companyId: null
    });
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };
    return (
        <div className="bg-white h-full">
            <div className="bg-[#96E0F8] flex justify-between py-3">
                <div>
                    <h2 className='w-full text-xl bm-font'>Click <span className='text-orange-500 px-2'>n</span>Move</h2>
                </div>
                <div className="flex">
                    <FaBell className="mr-3" size={20} />
                    <FaRegUserCircle className="mr-3" size={20} />
                </div>
            </div>
            <div className="py-1 ml-3 flex justify-between">
                {/* <h1>Welcome! {auth.user?.username}</h1> */}
                <div>
                    <h2>Good afternoon, Company name!</h2>
                    <h2>Quickly access Your tenders</h2>
                </div>
                <button onClick={() => auth.logOut()} className="btn-submit">
                    logout
                </button>
            </div>
            <div className='grid grid-cols-12'>
                <div className='col-span-6'>
                    <FaCircleUser />
                    <h1>Company name</h1>
                    <h2>User name</h2>
                    <div className='flex'>
                        <div className='border-r border-black p-2 flex flex-col justify-center items-center'>
                            <CiStar
                                size={30}
                                className='mr-2'
                            />
                            <p>4.5 ratings</p>
                        </div>
                        <div className='border-r border-black p-2 flex flex-col justify-center items-center'>
                            <h2>21</h2>
                            <p>Active offers</p>
                        </div>
                        <div className='border-r border-black p-2 flex flex-col justify-center items-center'>
                            <h2>238</h2>
                            <p>Completed moves</p>
                        </div>
                    </div>
                </div>
                <div className="col-span-6">
                    <div className='flex justify-end items-center'>
                        <button className='bg-white text-black p-2 mt-5 rounded-md border border-black mr-2'>Edit</button>
                        <button className='bg-[#2676E5] text-white p-2 mt-5 rounded-md mr-2'>Save</button>
                    </div>
                    <h3 className='mb-1'>UserName</h3>
                    <input
                        name='fullName'
                        value={form.fullName}
                        onChange={handleFormChange}
                        className='w-full  bg-white   py-2 rounded-md  mb-1'
                        placeholder="Enter your full name"
                    />
                    <hr />
                    <h3 className='mb-1 mt-5'>Company Name</h3>
                    <input
                        name='companyName'
                        value={form.companyName}
                        onChange={handleFormChange}
                        className='w-full  bg-white   py-2 rounded-md  mb-1'
                        placeholder="Enter your full name"
                    />
                    <hr />
                    <h3 className='mb-1 mt-5'>Email</h3>
                    <input
                        name='companyId'
                        value={form.email}
                        onChange={handleFormChange}
                        className='w-full  bg-white   py-2 rounded-md  mb-1'
                        placeholder="Enter your full name"
                    />
                    <hr />
                    <h3 className='mb-1 mt-5'>Phone Number</h3>
                    <input
                        name='phoneNumber'
                        value={form.phoneNumber}
                        onChange={handleFormChange}
                        className='w-full  bg-white   py-2 rounded-md  mb-1'
                        placeholder="Enter your full name"
                    />
                    <hr />
                    <h3 className='mb-1 mt-5'>Company ID</h3>
                    <input
                        name='companyId'
                        value={form.companyId}
                        onChange={handleFormChange}
                        className='w-full  bg-white   py-2 rounded-md  mb-1'
                        placeholder="Enter your full name"
                    />
                    <hr />
                    <h3 className='mb-1 mt-5'>Address</h3>
                    <textarea
                        name='additionalDetails'
                        value={form.additionalDetails}
                        onChange={handleFormChange}
                        className='w-full bg-white   py-2 rounded-md  mb-1'
                        placeholder="You can type your comment here"
                    />
                    <hr />
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
                    <hr />
                    <h3 className='mb-1'>In which cities do you operate?</h3>
                    <div className='flex mb-1'>
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyProfile