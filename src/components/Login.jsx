import React, { useState } from 'react'

export const Login = () => {

	const [isLogin, setIsLogin] = useState(true);

	const toggleLoginForm = () => {
		
		setIsLogin(prev => !prev)
	}

  return (
		<div className='px-12 h-[500px] justify-evenly absolute top-30 left-120 w-[30%] bg-black/40 z-[9999] flex flex-col'>
			<h1 className='text-2xl text-white font-extrabold'>{`${
				isLogin ? 'Sign In' : 'Sign Up'
			}`}</h1>
			<input
				className='p-4 outline-0 text-white border-gray-500 border-1 placeholder-gray-300'
				type='text'
				aria-label='Email/Mobile no.'
				placeholder='Email or mobile number'
			/>
			<input
				className='p-4 outline-0 text-white border-gray-500 border-1 placeholder-gray-300'
				aria-label='password'
				type='password'
				placeholder='Password'
			/>
			<button className='p-2 cursor-pointer bg-red-600 text-white'>{`${
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
						isLogin
							? 'Sign up now'
							: 'Sign in'
					}`}
				</a>
			</div>
		</div>
	);
}
