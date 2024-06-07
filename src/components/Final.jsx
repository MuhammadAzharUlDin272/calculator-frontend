import React from 'react'
import { useSelector } from 'react-redux';
import { FaHeart } from "react-icons/fa6";
import { sum1, sum2, sum3, sum4, sum5, arrow1 } from '../assets';



const Final = () => {
  const price = useSelector(state => Math.round(state.items.totalPrice));;
  const distanceInKm=useSelector(state=>state.items.distanceInKm);

  return (
    <div className='flex flex-col items-center justify-center gap-3 mt-10'>
      <div className='py-5 text-3xl font-semibold'>Total Cost </div>
      <div className='md:text-7xl text-3xl font-semibold'>{price} NIS</div>

      {/* Dotted grey box */}
      <div className="mt-6 p-4 max-w-2xl w-1/2 flex flex-col items-center text-center">
        <h3 className='flex items-center gap-1'>
          <span><FaHeart className='text-red-600' /></span>
          Pay attention
        </h3>
        <h2>The price shown is just a start!</h2>
      </div>

      <h4 className='underline  text-center md:w-full w-[300px]'> Save up to 30% by creating a tender between leading transport companies.</h4>
      <div className="w-full flex flex-col gap-4 md:flex-row md:flex-wrap items-center justify-content mb-5">
        <div className='bg-white rounded-md p-4 w-[150px] flex flex-col items-center gap-4'>
          <img src={sum1} alt="sum1" />
          <p className='text-sm text-center'>Do the moving and leave a review of the experience</p>
        </div>

        <img src={arrow1} alt="arrow" className="md:block hidden" />

        <div className='bg-white rounded-md p-4 w-[150px] flex flex-col items-center gap-4'>
          <img src={sum2} alt="sum2" />
          <p className='text-sm text-center'>The moving company contact and coordinates the moving with you</p>
        </div>

        <img src={arrow1} alt="arrow" className="md:block hidden" />

        <div className='bg-white rounded-md p-4 w-[150px] flex flex-col items-center gap-4'>
          <img src={sum3} alt="sum3" />
          <p className='text-sm text-center'>You choose the best offer for you</p>
        </div>

        <img src={arrow1} alt="arrow" className="md:block hidden" />

        <div className='bg-white rounded-md p-4 w-[150px] flex flex-col items-center gap-4'>
          <img src={sum4} alt="sum4" />
          <p className='text-sm text-center'>Moving companies compete for the best price for you</p>
        </div>

        <img src={arrow1} alt="arrow" className="md:block hidden" />

        <div className='bg-white rounded-md p-4 w-[150px] flex flex-col items-center gap-4'>
          <img src={sum5} alt="sum5" />
          <p className='text-sm text-center'>Click on the "Create tender" button and open a tender between different transport companies</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="flex flex-col items-center underline">Why should you use a tender?</h3>
        <div className='flex flex-col items-center gap-1 mb-2'>
          <p className='text-2xl'>1</p>
          <p className='font-semibold'>Significant discount</p>
          <p>Save hundreds of shekels on apartment moving services</p>
        </div>
        <div className='flex flex-col items-center gap-1 mb-2'>
          <p className='text-2xl'>2</p>
          <p className='font-semibold'>Competitiveness offers</p>
          <p>Moving companies compete for the best price for you</p>
        </div>
        <div className='flex flex-col items-center gap-1 mb-2'>
          <p className='text-2xl'>3</p>
          <p className='font-semibold'>Transparency</p>
          <p>You receive accurate price offers from reliable transport companies</p>
        </div>
        <div className='flex flex-col items-center gap-1 mb-2'>
          <p className='text-2xl'>4</p>
          <p className='font-semibold'>Convenience</p>
          <p>You get all the offers in one place in one place</p>
        </div>
      </div>
    </div>
  )
}

export default Final
