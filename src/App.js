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
    const [pageSize, setPageSize] = useState(20); 
    const [filters, setFilters] = useState({}); 
    const [sortOption, setSortOption] = useState(''); 
    const [selectedCharacter, setSelectedCharacter] = useState(null);

   
    const fetchCharacters = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
           
            const charactersPerPageFromAPI = 20; .
            const apiPagesToFetchPerAppPage = Math.ceil(pageSize / charactersPerPageFromAPI);

            /
            const apiStartPage = (currentPage - 1) * apiPagesToFetchPerAppPage + 1;
         .
            const apiEndPage = apiStartPage + apiPagesToFetchPerAppPage - 1;


            let allCharacters = [];
            let totalAPIPagesAvailable = 1; 
            const initialParams = { ...filters, page: apiStartPage };
            const initialData = await getCharacters(initialParams);
            totalAPIPagesAvailable = initialData.info.pages;

           
            for (let i = apiStartPage; i <= apiEndPage && i <= totalAPIPagesAvailable; i++) {
                const pageParams = { ...filters, page: i };
                const pageData = await getCharacters(pageParams);
                if (pageData.results) { 
                    allCharacters = [...allCharacters, ...pageData.results];
                }
            }

           
            const startIndex = 0; 
            const fetchedCharacters = allCharacters.slice(startIndex, pageSize);

           
            if (sortOption === 'name_asc') {
                fetchedCharacters.sort((a, b) => a.name.localeCompare(b.name));
            } else if (sortOption === 'name_desc') {
                fetchedCharacters.sort((a, b) => b.name.localeCompare(a.name));
            }

            setCharacters(fetchedCharacters);

           
            setTotalPages(Math.ceil(initialData.info.count / pageSize));

        } catch (err) {
            console.error("Karakterler yüklenirken hata oluştu:", err); 
            setError('Karakterler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin veya filtreleri kontrol edin.');
            setCharacters([]);
            setTotalPages(1); 
        } finally {
            setLoading(false);
        }
    }, [currentPage, filters, sortOption, pageSize]);
    useEffect(() => {
        fetchCharacters();
    }, [fetchCharacters]); 

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1);
        setSelectedCharacter(null); 
    };

    const handleSortChange = (newSortOption) => {
        setSortOption(newSortOption);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePageSizeChange = (newSize) => {
        setPageSize(newSize);
        setCurrentPage(1); 
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
                pageSize={pageSize}
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
