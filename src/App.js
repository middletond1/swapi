import React from "react";
import CharacterTable from "./charactertable"
import Button from "react-bootstrap/Button";

export default function App() {

    const [starWarsData, setStarWarsData] = React.useState({
        results: [ 
            {
                name:'',
                birth_year:'',
                height:'',
                mass:'',
                homeworld:'',
                species:''
            }
        ]
    })

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

    React.useEffect(() => localStorage.setItem('darkMode', JSON.stringify(darkMode)), [darkMode])

    React.useEffect(() => darkMode ? document.body.style = 'background-color: rgb(36, 35, 37);' : document.body.style = '', [darkMode])
    
    React.useEffect(() => {
        fetch(currentPage ? `${currentPage}` : 'https://swapi.py4e.com/api/people/?page=1')
            .then(res => res.json())
            .then(data => setStarWarsData(data))
    }, [currentPage])

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

