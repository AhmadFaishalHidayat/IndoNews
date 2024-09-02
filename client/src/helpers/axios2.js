import axios from 'axios';

const serverApi = axios.create({
    baseURL: "http://localhost:3000"
    // baseURL: "https://ip-p2.charltonnet.my.id"
});

export default serverApi;