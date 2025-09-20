/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_TMDB_API_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

export const API_HEADER = {
	accept: 'application/json',
	Authorization: `Bearer ${
		import.meta.env.VITE_TMDB_API_KEY
	}`,
};
