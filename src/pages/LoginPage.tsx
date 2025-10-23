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
import { auth } from '../lib/firebase';
import {
	getDisplayErrorMessage,
	getErrorMessage,
} from '../utils/validation';
import { addUser } from '../store/slices/userSlice';
import { FormError } from '../types';

const INPUT_CLASSES = 'w-full p-4 bg-gray-700/50 rounded-md outline-0 text-white border border-gray-600 placeholder-gray-400 focus:border-white focus:bg-gray-700/70 transition-colors';

export const LoginPage = () => {
	const dispatch = useDispatch();

	const [isLogin, setIsLogin] = useState(true);
	const [error, setError] = useState<FormError>({});

	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const nameRef = useRef<HTMLInputElement>(null);

	const refArr = useMemo(() => {
		return [emailRef, passwordRef, nameRef];
	}, []);

	const toggleLoginForm = () => {
		refArr?.forEach((ref) => {
			if (ref.current) ref.current.value = '';
		});

		setError({});
		setIsLogin((prev) => !prev);
	};

	const handleInput = useCallback(
		(
			inputRef: React.RefObject<HTMLInputElement | null>,
			fieldName: string
		) => {
			const errorMessage = getErrorMessage(
				fieldName,
				inputRef?.current?.value
			);

			setError((prevError) => ({
				...prevError,
				[fieldName]: errorMessage,
				[AUTH_ERROR]: '',
			}));
		},
		[]
	);

	const isLoginDisabled = useMemo(() => {
		return (
			error[AUTH_ERROR] ||
			Object.values(error).join('').length > 0 ||
			(!isLogin &&
				(!nameRef?.current ||
					nameRef?.current?.value?.trim() === '')) ||
			!emailRef?.current ||
			emailRef?.current?.value?.trim() === '' ||
			!passwordRef?.current ||
			passwordRef?.current?.value?.trim() === ''
		);
	}, [error, isLogin]);

	const handleLoginError = useCallback(({
		message,
	}: {
		message: string;
	}) => {
		const errorMessage = getDisplayErrorMessage(message);
		setError({ [AUTH_ERROR]: errorMessage });
	}, []);

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
					.then(() => {
						// Signed in successfully
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
						await updateProfile(userCredential.user, {
							displayName: nameRef?.current?.value,
						});

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
		[dispatch, isLogin, isLoginDisabled, handleLoginError]
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
					className='px-12 py-12 justify-evenly absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] max-w-md min-w-[320px] bg-black/75 backdrop-blur-sm rounded-md z-[9999] flex flex-col gap-4'>
					<h1 className='text-3xl text-white font-bold mb-4'>{`${
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
								className={INPUT_CLASSES}
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
							className={INPUT_CLASSES}
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
							className={INPUT_CLASSES}
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
						className={`p-3 mt-4 bg-red-600 text-white rounded-md font-semibold ${
							isLoginDisabled
								? 'disabled cursor-not-allowed opacity-50'
								: 'cursor-pointer hover:bg-red-700 transition-colors'
						}`}>{`${
						isLogin ? 'Sign In' : 'Sign Up'
					}`}</button>
					{error[AUTH_ERROR] && (
						<span className='text-red-500 text-[0.8rem]'>
							{error[AUTH_ERROR]}
						</span>
					)}
					<div className='mt-4'>
						<span className='text-gray-400'>
							{`${
								isLogin
									? 'New to Netflix?'
									: 'Already have an account?'
							}`}
						</span>{' '}
						<button
							type='button'
							className='text-white cursor-pointer hover:underline font-semibold bg-transparent border-0 p-0'
							onClick={toggleLoginForm}>
							{`${
								isLogin
									? 'Sign up now'
									: 'Sign in'
							}`}
						</button>
					</div>
				</form>
			</div>
		</main>
	);
};