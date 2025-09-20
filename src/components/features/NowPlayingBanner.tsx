import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMovieTrailer } from '../../utils/hooks/useMovieTrailer';
import { Movie, RootState } from '../../types';

export const NowPlayingBanner = () => {
	const nowPlayingMovieList = useSelector(
		(state: RootState) => state.movie.nowPlayingMovies
	);

	const [randomMovie, setRandomMovie] = useState<Movie>();

	// Move hook call to top level
	const videos = useMovieTrailer(randomMovie?.id || 0);

	useEffect(() => {
		if (nowPlayingMovieList && nowPlayingMovieList.length > 0) {
			const index = Math.floor(Math.random() * nowPlayingMovieList.length);
			setRandomMovie(nowPlayingMovieList[index]);
		}
	}, [nowPlayingMovieList]);

	useEffect(() => {
		if (randomMovie && videos) {
			console.log('videos -> ', videos);
		}
	}, [randomMovie, videos]);

	return (
		<div className='w-full text-white z-50 border-white'>
			<div className='w-56'>
				<h1 className='font-extrabold text-3xl'>{randomMovie?.title}</h1>
				<div className='flex justify-between'>
					<button
						aria-label='Play movie'
						className='rounded-xl text-black p-4 w-32 bg-white outline-none cursor-pointer hover:bg-gray-100 focus:ring-2 focus:ring-white'>
						<span className='text-xl mr-1'>▶</span>
						Play
					</button>
					<button
						aria-label='More information about movie'
						className='rounded-xl text-white p-4 w-32 border border-white outline-none cursor-pointer hover:bg-white hover:text-black focus:ring-2 focus:ring-white'>
						More Info
					</button>
				</div>
			</div>
		</div>
	);
};