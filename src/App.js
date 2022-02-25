import React from "react";
import CharacterTable from "./charactertable"
import Button from "react-bootstrap/Button";

export default function App() {

    const [starWarsData, setStarWarsData] = React.useState(null)

    const [darkMode, setDarkMode] = React.useState(JSON.parse(localStorage.getItem('darkMode')) || false)

    const [currentPage, setCurrentPage] = React.useState('')

    React.useEffect(() => localStorage.setItem('darkMode', JSON.stringify(darkMode)), [darkMode])

    React.useEffect(() => darkMode ? document.body.style = 'background-color: rgb(36, 35, 37);' : document.body.style = '', [darkMode])
    
    React.useEffect(() => {
        console.log('useEffect ran!')
        // fetchCharacters();
        fetchFullCharacterList()
    }, [])

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
        setCurrentPage('https://swapi.dev/api/people/?page=1')
    }

    // async function updateStarWarsData(data) {
    //     for (const character of data.results) {
    //         await getHomeworld(character);
    //         await getSpecies(character);
    //     };
    //     setStarWarsData(data);
    // }

    async function getHomeworld(character) {
        const res = await fetch(character.homeworld);
        const data = await res.json();
        character.homeworld = data.name;
    }

    async function getSpecies(character) {
        if (character.species.length === 0){
            character.species = 'Human'
            return
        } else {
            const res = await fetch(character.species[0]);
            const data = await res.json();
            character.species = data.name;
        }      
    }

    // function fetchCharacters() {
    //     fetch(currentPage ? `${currentPage}` : 'https://swapi.dev/api/people/?page=1').then(res => {
    //         return res.json();
    //     }).then(data => {
    //         console.log(data)
    //         updateStarWarsData(data);
    //     });   
    // }

    async function fetchFullCharacterList() {
        let nextPage = 'https://swapi.dev/api/people/?page=1';

        let fullCharacterList = [];

        while (nextPage) {
            var res = await fetch(nextPage);
            var data = await res.json()
            // for (const character of data.results) {
            //     await getHomeworld(character);
            //     await getSpecies(character);
            // };
            fullCharacterList = [...fullCharacterList, data.results];
            nextPage = data.next;             
        }
        // fullCharacterList = fullCharacterList.flat()
        setStarWarsData(fullCharacterList)
    }

    console.log(starWarsData)

    return (
        <div>
            <Button onClick={changeToDarkMode}>Dark Mode</Button>
            <CharacterTable 
                starWarsData={starWarsData}
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

