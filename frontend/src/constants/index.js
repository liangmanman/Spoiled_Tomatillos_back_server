let apiEndpoint;

if (process.env.NODE_ENV === 'production') {
  apiEndpoint = '';
} else {
  apiEndpoint = 'http://localhost:8080/';
}

export const API_ENDPOINT = apiEndpoint;
export const OMDB_API = 'https://www.omdbapi.com';
export const OMDB_API_KEY = '/?apikey=e05e044b&s=';
