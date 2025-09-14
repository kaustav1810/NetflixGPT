import React, {
	useEffect,
	useState,
} from 'react';
import { useSelector } from 'react-redux';

export const NowPlayingBanner = () => {
	const nowPlayingMovieList = useSelector(
		(state) => state.movie.nowPlayingMovies
	);

	const [randomMovie, setRandomMovie] = useState(
		null
	);

	useEffect(() => {
		const index = Math.floor(Math.random() * 20);

        setRandomMovie({ ...nowPlayingMovieList?.[index] });
	}, [nowPlayingMovieList]);

	return (
		<div className='w-full text-white z-50 border-white'>
			<div className='w-56'>
				<h1 className='font-extrabold text-3xl'>
					{randomMovie?.title}
				</h1>
				<div className='flex justify-between'>
					<button className='rounded-xl text-black p-4 w-30 bg-white outline-none'>
						Play
					</button>
					<button className='rounded-xl text-white p-4 w-30 border-white outline-none'>
						More Info
					</button>
				</div>
			</div>
		</div>
	);
};
