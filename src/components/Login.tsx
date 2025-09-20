import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
import {
	useCallback,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { BANNER_IMAGE } from '../constants/constant';
import {
	AUTH_ERROR,
	FORM_FIELD,
} from '../constants/formConstant';
import { auth } from '../utils/firebase';
import {
	getDisplayErrorMessage,
	getErrorMessage,
} from '../utils/util';

import { addUser } from '../slice/userSlice';

interface IError {
	[key: string]: string;
}

export const Login = () => {
	const dispatch = useDispatch();

	const [isLogin, setIsLogin] = useState(true);
	const [error, setError] = useState<IError>({});

	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const nameRef = useRef<HTMLInputElement>(null);
	const profilePicRef = useRef<HTMLInputElement>(null);

	const refArr = useMemo(() => {
		return [
			emailRef,
			passwordRef,
			nameRef,
			profilePicRef,
		];
	}, []);

	const toggleLoginForm = () => {
		refArr?.forEach((ref) => {
			if (ref.current) ref.current.value = '';
		});

		setError({});

		setIsLogin((prev) => !prev);
	};

	const handleInput = useCallback(
		(inputRef: React.RefObject<HTMLInputElement | null>, fieldName: string) => {
			const errorMessage = getErrorMessage(
				fieldName,
				inputRef?.current?.value
			);

			setError({
				...error,
				[fieldName]: errorMessage,
				[AUTH_ERROR]: '',
			});
		},
		[error]
	);

	const isLoginDisabled = useMemo(() => {
		return (
			error[AUTH_ERROR] ||
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

	const handleLoginError = ({ message }: { message: string }) => {
		const errorMessage =
			getDisplayErrorMessage(message);

		setError({ [AUTH_ERROR]: errorMessage });
	};

	const handleUserAuthentication = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault();

			if (isLoginDisabled) {
				return;
			}

			if (isLogin) {
				signInWithEmailAndPassword(
					auth,
					emailRef?.current?.value || '',
					passwordRef?.current?.value || ''
				)
					.then((userCredential) => {
						// Signed in
						const user = userCredential.user;
						console.log(user, 'user');
					})
					.catch((error) => {
						handleLoginError(error);
					});
			} else {
				createUserWithEmailAndPassword(
					auth,
					emailRef?.current?.value || '',
					passwordRef?.current?.value || ''
				)
					.then(async (userCredential) => {
						await updateProfile(
							userCredential.user,
							{
								displayName:
									nameRef?.current?.value,
							}
						);

						const { uid, email, displayName } =
							auth.currentUser!;

						dispatch(
							addUser({
								uid,
								email,
								displayName,
							})
						);
					})
					.catch((error) => {
						handleLoginError(error);
					});
			}
		},
		[dispatch, isLogin, isLoginDisabled]
	);

	return (
		<main className='relative w-full min-h-screen'>
			<img
				src={BANNER_IMAGE}
				className='w-full min-h-screen object-cover'
				alt='Netflix Banner Image'
			/>
			<div className='flex items-center justify-center h-full z-20'>
				<form
					onSubmit={handleUserAuthentication}
					className='px-12 h-[500px] justify-evenly absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] max-w-sm min-w-[320px] bg-black/40 z-[9999] flex flex-col'>
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
					{error[AUTH_ERROR] && (
						<span className='text-red-500 text-[0.8rem]'>
							{error[AUTH_ERROR]}
						</span>
					)}
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
				</form>
			</div>
		</main>
	);
};