import { useEffect } from 'react';
import './App.css';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './utils/firebase';
import { useDispatch } from 'react-redux';
import {
	addUser,
	removeUser,
} from './slice/userSlice';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(
			auth,
			async (user) => {
				if (user) {

					console.log('user --------------> ', user);
					
					dispatch(
						addUser({
							displayName: user.displayName,
							profilePhoto: user.photoURL,
							email: user.email
						})
					);
					navigate('/browse');
				} else {
					console.log('Logged out!!');
					dispatch(removeUser());
					navigate('/');
				}
			}
		);

		return () => unsubscribe();
	}, [dispatch, navigate]);

	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
}

export default App;
