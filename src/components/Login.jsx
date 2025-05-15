import React, { useRef, useState } from 'react'
import { validateFormFields } from '../utils/util';
import { FORM_FIELD } from '../constants/formConstant';

export const Login = () => {

	const [isLogin, setIsLogin] = useState(true);
	const [error, setError] = useState({});

	const emailRef = useRef(null);
	const passwordRef = useRef(null);

	const toggleLoginForm = () => {
		
		setIsLogin(prev => !prev)
	}


	const handleSubmit = () => {
		
		const isValidEmail = validateFormFields(
			FORM_FIELD['EMAIL'],
			emailRef?.current?.value
		);

		const isValidPassword = validateFormFields(
			FORM_FIELD['PASSWORD'],
			passwordRef?.current?.value
		);

		
		setError(
			{
				...error,
				[FORM_FIELD["EMAIL"]]: isValidEmail?null:'Email is invalid',
				[FORM_FIELD["PASSWORD"]]: isValidPassword?null:'Password is invalid'
			}
		);
		
	}

	const handleInput = (fieldName) => {
		
		switch (fieldName) {
			case FORM_FIELD["EMAIL"]:
				setError({ ...error, [FORM_FIELD["EMAIL"]]: null });
				break;
			case FORM_FIELD["PASSWORD"]:
				setError({ ...error, [FORM_FIELD["PASSWORD"]]: null });
				break;
			default:
				setError({})
		}
	}
	
  return (
		<div className='px-12 h-[500px] justify-evenly absolute top-30 left-120 w-[30%] bg-black/40 z-[9999] flex flex-col'>
			<h1 className='text-2xl text-white font-extrabold'>{`${
				isLogin ? 'Sign In' : 'Sign Up'
			}`}</h1>
			<div>
			  <input
				  onChange={()=>handleInput(FORM_FIELD["EMAIL"])}
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
				onChange={()=>handleInput(FORM_FIELD["PASSWORD"])}
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
				onClick={handleSubmit}
				className='p-2 cursor-pointer bg-red-600 text-white'>{`${
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
		</div>
	);
}
