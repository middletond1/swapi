import React from "react";
import CharacterTable from "./charactertable"
import Button from "react-bootstrap/Button";

export default function App() {

    const [starWarsData, setStarWarsData] = React.useState([])

    const [characterArray, setCharacterArray] = React.useState([])

    const [darkMode, setDarkMode] = React.useState(JSON.parse(localStorage.getItem('darkMode')) || false)

    const [currentPage, setCurrentPage] = React.useState('')

    function changeToDarkMode() {
        setDarkMode(prevDarkMode => !prevDarkMode)
    }

    function changeToNextPage() {
        setCurrentPage(starWarsData.next)
    }

    function changeToPreviousPage() {
        setCurrentPage(starWarsData.previous)
    }

    function changeToFirstPage() {
        setCurrentPage('https://swapi.py4e.com/api/people/?page=1')
    }

    async function createCharacterArray(charactersArray) {
        for (const character of charactersArray) {
            await getHomeworld(character);
            await getSpecies(character);
        };
        setCharacterArray(charactersArray);
    }

    async function getHomeworld(character) {
        const res = await fetch(character.homeworld);
        const data = await res.json();
        character.homeworld = data.name;
    }

    async function getSpecies(character) {
        if (character.species.length === 0){
            character.species = 'unknown'
            return
        } else {
            const res = await fetch(character.species[0]);
            const data = await res.json();
            character.species = data.name;
        }      
    }

    async function fetchCharacters() {
        const res = await fetch(currentPage ? `${currentPage}` : 'https://swapi.py4e.com/api/people/?page=1');
        const data = await res.json();
        setStarWarsData(data);
        createCharacterArray(data.results);
    }

    React.useEffect(() => localStorage.setItem('darkMode', JSON.stringify(darkMode)), [darkMode])

    React.useEffect(() => darkMode ? document.body.style = 'background-color: rgb(36, 35, 37);' : document.body.style = '', [darkMode])
    
    React.useEffect(() => {
        fetchCharacters();
    }, [currentPage])

    console.log(characterArray)

    return (
        <div>
            <Button onClick={changeToDarkMode}>Dark Mode</Button>
            <CharacterTable 
                characterArray={characterArray}
                darkMode={darkMode}
            />
            <div className="text-center">
                <Button onClick={changeToFirstPage}>First Page</Button>
                <Button onClick={changeToPreviousPage}>Previous Page</Button>
                <Button onClick={changeToNextPage}>Next Page</Button>
            </div>
        </div>
    )
}

