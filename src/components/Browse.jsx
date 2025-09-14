import { useDispatch } from 'react-redux';
import { addMovie } from '../slice/movieSlice';
import { useNowPlayingMovies } from '../utils/useNowPlayingMovies';
import { NowPlayingBanner } from './NowPlayingBanner';
import { useEffect } from 'react';

const Browse = () => {
	const dispatch = useDispatch();

	const {movies} = useNowPlayingMovies();

	useEffect(() => {
		if (movies) {
			dispatch(addMovie(movies));
		}
	},[dispatch,movies])
	
		
	return <div className='w-full m-0 relative top-32 left-16'>
		<NowPlayingBanner/>
	</div>;
};

export default Browse;
