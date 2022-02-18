import React from "react";
import CharacterTable from "./charactertable"
import Button from "react-bootstrap/Button";

export default function App() {

    const [darkMode, setDarkMode] = React.useState(JSON.parse(localStorage.getItem('darkMode')) || false)

    function changeToDarkMode() {
        setDarkMode(prevDarkMode => !prevDarkMode)
    }

    React.useEffect(() => localStorage.setItem('darkMode', JSON.stringify(darkMode)), [darkMode])

    React.useEffect(() => darkMode ? document.body.style = 'background-color: rgb(36, 35, 37);' : document.body.style = '', [darkMode])

    return (
        <div>
            <Button onClick={changeToDarkMode}>Dark Mode</Button>
            <CharacterTable 
                darkMode={darkMode}
            />
        </div>
    )
}