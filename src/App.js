import React from "react";
import CharacterTable from "./charactertable"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function App() {

    const [starWarsData, setStarWarsData] = React.useState(null)

    const [darkMode, setDarkMode] = React.useState(JSON.parse(localStorage.getItem('darkMode')) || false)

    const [currentPage, setCurrentPage] = React.useState(0)

    const [displayPage, setDisplayPage] = React.useState(null)

    const [search, setSearch] = React.useState('')

    React.useEffect(() => localStorage.setItem('darkMode', JSON.stringify(darkMode)), [darkMode])

    React.useEffect(() => darkMode ? document.body.style = 'background-color: rgb(36, 35, 37);' : document.body.style = '', [darkMode])
    
    React.useEffect(() => {
        console.log('useEffect ran!')
        fetchFullCharacterList()
    }, [])

    React.useEffect(() => {
        if (starWarsData === null) {
            return
        }
        setDisplayPage(starWarsData[0])
    }, [starWarsData])

    React.useEffect(() => {
        if (starWarsData === null) {
            return
        } else if (currentPage === 9) {
            return
        }
        setDisplayPage(starWarsData[currentPage])
    }, [currentPage])

    function handleSearchChange(event) {
        setSearch(event.target.value)
    }

    function findCharacter(event) {
        const flattenedData = starWarsData.flat();
        flattenedData.map((item) => {
            if (event.target.value === item.name) {
                
            }
        })
    }

    function changeToDarkMode() {
        setDarkMode(prevDarkMode => !prevDarkMode)
    }

    function displayCurrentPage() {
        setDisplayPage(starWarsData[currentPage])
    }

    function changeToNextPage() {
        if (currentPage === 8){
            return
        }
        setCurrentPage(currentPage + 1) 
        console.log(currentPage)
    }

    function changeToPreviousPage() {
        if (currentPage === 0) {
            return
        }
        setCurrentPage(currentPage - 1)
    }

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

    async function fetchFullCharacterList() {
        let nextPage = 'https://swapi.dev/api/people/?page=1';

        let fullCharacterList = [];

        while (nextPage) {
            var res = await fetch(nextPage);
            var data = await res.json()
            for (const character of data.results) {
                getHomeworld(character);
                getSpecies(character);
            };
            fullCharacterList = [...fullCharacterList, data.results];
            nextPage = data.next;             
        }
        setStarWarsData(fullCharacterList)
    }

    console.log(search)

    return (
        <div>
            <Button onClick={changeToDarkMode}>Dark Mode</Button>
            <div className="container">
                <Form>
                    <Form.Group className="mb-3" controlId="formSearch">
                        <Form.Control type="text" onChange={handleSearchChange} placeholder="Search" />
                    </Form.Group>
                </Form>
            </div>
            <CharacterTable 
                starWarsData={starWarsData}
                darkMode={darkMode}
                currentPage={currentPage}
                displayPage={displayPage}
            />
            <div className="text-center">
                <Button onClick={changeToPreviousPage}>Previous Page</Button>
                <Button onClick={changeToNextPage}>Next Page</Button>
            </div>
        </div>
    )
}

