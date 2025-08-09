import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {
	BANNER_IMAGE,
	LOGO_IMAGE,
} from '../constants/constant';


const Navbar = () => {

    	const navigate = useNavigate();

			const [showPopover, setShowPopover] =
                useState(false);
    
    	const togglePopover = () => {
				setShowPopover((prev) => !prev);
			};

			const handleSignOut = () => {
				signOut(auth)
					.then(() => {
						// Sign-out successful.

						navigate('/');
					})
					.catch((error) => {
						// An error happened.
					});
            };
    
  return (
      <>
          
			{/* Dark Overlay */}
			<div className='absolute inset-0 bg-black/60 z-10'></div>

			<div className='absolute top-0 z-[999] w-full flex justify-between px-2'>
				<img
					src={LOGO_IMAGE}
					alt='Netflix Logo'
					className='w-48 h-20 '
				/>
				<div
					className=' flex justify-center items-center hover:cursor-pointer top-3.5'
					onMouseOver={() => setShowPopover(true)}
					onMouseOut={() => setShowPopover(false)}
					onClick={togglePopover}>
					<img
						className='w-[50px] h-[50px] object-contain'
						src='https://occ-0-2232-3662.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABcLtVOXjghzlDrVwmPHGQtkXjoJPmpISBttze62ZpxaaFWq-LZVH5yZxMD15UVLU6nd4GIUtTSHOMsbUOdPCIYRL2-2bGNU.png?r=b38'
						alt='profile image'
					/>
					<span className='text-3xl font-bold'>
						˯
					</span>
					{showPopover && (
						<div className='absolute min-w-[100px] flex flex-col top-1/2 translate-y-8 border-2 p-1.5 backdrop-blur-2xl hover:cursor-pointer'>
							<a
								className='hover:cursor-pointer'
								onClick={handleSignOut}>
								Logout
							</a>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default Navbar