import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Confetti from "react-confetti";
import { CiStar } from "react-icons/ci";
import { FaBell, FaRegUserCircle, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAuth } from '../../AuthProvider';
import { greenarrow } from "../../assets";
import TruckBtn from '../../components/TruckBtn';
import { clearTenderId } from '../../slices/tenderslice';
import { resetState } from '../../slices/slices';
import { useDispatch } from 'react-redux';

const UserCancelReview = () => {
    const auth = useAuth();
    const dispatch = useDispatch();
    const [userId, setuserId] = useState(auth?.user);
    const [selectedCheckboxes1, setselectedCheckboxes1] = useState([]);
    const [selectedCheckboxes2, setselectedCheckboxes2] = useState([]);
    const [selectedCheckboxes3, setselectedCheckboxes3] = useState([]);
    const [name,setname]=useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const fetchuserdata = async () => {
        try {
            const response = await axios.get(`https://homecalculatorbackend-ni04.onrender.com/api/users/${userId}`);
            setname(response?.data?.user?.name);
            console.log(response?.data?.user?.name);
            
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchuserdata();
    }, [userId]);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const [form, setForm] = useState({
        userId: userId,
        tender_cancel:[],
        auction_experience:[],
        tender_service:[],
        ratings: {
            rating1: 0,
        },
        comments: {
            comment1: "",
            comment2: ""
        },
    });

    useEffect(()=>{
        setForm(prevForm=>({
            ...prevForm,tender_cancel:selectedCheckboxes1,auction_experience:selectedCheckboxes2,tender_service:selectedCheckboxes3
        }))
    },[selectedCheckboxes1,selectedCheckboxes2,selectedCheckboxes3])

    const handleRatingChange = (rating, questionNumber) => {
        setForm(prevForm => ({
            ...prevForm,
            ratings: {
                ...prevForm.ratings,
                [`rating${questionNumber}`]: rating
            }
        }));
    };

    const handleCheckboxChange = (event) => {
        const { value, checked, name } = event.target;
        if (name === "checkbox1" && checked) {
            setselectedCheckboxes1(prev => [...prev, value]);
        } else if (name == "checkbox1" && !checked) {
            setselectedCheckboxes1(prev => prev.filter(item => item !== value));
        }
        if (name === "checkbox2" && checked) {
            setselectedCheckboxes2(prev => [...prev, value]);
        } else if (name == "checkbox2" && !checked) {
            setselectedCheckboxes2(prev => prev.filter(item => item !== value));
        }
        if (name === "checkbox3" && checked) {
            setselectedCheckboxes3(prev => [...prev, value]);
        } else if (name == "checkbox3" && !checked) {
            setselectedCheckboxes3(prev => prev.filter(item => item !== value));
        }
    };


    const handleFormChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('comment')) {
            setForm(prevForm => ({
                ...prevForm,
                comments: {
                    ...prevForm.comments,
                    [name]: value
                }
            }));
        } else {
            setForm(prevForm => ({ ...prevForm, [name]: value }));
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('https://homecalculatorbackend-ni04.onrender.com/api/reviews', form);
            // toast.success('Review submitted successfully!');
            setTimeout(() => {
                setFormSubmitted(true);
                dispatch(clearTenderId());
                dispatch(resetState());
                auth.logOut();
            }, 3000); 
        } catch (error) {
            toast.error('Failed to submit review!');
        }
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
                        Thank you!
                    </p>
                    <p className="text-white text-xl text-center mb-4">
                        Hope to see you again
                        <br />
                        We work hard to find you the best offers. You will receive the offers directly to WhatsApp, and you can choose the best offer for you.
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
            <div className="bg-white h-max-screen">
                <div className="bg-[#96E0F8] flex justify-between py-3">
                    <div>
                        <h2 className='w-full text-xl bm-font'>Click <span className='text-orange-500 px-2'>n</span>Move</h2>
                    </div>
                    <div className="flex">
                        <FaBell className="mr-3" size={20} />
                        <FaRegUserCircle className="mr-3" size={20} />
                    </div>
                </div>
                <div className="py-2 flex justify-between border-b border-black mb-3" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                    {/* <h1>Welcome! {auth.user?.username}</h1> */}
                    <div className='ml-3'>
                        <h2>Good afternoon, {name}</h2>
                        <h2>Quickly access Your tenders</h2>
                    </div>
                    <button onClick={() => auth.logOut()} className="btn-submit">
                        logout
                    </button>
                </div>
                <div className='flex justify-center items-center flex-col'>
                    <div className=' bg-[#96E0F8] p-5 rounded-md md:w-[700px] w-[300px] mb-5'>
                        <p className='mb-5'>Hello {name},</p>
                        <p className='mb-5'>We wanted to thank you for taking the time to participate in the tender to find an apartment management company for you. We are sorry to hear that you have chosen to cancel the auction at this time.</p>

                        <p className='mb-5'>We would be very happy to hear from you the reason for canceling the tender. Your feedback is important to us and can help us improve our services in the future.</p>

                        <p className='mb-5'>Please take a few minutes to fill out this short survey, in which you can tell us about your experience in the tender process. Your answers will be completely anonymous.</p>
                        <div className='flex justify-center items-center flex-col'>
                            <div className='my-3 md:w-full w-[250px]'>
                                <h3 className='my-2 md:text-xl text-sm'>1.What factors influenced your decision to cancel the tender?</h3>
                                <div className='mb-2'>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="checkbox1"
                                            value="Not satisfied with the result I got from the calculator"
                                            onChange={handleCheckboxChange}
                                            checked={selectedCheckboxes1.includes("Not satisfied with the result I got from the calculator")}
                                            className='mr-2'
                                        />
                                        Not satisfied with the result I got from the calculator
                                    </label>
                                </div>
                                <div className='mb-2'>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="checkbox1"
                                            value="The moving companies gave higher prices than what appeared on the calculator"
                                            onChange={handleCheckboxChange}
                                            checked={selectedCheckboxes1.includes("The moving companies gave higher prices than what appeared on the calculator")}
                                            className='mr-2'
                                        />
                                        The moving companies gave higher prices than what appeared on the calculator
                                    </label>
                                </div>
                                <div className='mb-2'>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="checkbox1"
                                            value="I found another moving company at a cheaper price"
                                            onChange={handleCheckboxChange}
                                            checked={selectedCheckboxes1.includes("I found another moving company at a cheaper price")}
                                            className='mr-2'
                                        />
                                        I found another moving company at a cheaper price
                                    </label>
                                </div>
                                <div className='mb-2'>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="checkbox1"
                                            value="The process is too long and cumbersome"
                                            onChange={handleCheckboxChange}
                                            checked={selectedCheckboxes1.includes("The process is too long and cumbersome")}
                                            className='mr-2'
                                        />
                                        The process is too long and cumbersome
                                    </label>
                                </div>
                                <h3 className='mb-1'>Other reason (please specify).</h3>
                                <input
                                    name='comment1'
                                    value={form.comment1}
                                    onChange={handleFormChange}
                                    className='md:w-full w-[250px] md:h-[44px] h-[30px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                                    placeholder="You can type your comment here"
                                />
                                <h3 className='my-2 md:text-xl text-sm'>2.What do you think could have improved the auction experience for you?</h3>
                                <div className='mb-2'>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="checkbox2"
                                            value="Receiving more detailed information about the companies that participated in the tender."
                                            onChange={handleCheckboxChange}
                                            checked={selectedCheckboxes2.includes("Receiving more detailed information about the companies that participated in the tender.")}
                                            className='mr-2'
                                        />
                                        Receiving more detailed information about the companies that participated in the tender
                                    </label>
                                </div>
                                <div className='mb-2'>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="checkbox2"
                                            value="A simpler and faster process."
                                            onChange={handleCheckboxChange}
                                            checked={selectedCheckboxes2.includes("A simpler and faster process.")}
                                            className='mr-2'
                                        />
                                        A simpler and faster process.
                                    </label>
                                </div>
                                <div className='mb-2'>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="checkbox2"
                                            value="Possibility to receive recommendations from other companies."
                                            onChange={handleCheckboxChange}
                                            checked={selectedCheckboxes2.includes("Possibility to receive recommendations from other companies.")}
                                            className='mr-2'
                                        />
                                        Possibility to receive recommendations from other companies.
                                    </label>
                                </div>
                                <div className='mb-2'>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="checkbox2"
                                            value="Professional support throughout the process."
                                            onChange={handleCheckboxChange}
                                            checked={selectedCheckboxes2.includes("Professional support throughout the process.")}
                                            className='mr-2'
                                        />
                                        Professional support throughout the process.
                                    </label>
                                </div>
                                <h3 className='mb-1 mt-5'>Other reason (please specify).</h3>
                                <input
                                    name='comment2'
                                    value={form.comment2}
                                    onChange={handleFormChange}
                                    className='md:w-full w-[250px] md:h-[44px] h-[30px] bg-white border border-[#cccccc] border-opacity-100 px-4 py-2 rounded-md focus:border-none mb-3'
                                    placeholder="You can type your comment here"
                                />
                                <h3 className='my-2 md:text-xl text-sm'>3.Rate your satisfaction with using Click n Move services</h3>
                                <div className='flex'>
                                    {[...Array(5)].map((_, index) => (
                                        <CiStar
                                            key={index}
                                            size={screenWidth < 600 ? 20 : 40}
                                            className='mr-2'
                                            onClick={() => handleRatingChange(index + 1, 1)}
                                            style={{ cursor: 'pointer', color: (index < form.ratings.rating1) ? 'yellow' : 'gray' }}
                                        />
                                    ))}

                                </div>
                                <h3 className='my-2 md:text-xl text-sm'>4.Would you be willing to use the tender service of finding a moving company in the future?</h3>
                                <div className='mb-2'>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="checkbox3"
                                            value="Yes, absolutely."
                                            onChange={handleCheckboxChange}
                                            checked={selectedCheckboxes3.includes("Yes, absolutely.")}
                                            className='mr-2'
                                        />
                                        Yes, absolutely.
                                    </label>
                                </div>
                                <div className='mb-2'>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="checkbox3"
                                            value="Maybe, depending on the process and the companies that will appear in the tender."
                                            onChange={handleCheckboxChange}
                                            checked={selectedCheckboxes3.includes("Maybe, depending on the process and the companies that will appear in the tender.")}
                                            className='mr-2'
                                        />
                                        Maybe, depending on the process and the companies that will appear in the tender.
                                    </label>
                                </div>
                                <div className='mb-2'>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="checkbox3"
                                            value="No, I prefer to find a moving company in another way."
                                            onChange={handleCheckboxChange}
                                            checked={selectedCheckboxes3.includes("No, I prefer to find a moving company in another way.")}
                                            className='mr-2'
                                        />
                                        No, I prefer to find a moving company in another way.
                                    </label>
                                </div>
                                <TruckBtn onClick={handleSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default UserCancelReview;
