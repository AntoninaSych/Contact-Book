import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://67125c406c5f5ced66233306.mockapi.io',
});

export default instance;
