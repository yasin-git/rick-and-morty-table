import React, { useState, useEffect, useCallback } from 'react';
import { getCharacters } from './api'; // API'den karakter verilerini çeken fonksiyon
import Filters from './components/Filters'; // Filtreleme bileşeni
import CharacterTable from './components/CharacterTable'; // Karakter tablosu bileşeni
import CharacterDetail from './components/CharacterDetail'; // Karakter detay bileşeni
import Pagination from './components/Pagination'; // Sayfalama bileşeni
import './App.css'; // Stil dosyası

// Ana uygulama bileşeni
function App() {
    // Durum (state) tanımlamaları
    const [characters, setCharacters] = useState([]); // Karakter listesi
    const [loading, setLoading] = useState(true); // Yüklenme durumu
    const [error, setError] = useState(null); // Hata mesajı
    const [currentPage, setCurrentPage] = useState(1); // Geçerli sayfa numarası
    const [totalPages, setTotalPages] = useState(1); // Toplam sayfa sayısı
    const [pageSize, setPageSize] = useState(20); // Sayfadaki karakter sayısı
    const [filters, setFilters] = useState({}); // Filtreleme kriterleri
    const [sortOption, setSortOption] = useState(''); // Sıralama seçeneği
    const [selectedCharacter, setSelectedCharacter] = useState(null); // Seçilen karakter

    // Karakterleri API'den çeken ve işleyen fonksiyon
    const fetchCharacters = useCallback(async () => {
        setLoading(true); // Yüklenme durumunu başlat
        setError(null); // Hata durumunu sıfırla
        try {
            // API'den alınacak karakter sayısını ve sayfalama mantığını hesapla
            const charactersPerPageFromAPI = 20;
            const apiPagesToFetchPerAppPage = Math.ceil(pageSize / charactersPerPageFromAPI);
            const apiStartPage = (currentPage - 1) * apiPagesToFetchPerAppPage + 1;
            const apiEndPage = apiStartPage + apiPagesToFetchPerAppPage - 1;

            // Tüm karakterleri biriktirmek için dizi
            let allCharacters = [];
            let totalAPIPagesAvailable = 1;
            const initialParams = { ...filters, page: apiStartPage };
            const initialData = await getCharacters(initialParams); // İlk sayfa verilerini al
            totalAPIPagesAvailable = initialData.info.pages;

            // Gerekli API sayfalarını döngüyle al
            for (let i = apiStartPage; i <= apiEndPage && i <= totalAPIPagesAvailable; i++) {
                const pageParams = { ...filters, page: i };
                const pageData = await getCharacters(pageParams);
                if (pageData.results) {
                    allCharacters = [...allCharacters, ...pageData.results]; // Karakterleri biriktir
                }
            }

            // Sayfadaki karakterleri kes
            const startIndex = 0;
            const fetchedCharacters = allCharacters.slice(startIndex, pageSize);

            // Sıralama seçeneğine göre karakterleri sırala
            if (sortOption === 'name_asc') {
                fetchedCharacters.sort((a, b) => a.name.localeCompare(b.name));
            } else if (sortOption === 'name_desc') {
                fetchedCharacters.sort((a, b) => b.name.localeCompare(b.name));
            }

            setCharacters(fetchedCharacters); // Karakter listesini güncelle
            setTotalPages(Math.ceil(initialData.info.count / pageSize)); // Toplam sayfa sayısını güncelle

        } catch (err) {
            // Hata durumunda konsola log yaz ve hata mesajını göster
            console.error("Karakterler yüklenirken hata oluştu:", err);
            setError('Karakterler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin veya filtreleri kontrol edin.');
            setCharacters([]); // Karakter listesini sıfırla
            setTotalPages(1); // Sayfa sayısını sıfırla
        } finally {
            setLoading(false); // Yüklenme durumunu bitir
        }
    }, [currentPage, filters, sortOption, pageSize]);

    // Filtre, sayfa veya sıralama değiştiğinde karakterleri yeniden yükle
    useEffect(() => {
        fetchCharacters();
    }, [fetchCharacters]);

    // Filtre değiştiğinde durumu güncelle
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1); // İlk sayfaya dön
        setSelectedCharacter(null); // Seçili karakteri sıfırla
    };

    // Sıralama seçeneği değiştiğinde durumu güncelle
    const handleSortChange = (newSortOption) => {
        setSortOption(newSortOption);
        setCurrentPage(1); // İlk sayfaya dön
    };

    // Sayfa değiştiğinde durumu güncelle
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Sayfa boyutu değiştiğinde durumu güncelle
    const handlePageSizeChange = (newSize) => {
        setPageSize(newSize);
        setCurrentPage(1); // İlk sayfaya dön
    };

    // Karakter seçildiğinde durumu güncelle
    const handleCharacterSelect = (character) => {
        setSelectedCharacter(character);
    };

    // JSX ile uygulama arayüzünü oluştur
    return (
        <div className="App">
            <h1>Rick and Morty Karakterleri</h1>

            {/* Filtreleme ve sıralama kontrolleri */}
            <Filters
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
                onPageSizeChange={handlePageSizeChange}
                filters={filters}
                pageSize={pageSize}
            />

            {/* Yüklenme ve hata durumlarını göster */}
            {loading && <p>Karakterler yükleniyor...</p>}
            {error && <p className="error-message">{error}</p>}

            {/* Karakter tablosu ve sayfalama */}
            {!loading && !error && (
                <>
                    <CharacterTable
                        characters={characters}
                        onCharacterSelect={handleCharacterSelect}
                    />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </>
            )}

            {/* Seçilen karakterin detaylarını göster */}
            <CharacterDetail character={selectedCharacter} />
        </div>
    );
}

// Bileşeni dışa aktar
export default App;
