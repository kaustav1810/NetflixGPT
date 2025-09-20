import { useEffect, useState } from 'react';
import {
	TMDB_API_HEADERS,
	TMDB_BASE_URL,
} from '../../constants/apiConstants';
import { MovieVideo } from '../../types';

export const useMovieTrailer = (movieId: number) => {
	const [movieVideos, setMovieVideos] = useState<MovieVideo[]>([]);

	useEffect(() => {
		if (!movieId) return;

		const fetchMovieVideos = async () => {
			try {
				const response = await fetch(
					`${TMDB_BASE_URL}/movie/${movieId}/videos`,
					{
						method: 'GET',
						headers: TMDB_API_HEADERS,
					}
				);

				const data = await response?.json();

				console.log('Movie videos - ', data);

				setMovieVideos(data?.results || []);
			} catch (error) {
				console.error('Error fetching movie videos:', error);
			}
		};

		fetchMovieVideos();
	}, [movieId]);

	return movieVideos;
};
