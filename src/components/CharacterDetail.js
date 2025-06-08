import React from 'react';

const CharacterDetail = ({ character }) => {
    if (!character) {
        return <div className="character-detail-container">Lütfen bir karakter seçin.</div>;
    }

    return (
        <div className="character-detail-container">
            <h2>{character.name}</h2>
            <img src={character.image} alt={character.name} />
            <p><strong>Durum:</strong> {character.status}</p>
            <p><strong>Tür:</strong> {character.species}</p>
            <p><strong>Cinsiyet:</strong> {character.gender}</p>
            <p><strong>Menşei:</strong> {character.origin.name}</p>
            <p><strong>Son Konum:</strong> {character.location.name}</p>
            {/* Diğer detaylar eklenebilir */}
        </div>
    );
};

export default CharacterDetail;