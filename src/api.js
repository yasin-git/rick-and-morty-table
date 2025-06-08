import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const getCharacters = async (params = {}) => {
    try {
        const response = await axios.get(`${BASE_URL}/character`, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching characters:', error);
        throw error;
    }
};