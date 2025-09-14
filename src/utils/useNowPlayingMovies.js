import { useEffect, useState } from 'react';
import { API_HEADER } from '../constants/apiConstants';

export const useNowPlayingMovies = () => {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetch(
					'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
					{
						method: 'GET',
						headers: API_HEADER,
					}
				);
				const jsonData = await data.json();

				const nowPlayingMovies =
					jsonData?.results;

				setMovies(nowPlayingMovies);
			} catch (e) {
				console.log(e);
			}
		};
		fetchData();
	}, []);

	return { movies };
};
