import React, { useState } from 'react'; // React ve useState kancasını içe aktar

// Karakter filtreleme, sıralama ve sayfa boyutu seçimini yöneten bileşen
const Filters = ({ onFilterChange, onSortChange, onPageSizeChange, filters }) => {
    // Filtre durumlarını yönetmek için yerel state'ler
    const [nameFilter, setNameFilter] = useState(filters.name || ''); // İsim filtresi
    const [statusFilter, setStatusFilter] = useState(filters.status || ''); // Durum filtresi
    const [speciesFilter, setSpeciesFilter] = useState(filters.species || ''); // Tür filtresi
    const [sortOption, setSortOption] = useState(''); // Sıralama seçeneği

    // Filtre formu gönderildiğinde çağrılır
    const handleFilterSubmit = (e) => {
        e.preventDefault(); // Varsayılan form gönderimini engelle
        // Filtreleri üst bileşene ilet
        onFilterChange({
            name: nameFilter,
            status: statusFilter,
            species: speciesFilter,
        });
    };

    // Sıralama seçeneği değiştiğinde çağrılır
    const handleSortChange = (e) => {
        setSortOption(e.target.value); // Yerel sıralama durumunu güncelle
        onSortChange(e.target.value); // Sıralama seçeneğini üst bileşene ilet
    };

    // Sayfa boyutu değiştiğinde çağrılır
    const handlePageSizeChange = (e) => {
        onPageSizeChange(parseInt(e.target.value, 10)); // Yeni sayfa boyutunu üst bileşene ilet
    };

    return (
        <div className="filters-container">
            {/* Filtreleme başlığı */}
            <h3>Filtreler</h3>
            {/* Filtre formu */}
            <form onSubmit={handleFilterSubmit}>
                {/* İsim filtresi için metin girişi */}
                <input
                    type="text"
                    placeholder="İsme göre filtrele"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                />
                {/* Durum filtresi için açılır menü */}
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">Duruma göre filtrele</option>
                    <option value="alive">Alive</option>
                    <option value="dead">Dead</option>
                    <option value="unknown">Unknown</option>
                </select>
                {/* Tür filtresi için metin girişi */}
                <input
                    type="text"
                    placeholder="Türüne göre filtrele"
                    value={speciesFilter}
                    onChange={(e) => setSpeciesFilter(e.target.value)}
                />
                {/* Filtreleri uygulamak için buton */}
                <button type="submit">Uygula</button>
            </form>

            {/* Sıralama başlığı */}
            <h3>Sıralama</h3>
            {/* Sıralama seçenekleri için açılır menü */}
            <select value={sortOption} onChange={handleSortChange}>
                <option value="">Sıralama Seçeneği</option>
                <option value="name_asc">İsme Göre (A-Z)</option>
                <option value="name_desc">İsme Göre (Z-A)</option>
            </select>

            {/* Sayfa boyutu başlığı */}
            <h3>Sayfa Boyutu</h3>
            {/* Sayfa boyutu seçenekleri için açılır menü */}
            <select onChange={handlePageSizeChange}>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={250}>250</option> {/* Maksimum 250 sonuç gösterilebilir */}
            </select>
        </div>
    );
};

// Bileşeni dışa aktar
export default Filters;
