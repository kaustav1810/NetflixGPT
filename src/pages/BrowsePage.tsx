import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addMovie } from '../store/slices/movieSlice';
import { useNowPlayingMovies } from '../utils/hooks/useNowPlayingMovies';
import { NowPlayingBanner } from '../components/features/NowPlayingBanner';
import { MainLayout } from '../layouts/MainLayout';

const BrowsePage = () => {
	const dispatch = useDispatch();
	const { movies } = useNowPlayingMovies();

	useEffect(() => {
		if (movies) {
			dispatch(addMovie(movies));
		}
	}, [dispatch, movies]);

	return (
		<MainLayout>
			<div className='w-full m-0 relative top-32 left-16'>
				<NowPlayingBanner />
			</div>
		</MainLayout>
	);
};

export default BrowsePage;