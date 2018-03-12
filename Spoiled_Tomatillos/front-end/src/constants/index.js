let apiEndpoint;

if (process.env.NODE_ENV === 'production') {
    apiEndpoint = 'http://ec2-18-217-211-130.us-east-2.compute.amazonaws.com:8080/';

} else {
    apiEndpoint = 'http://localhost:8080/';

}

export const API_ENDPOINT = apiEndpoint;
export const OMDB_API = 'http://www.omdbapi.com';
export const OMDB_API_KEY = '/?apikey=e05e044b&s=';
