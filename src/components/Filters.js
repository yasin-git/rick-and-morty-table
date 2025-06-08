import React, { useState } from 'react';

const Filters = ({ onFilterChange, onSortChange, onPageSizeChange, filters }) => {
    const [nameFilter, setNameFilter] = useState(filters.name || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [speciesFilter, setSpeciesFilter] = useState(filters.species || '');
    const [sortOption, setSortOption] = useState(''); // ad için sıralama 

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        onFilterChange({
            name: nameFilter,
            status: statusFilter,
            species: speciesFilter,
        });
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
        onSortChange(e.target.value); // 'name_asc', 'name_desc' gibi değerler
    };

    const handlePageSizeChange = (e) => {
        onPageSizeChange(parseInt(e.target.value, 10));
    };

    return (
        <div className="filters-container">
            <h3>Filtreler</h3>
            <form onSubmit={handleFilterSubmit}>
                <input
                    type="text"
                    placeholder="İsme göre filtrele"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">Duruma göre filtrele</option>
                    <option value="alive">Alive</option>
                    <option value="dead">Dead</option>
                    <option value="unknown">Unknown</option>
                </select>
                <input
                    type="text"
                    placeholder="Türüne göre filtrele"
                    value={speciesFilter}
                    onChange={(e) => setSpeciesFilter(e.target.value)}
                />
                <button type="submit">Uygula</button>
            </form>

            <h3>Sıralama</h3>
            <select value={sortOption} onChange={handleSortChange}>
                <option value="">Sıralama Seçeneği</option>
                <option value="name_asc">İsme Göre (A-Z)</option>
                <option value="name_desc">İsme Göre (Z-A)</option>
            </select>

            <h3>Sayfa Boyutu</h3>
            <select onChange={handlePageSizeChange}>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={250}>250</option> {/* Maksimum 250 sonuç gösterilebilir */}
            </select>
        </div>
    );
};

export default Filters;