import React, { useState, useEffect, useCallback } from 'react';
import { getCharacters } from './api';
import Filters from './components/Filters';
import CharacterTable from './components/CharacterTable';
import CharacterDetail from './components/CharacterDetail';
import Pagination from './components/Pagination';
import './App.css'; 

function App() {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(20); // Varsayılan sayfa boyutu
    const [filters, setFilters] = useState({}); // name, status, species
    const [sortOption, setSortOption] = useState(''); // 'name_asc', 'name_desc'
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    // Karakterleri API'den çeken fonksiyon
    const fetchCharacters = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Rick and Morty API'si doğrudan sayfa boyutu (pageSize) kabul etmediği için,
            // bizim "sayfa boyutu" konseptimizi API'nin 20'şerlik sayfalarına çevirmemiz gerekiyor.
            const charactersPerPageFromAPI = 20; // Rick and Morty API'sinin varsayılan sayfa boyutu
            // Uygulama sayfa başına kaç API sayfası çekileceğini hesaplarız.
            const apiPagesToFetchPerAppPage = Math.ceil(pageSize / charactersPerPageFromAPI);

            // Bu uygulamanın mevcut sayfasının (currentPage) başlangıç API sayfasını hesaplıyoruz.
            const apiStartPage = (currentPage - 1) * apiPagesToFetchPerAppPage + 1;
            // Düzeltme: apiEndPage hesaplaması doğru olmalıydı.
            // Örneğin pageSize 250 ise ve 13 API sayfası çekilecekse, apiStartPage 1 ise apiEndPage 13 olmalı.
            // Önceki kodda `apiTo-FetchPerAppPage` yazım hatası vardı.
            const apiEndPage = apiStartPage + apiPagesToFetchPerAppPage - 1;


            let allCharacters = [];
            let totalAPIPagesAvailable = 1; // API'nin bildirdiği toplam sayfa sayısı

            // İlk API çağrısını yaparak, genel sayfa bilgilerini (total pages, total count) alırız.
            // Bu çağrı filtreleri içerir ve genellikle ilk sayfa olarak düşünülebilir
            // veya sadece metadata (toplam karakter sayısı, toplam API sayfası) için kullanılır.
            // apiStartPage parametresiyle ilk çekilecek API sayfasını belirtiyoruz.
            const initialParams = { ...filters, page: apiStartPage };
            const initialData = await getCharacters(initialParams);
            totalAPIPagesAvailable = initialData.info.pages;

            // Başlangıç API sayfasından bitiş API sayfasına kadar olan verileri çekiyoruz.
            // Ancak, API'nin gerçekten sahip olduğu sayfa sayısını aşmamaya dikkat ediyoruz.
            for (let i = apiStartPage; i <= apiEndPage && i <= totalAPIPagesAvailable; i++) {
                const pageParams = { ...filters, page: i };
                const pageData = await getCharacters(pageParams);
                if (pageData.results) { // API'den geçerli sonuçlar gelip gelmediğini kontrol edin
                    allCharacters = [...allCharacters, ...pageData.results];
                }
            }

            // Çekilen karakterleri kullanıcının belirlediği sayfa boyutuna göre dilimliyoruz.
            // For döngüsü ile çektiğimiz karakterler, uygulama sayfamız için yeterli olmayabilir
            // veya gerekenden fazla karakter içerebilir (özellikle pageSize 20'nin katı değilse).
            // Bu yüzden slice işlemi burada hala önemlidir.
            const startIndex = 0; // Her zaman ilk karakterden başlarız çünkü `allCharacters` zaten doğru API sayfalarından çekildi.
            const fetchedCharacters = allCharacters.slice(startIndex, pageSize);

            // Sıralama (client-side)
            if (sortOption === 'name_asc') {
                fetchedCharacters.sort((a, b) => a.name.localeCompare(b.name));
            } else if (sortOption === 'name_desc') {
                fetchedCharacters.sort((a, b) => b.name.localeCompare(a.name));
            }

            setCharacters(fetchedCharacters);

            // Toplam sayfa sayısını hesaplarken, API'nin toplam karakter sayısını bizim "pageSize" değerimize böleriz.
            // initialData.info.count, uygulamanın tüm filtrelerine göre toplam karakter sayısını verir.
            setTotalPages(Math.ceil(initialData.info.count / pageSize));

        } catch (err) {
            console.error("Karakterler yüklenirken hata oluştu:", err); // Hatanın konsolda görünmesini sağlar
            setError('Karakterler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin veya filtreleri kontrol edin.');
            setCharacters([]);
            setTotalPages(1); // Hata durumunda toplam sayfayı resetle
        } finally {
            setLoading(false);
        }
    }, [currentPage, filters, sortOption, pageSize]); // Bağımlılıklar

    useEffect(() => {
        fetchCharacters();
    }, [fetchCharacters]); // fetchCharacters değiştiğinde yeniden çalıştır

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1); // Filtreler değiştiğinde ilk sayfaya dön
        setSelectedCharacter(null); // Filtre değiştiğinde detay görüntüsünü temizle
    };

    const handleSortChange = (newSortOption) => {
        setSortOption(newSortOption);
        setCurrentPage(1); // Sıralama değiştiğinde ilk sayfaya dön
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePageSizeChange = (newSize) => {
        setPageSize(newSize);
        setCurrentPage(1); // Sayfa boyutu değiştiğinde ilk sayfaya dön
    };

    const handleCharacterSelect = (character) => {
        setSelectedCharacter(character);
    };

    return (
        <div className="App">
            <h1>Rick and Morty Karakterleri</h1>

            <Filters
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
                onPageSizeChange={handlePageSizeChange}
                filters={filters}
                pageSize={pageSize} // Filters bileşenine pageSize'ı da iletiyoruz
            />

            {loading && <p>Karakterler yükleniyor...</p>}
            {error && <p className="error-message">{error}</p>}

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

            <CharacterDetail character={selectedCharacter} />
        </div>
    );
}

export default App;