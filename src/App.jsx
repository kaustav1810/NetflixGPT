import { useEffect } from 'react';
import './App.css';
import { Login } from './components/Login';
import {
	BANNER_IMAGE,
	LOGO_IMAGE,
} from './constants/constant';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './utils/firebase';
import { useDispatch } from 'react-redux';
import {
	addUser,
	removeUser,
} from './slice/userSlice';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const { displayName, email } = user;

				dispatch(addUser({ displayName, email }));
			} else {
				dispatch(removeUser());
			}
		});
	}, []);

	return (
		<main className='relative w-full h-screen'>
			<img
				src={BANNER_IMAGE}
				className='w-full h-full object-cover'
				alt='Netflix Banner Image'
			/>
			{/* Dark Overlay */}
			<div className='absolute inset-0 bg-black/60 z-10'></div>

			<div className='absolute top-0 left-40 w-48 h-20 z-[999] '>
				<img
					src={LOGO_IMAGE}
					alt='Netflix Logo'
					className='w-full h-full object-contain'
				/>
			</div>
			<Login />
		</main>
	);
}

export default App;
