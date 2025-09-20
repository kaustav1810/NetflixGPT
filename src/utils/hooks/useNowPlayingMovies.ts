import { useEffect, useState } from 'react';
import { TMDB_API_HEADERS, TMDB_BASE_URL } from '../../constants/apiConstants';
import { Movie } from '../../types';

export const useNowPlayingMovies = () => {
	const [movies, setMovies] = useState<Movie[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetch(
					`${TMDB_BASE_URL}/movie/now_playing?language=en-US&page=1`,
					{
						method: 'GET',
						headers: TMDB_API_HEADERS,
					}
				);
				const jsonData = await data.json();

				const nowPlayingMovies: Movie[] = jsonData?.results || [];

				setMovies(nowPlayingMovies);
			} catch (e) {
				console.log(e);
			}
		};
		fetchData();
	}, []);

	return { movies };
};
