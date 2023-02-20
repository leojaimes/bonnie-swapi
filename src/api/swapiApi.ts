import axios from "axios";

// export const swapiApi = axios.create({
//     baseURL: 'https://swapi.dev/api'
// })
const baseURL = 'https://swapi.dev/api'
const swapiApi = axios.create({
    baseURL: baseURL
});

export default swapiApi;

