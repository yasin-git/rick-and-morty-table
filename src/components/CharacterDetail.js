import React from 'react'; // React kütüphanesini içe aktar

// Karakter detaylarını gösteren bileşen
const CharacterDetail = ({ character }) => {
    // Karakter verisi yoksa uyarı mesajı göster
    if (!character) {
        return <div className="character-detail-container">Lütfen bir karakter seçin.</div>;
    }

    return (
        <div className="character-detail-container">
            {/* Karakterin adını başlık olarak göster */}
            <h2>{character.name}</h2>
            {/* Karakterin resmini göster */}
            <img src={character.image} alt={character.name} />
            {/* Karakterin durum bilgisini göster */}
            <p><strong>Durum:</strong> {character.status}</p>
            {/* Karakterin türünü göster */}
            <p><strong>Tür:</strong> {character.species}</p>
            {/* Karakterin cinsiyetini göster */}
            <p><strong>Cinsiyet:</strong> {character.gender}</p>
            {/* Karakterin menşeini göster */}
            <p><strong>Menşei:</strong> {character.origin.name}</p>
            {/* Karakterin son konumunu göster */}
            <p><strong>Son Konum:</strong> {character.location.name}</p>
            {/* Gelecekte eklenebilecek detaylar için yer tutucu */}
            {/* Diğer detaylar eklenebilir */}
        </div>
    );
};

// Bileşeni dışa aktar
export default CharacterDetail;
