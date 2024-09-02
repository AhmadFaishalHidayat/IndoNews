import axios from 'axios';

const newsApi = axios.create({
    baseURL: "https://newsapi.org"
});

export default newsApi;