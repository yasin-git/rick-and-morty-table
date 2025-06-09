import React from 'react'; // React kütüphanesini içe aktar

// Sayfalama işlemlerini yöneten bileşen
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    // Gösterilecek sayfa numaralarını tutan dizi
    const pageNumbers = [];
    
    // Aynı anda gösterilecek maksimum sayfa numarası
    const maxPageNumbersToShow = 5;
    // Gösterilecek ilk sayfa numarasını hesapla
    let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
    // Gösterilecek son sayfa numarasını hesapla
    let endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

    // Eğer gösterilen sayfa sayısı maxPageNumbersToShow'dan azsa, başlangıç sayfasını ayarla
    if (endPage - startPage + 1 < maxPageNumbersToShow) {
        startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
    }

    // Sayfa numaralarını diziye ekle
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination-container">
            {/* İlk sayfaya gitmek için buton */}
            <button
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
            >
                İlk
            </button>
            {/* Bir önceki sayfaya gitmek için buton */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Önceki
            </button>
            {/* Sayfa numaralarını gösteren butonlar */}
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={number === currentPage ? 'active' : ''} // Aktif sayfa için stil uygula
                >
                    {number}
                </button>
            ))}
            {/* Bir sonraki sayfaya gitmek için buton */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Sonraki
            </button>
            {/* Son sayfaya gitmek için buton */}
            <button
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
            >
                Son
            </button>
            {/* Mevcut ve toplam sayfa bilgisini göster */}
            <span>
                Sayfa {currentPage} / {totalPages}
            </span>
        </div>
    );
};

// Bileşeni dışa aktar
export default Pagination;
