export interface TMDBResponse<T> {
	page: number;
	results: T[];
	total_pages: number;
	total_results: number;
}

export interface TMDBMovieResponse extends TMDBResponse<Movie> {}

export interface TMDBVideoResponse {
	id: number;
	results: MovieVideo[];
}