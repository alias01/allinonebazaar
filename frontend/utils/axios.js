import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;
const PORT = import.meta.env.VITE_API_PORT;
const httpAxios = axios.create({ baseURL: `${baseURL}:${PORT}` });

export default httpAxios;
