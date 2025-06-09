import axios from 'axios'; // HTTP istekleri için axios kütüphanesini içe aktar

// Rick and Morty API'sinin temel URL'si
const BASE_URL = 'https://rickandmortyapi.com/api';

// Karakter verilerini API'den çeken asenkron fonksiyon
export const getCharacters = async (params = {}) => {
    try {
        // API'den karakter verilerini GET isteği ile al
        const response = await axios.get(`${BASE_URL}/character`, { params });
        // API yanıtındaki veriyi döndür
        return response.data;
    } catch (error) {
        // Hata durumunda konsola hata mesajı yaz
        console.error('Error fetching characters:', error);
        // Hatayı dışarı fırlat
        throw error;
    }
};
