import React from "react";
import CharacterTable from "./charactertable"
import Button from "react-bootstrap/Button";

export default function App() {

    const [starWarsData, setStarWarsData] = React.useState({results: [{
        name:'',
        birth_year:'',
        height:'',
        mass:'',
        homeworld:''
    }]})

    const [darkMode, setDarkMode] = React.useState(JSON.parse(localStorage.getItem('darkMode')) || false)

    const [currentPage, setCurrentPage] = React.useState('')

    function changeToDarkMode() {
        setDarkMode(prevDarkMode => !prevDarkMode)
    }

    React.useEffect(() => localStorage.setItem('darkMode', JSON.stringify(darkMode)), [darkMode])

    React.useEffect(() => darkMode ? document.body.style = 'background-color: rgb(36, 35, 37);' : document.body.style = '', [darkMode])
    
    React.useEffect(() => {
        fetch('https://swapi.dev/api/people/')
            .then(res => res.json())
            .then(data => setStarWarsData(data))
    }, [])

    return (
        <div>
            <Button onClick={changeToDarkMode}>Dark Mode</Button>
            <CharacterTable 
                starWarsData={starWarsData}
                darkMode={darkMode}
            />
        </div>
    )
}

