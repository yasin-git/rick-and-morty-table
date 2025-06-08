import React from 'react';

const CharacterTable = ({ characters, onCharacterSelect }) => {
    if (!characters || characters.length === 0) {
        return <div className="no-results-message">Filtrelerinize uygun karakter bulunamadı.</div>;
    }

    return (
        <div className="table-container">
            <table>
                <thead>
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
                    {characters.map((character) => (
                        <tr key={character.id} onClick={() => onCharacterSelect(character)}>
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

export default CharacterTable;