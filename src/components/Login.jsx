import React, {
	useCallback,
	useMemo,
	useRef,
	useState,
} from 'react';
import { getErrorMessage } from '../utils/util';
import { FORM_FIELD } from '../constants/formConstant';
import { auth } from '../utils/firebase';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';

export const Login = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [error, setError] = useState({});

	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const nameRef = useRef(null);

	const refArr = [emailRef, passwordRef, nameRef];
	
		const toggleLoginForm = () => {
			refArr?.forEach(
				(ref) =>
				{
					if (ref.current)
						ref.current.value = ""
				}
			);

			setIsLogin((prev) => !prev);
		};

	const handleInput = useCallback(
		(inputRef, fieldName) => {
			const errorMessage = getErrorMessage(
				fieldName,
				inputRef?.current?.value
			);

			setError({
				...error,
				[fieldName]: errorMessage,
			});
		},
		[error]
	);

	const isLoginDisabled = useMemo(() => {

		return (
			Object.values(error).join('').length > 0 ||
			(!isLogin &&
				(!nameRef?.current ||
					nameRef?.current?.value?.trim() ===
						'')) ||
			!emailRef?.current ||
			emailRef?.current?.value?.trim() === '' ||
			!passwordRef?.current ||
			passwordRef?.current?.value?.trim() === ''
		);
	}, [error, isLogin]);

	const handleUserAuthentication = useCallback(
		(e) => {
			e.preventDefault();

			if (isLoginDisabled) {
				return;
			}

			if (isLogin) {
				signInWithEmailAndPassword(
					auth,
					emailRef?.current?.value,
					passwordRef?.current?.value
				)
					.then((userCredential) => {
						// Signed in
						const user = userCredential.user;
						console.log(user, 'user');

						// ...
					})
					.catch((error) => {
						const errorCode = error.code;
						const errorMessage = error.message;

						alert(errorCode + ' ' + errorMessage);
					});
			} else {
				createUserWithEmailAndPassword(
					auth,
					emailRef?.current?.value,
					passwordRef?.current?.value
				)
					.then((userCredential) => {
						// Signed up
						const user = userCredential.user;

						console.log(user, 'user');
						// ...
					})
					.catch((error) => {
						const errorCode = error.code;
						const errorMessage = error.message;

						alert(errorCode + ' ' + errorMessage);
						// ..
					});
			}
		},
		[isLogin, isLoginDisabled]
	);


	return (
		<form
			onSubmit={handleUserAuthentication}
			className='px-12 h-[500px] justify-evenly absolute top-30 left-120 w-[30%] bg-black/40 z-[9999] flex flex-col'>
			<h1 className='text-2xl text-white font-extrabold'>{`${
				isLogin ? 'Sign In' : 'Sign Up'
			}`}</h1>
			{!isLogin && (
				<div>
					<input
						onChange={() =>
							handleInput(
								nameRef,
								FORM_FIELD['NAME']
							)
						}
						ref={nameRef}
						className=' w-full p-4 outline-0 text-white border-gray-500 border-1 placeholder-gray-300'
						type='text'
						aria-label='Full Name'
						placeholder='Full Name'
					/>
					{error[FORM_FIELD['NAME']] && (
						<span className='text-red-500 text-[0.8rem]'>
							{error[FORM_FIELD['NAME']]}
						</span>
					)}
				</div>
			)}
			<div>
				<input
					onChange={() =>
						handleInput(
							emailRef,
							FORM_FIELD['EMAIL']
						)
					}
					ref={emailRef}
					className=' w-full p-4 outline-0 text-white border-gray-500 border-1 placeholder-gray-300'
					type='text'
					aria-label='Email/Mobile no.'
					placeholder='Email or mobile number'
				/>
				{error[FORM_FIELD['EMAIL']] && (
					<span className='text-red-500 text-[0.8rem]'>
						{error[FORM_FIELD['EMAIL']]}
					</span>
				)}
			</div>
			<div>
				<input
					onChange={() =>
						handleInput(
							passwordRef,
							FORM_FIELD['PASSWORD']
						)
					}
					ref={passwordRef}
					className='p-4 w-full outline-0 text-white border-gray-500 border-1 placeholder-gray-300'
					aria-label='password'
					type='password'
					placeholder='Password'
				/>
				{error[FORM_FIELD['PASSWORD']] && (
					<span className='text-red-500 text-[0.8rem]'>
						{error[FORM_FIELD['PASSWORD']]}
					</span>
				)}
			</div>
			<button
				type='submit'
				onClick={handleUserAuthentication}
				className={`p-2 bg-red-600 text-white ${
					isLoginDisabled
						? 'disabled cursor-not-allowed opacity-50'
						: 'cursor-pointer'
				}`}>{`${
				isLogin ? 'Sign In' : 'Sign Up'
			}`}</button>
			<div>
				<span className='text-gray-400'>
					{`${
						isLogin
							? 'New to Netflix?'
							: 'Already have an account?'
					}`}
				</span>
				<a
					className='text-white cursor-pointer hover:underline'
					onClick={toggleLoginForm}>
					{`${
						isLogin ? 'Sign up now' : 'Sign in'
					}`}
				</a>
			</div>
		</form>
	);
};
