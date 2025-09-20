
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export const TMDB_API_HEADERS = {
	accept: 'application/json',
	Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
};
