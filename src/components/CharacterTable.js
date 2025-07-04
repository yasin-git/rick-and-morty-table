import React from 'react'; // React kütüphanesini içe aktar

// Karakter listesini tablo formatında gösteren bileşen
const CharacterTable = ({ characters, onCharacterSelect }) => {
    // Karakter listesi boş veya undefined ise uyarı mesajı göster
    if (!characters || characters.length === 0) {
        return <div className="no-results-message">Filtrelerinize uygun karakter bulunamadı.</div>;
    }

    return (
        <div className="table-container">
            {/* Karakter verilerini tablo olarak düzenle */}
            <table>
                <thead>
                    {/* Tablo başlıklarını tanımla */}
                    <tr>
                        <th>Resim</th>
                        <th>Ad</th>
                        <th>Durum</th>
                        <th>Tür</th>
                        <th>Cinsiyet</th>
                        <th>Menşei</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Karakterleri döngüyle tablo satırlarına dönüştür */}
                    {characters.map((character) => (
                        <tr key={character.id} onClick={() => onCharacterSelect(character)}>
                            {/* Karakter resmini yuvarlak stil ile göster */}
                            <td><img src={character.image} alt={character.name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} /></td>
                            <td>{character.name}</td>
                            <td>{character.status}</td>
                            <td>{character.species}</td>
                            <td>{character.gender}</td>
                            <td>{character.origin.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Bileşeni dışa aktar
export default CharacterTable;
