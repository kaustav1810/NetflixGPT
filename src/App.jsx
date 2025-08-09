import { useEffect, useState } from 'react';
import './App.css';

import {
	onAuthStateChanged,
	signOut,
} from 'firebase/auth';
import { auth } from './utils/firebase';
import { useDispatch } from 'react-redux';
import {
	addUser,
	removeUser,
} from './slice/userSlice';
import {
	Outlet,
	useNavigate,
} from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const { displayName, email } = user;

				dispatch(addUser({ displayName, email }));
			} else {
				console.log('Logged out!!');
				dispatch(removeUser());
			}
		});
	}, []);

	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
}

export default App;
