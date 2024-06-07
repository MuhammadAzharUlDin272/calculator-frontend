import axios from 'axios';
import { useEffect, useState } from 'react';
import { boxes_img } from '../assets';
import Data from '../components/Data';
import Details from '../components/Details';
import ErrorHandler from '../components/ErrorHandler';
import Final from '../components/Final';
import Form from "../components/Form";
import Loader from '../components/Loader';
import MyTableContainer from '../components/MyTableContainer';
import TableComponent from '../components/TableComponent';
import { FaBell, FaRegUserCircle } from 'react-icons/fa';
import { useAuth } from '../AuthProvider';
import { useNavigate } from 'react-router-dom';

const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Summary = () => {
  const auth = useAuth();
  const navigate=useNavigate();
  const [toggle, setToggle] = useState(2);
  const [form, setForm] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleRowClick = (params) => {
    setSelectedHistory(params?.row?.details);
    setDialogOpen(true);
    // setRequest_id(params?.row?.id);
  };

  const toggleForm = () => {
    navigate('/userlogin');
    // setForm(true);
  };

  const toggleSummary = () => {
    setForm(false);
  };

  return (
    <div className=" h-full">
      <div className="flex justify-center items-center gap-6 text-neutral-50 text-xl text-center md:mt-14">
        {!form && (
          <div className='flex md:flex-row flex-col'>
            <button onClick={() => setToggle(0)} className={`w-40 h-12 ${toggle === 0 ? 'bg-orange-400' : ' bg-gray-400'} p-2 rounded-lg text-sm font-semibold mx-2 my-2`}>Recommendations & tips</button>
            <button onClick={() => setToggle(1)} className={`w-40 h-12 ${toggle === 1 ? 'bg-orange-400' : ' bg-gray-400'} p-2 rounded-lg text-sm font-semibold mx-2 my-2`}>Cost breakdown</button>
            <button onClick={() => setToggle(2)} className={`w-40 h-12 ${toggle === 2 ? 'bg-orange-400' : ' bg-gray-400'} p-2 rounded-lg text-sm font-semibold mx-2 my-2`}>Summary</button>
            {/* <button onClick={() => setToggle(3)} className={`w-40 h-12 ${toggle === 3 ? 'bg-orange-400' : ' bg-gray-400'} p-2 rounded-lg text-sm font-semibold`}>Tenders</button> */}
            {/* <button onClick={() => setToggle(4)} className={`w-40 h-auto ${toggle === 4 ? 'bg-orange-400' : ' bg-gray-400'} p-2 rounded-lg text-sm font-semibold`}>Approved tenders</button> */}
            <div className="flex items-center max-md:w-14 max-md:h-14 w-20 h-20 bg-red-500 rounded- full font-semibold shadow-2xl p-5 max-md:p-3 text-white text-lg max-md:text-sm mx-2 my-2" onClick={toggleForm}>Create Tender</div>
          </div>
        )}
      </div>
      <div className="mx-10 my-10">
        {!form && (
          <>
            {/* Red circle with outer shadow */}

            {toggle === 2 && (
              <div className='flex flex-col justify-center items-center gap-3'>
                <Final />
              </div>
            )}

            {toggle === 1 && (
              <div className='flex flex-col items-center justify-center gap-3 mt-10'>
                <Details />
                <TableComponent />
              </div>
            )}

            {toggle === 0 && (
              <div className=' flex flex-col items-center justify-center gap-3 mt-10'>
                <Data />
              </div>
            )}
            {/* Background image */}
            <img src={boxes_img} alt="background" className='w-full' />
          </>
        )}
      </div>
      {form && <Form toggleSummary={toggleSummary} />}
    </div>
  );
};

export default Summary;
