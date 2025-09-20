import { TMDB_API_HEADERS, TMDB_BASE_URL } from '../constants/apiConstants';
import { TMDBMovieResponse, TMDBVideoResponse } from '../types';

export class TMDBService {
	private static async request<T>(endpoint: string): Promise<T> {
		const response = await fetch(`${TMDB_BASE_URL}${endpoint}`, {
			method: 'GET',
			headers: TMDB_API_HEADERS,
		});

		if (!response.ok) {
			throw new Error(`TMDB API Error: ${response.status}`);
		}

		return response.json();
	}

	static async getNowPlayingMovies(): Promise<TMDBMovieResponse> {
		return this.request<TMDBMovieResponse>('/movie/now_playing?language=en-US&page=1');
	}

	static async getMovieVideos(movieId: number): Promise<TMDBVideoResponse> {
		return this.request<TMDBVideoResponse>(`/movie/${movieId}/videos?language=en-US`);
	}
}