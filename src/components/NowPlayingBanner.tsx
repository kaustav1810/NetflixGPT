import React, {
	useEffect,
	useState,
} from 'react';
import { useSelector } from 'react-redux';

export interface Movie {
	adult: boolean;
	backdrop_path: string | null;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string | null;
	release_date: string; // ISO format: YYYY-MM-DD
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

interface MovieState {
	nowPlayingMovies: Movie[];
}

interface RootState {
	movie: MovieState;
}

export const NowPlayingBanner = () => {
	const nowPlayingMovieList = useSelector(
		(state: RootState) => state.movie.nowPlayingMovies
	);

	const [randomMovie, setRandomMovie] = useState<Movie>();

	useEffect(() => {
		console.log('movieList',nowPlayingMovieList)
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
					<button className='rounded-xl text-black p-4 w-30 bg-white outline-none cursor-pointer'>
						<span className='text-xxl'>
						⏵
						</span>
						Play
					</button>
					<button className='rounded-xl text-white p-4 w-30 border-white outline-none cursor-pointer'>
						More Info
					</button>
				</div>
			</div>
		</div>
	);
};