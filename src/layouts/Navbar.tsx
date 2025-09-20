import { useState } from 'react';
import { LOGO_IMAGE } from '../constants/constant';
import { signOut } from 'firebase/auth';
import { useSelector } from 'react-redux';
import DefaultAvatar from '../assets/Profile_Avatar.jpg';
import { auth } from '../lib/firebase';
import { RootState } from '../types';

export const Navbar = () => {
	const [showPopover, setShowPopover] = useState(false);

	const currentUser = useSelector((state: RootState) => state.user);

	const togglePopover = () => {
		setShowPopover((prev) => !prev);
	};

	const handleSignOut = () => {
		signOut(auth)
			.then(() => {
				// navigate('/');
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<div className='absolute top-0 z-[999] bg-black/60 w-full flex justify-between px-2'>
				<img
					src={LOGO_IMAGE}
					alt='Netflix Logo'
					className='w-48 h-20'
				/>
				{currentUser && (
					<div
						className='flex justify-center items-center hover:cursor-pointer top-3.5'
						onMouseOver={() => setShowPopover(true)}
						onMouseOut={() => setShowPopover(false)}
						onClick={togglePopover}>
						<img
							className='w-[50px] h-[50px] object-contain'
							src={currentUser?.photoURL || DefaultAvatar}
							alt='profile image'
						/>
						{currentUser?.displayName && (
							<span>{`Welcome,${currentUser?.displayName}`}</span>
						)}
						<span className='text-3xl font-bold'>˯</span>
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
				)}
			</div>
		</>
	);
};