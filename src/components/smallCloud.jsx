import React from 'react'
import { newCloud } from '../assets'
const SmallCloud = () => {
  return (
    <div className="">
      {/* <img src={newCloud} alt="Cloud" className="h-full absolute top-0 smallcloud" /> */}

      <svg width="100" height="62" viewBox="0 0 100 62" fill="none" xmlns="http://www.w3.org/2000/svg" className='h-full absolute top-0 smallcloud'>
        <path d="M87.7697 19.2817C86.0635 19.2817 84.4403 19.6295 82.9651 20.2543C81.8347 13.3675 75.8016 8.10903 68.5251 8.10903C65.4212 8.10903 62.5449 9.06849 60.1767 10.7006C56.6192 4.32188 49.7604 0 41.8794 0C30.611 0 21.4317 8.8337 21.0107 19.8863C18.9886 18.7902 16.6686 18.1662 14.2005 18.1662C6.35759 18.1662 0 24.4599 0 32.2233C0 39.9866 6.35802 46.2804 14.2005 46.2804C14.2276 46.2804 14.2542 46.2787 14.2813 46.2782C15.1139 54.9372 22.4792 61.7107 31.4444 61.7107C37.9573 61.7107 43.6253 58.1355 46.5591 52.86C48.025 53.5407 49.6554 53.932 51.3819 53.932C54.2667 53.932 56.8934 52.8613 58.8999 51.1107C61.3993 54.1854 65.2262 56.1573 69.5231 56.1573C77.0534 56.1573 83.1584 50.1144 83.1584 42.6599C83.1584 42.6383 83.1554 42.6172 83.155 42.5956C84.5798 43.1714 86.1362 43.4946 87.7701 43.4946C94.5245 43.4946 100 38.0745 100 31.3882C99.9996 24.7023 94.5241 19.2817 87.7697 19.2817Z" fill="url(#paint0_radial_1725_56936)" />
        <defs>
          <radialGradient id="paint0_radial_1725_56936" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(64.1026 54.7349) rotate(-149.008) scale(72.854 57.5402)">
            <stop offset="0.3412" stop-color="white" />
            <stop offset="0.5838" stop-color="#FCFDFD" />
            <stop offset="0.7401" stop-color="#F4F5F7" />
            <stop offset="0.8716" stop-color="#E5E9EC" />
            <stop offset="0.9894" stop-color="#D0D7DD" />
            <stop offset="0.9992" stop-color="#CED5DB" />
          </radialGradient>
        </defs>
      </svg>


      {/* <img src={cloudleft} alt="Cloud Left" className="w-1/2 h-full absolute top-0 cloud-left" /> */}
    </div>
  )
}

export default SmallCloud