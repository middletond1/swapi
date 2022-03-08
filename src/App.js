import React from "react";
import axios from 'axios';
import CharacterTable from "./charactertable"
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import logo from "./StarWarsLogo.png";
import './style.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function App() {

    const [starWarsData, setStarWarsData] = React.useState(null)

    const [currentPage, setCurrentPage] = React.useState(0)

    const [displayPage, setDisplayPage] = React.useState(null)

    const [search, setSearch] = React.useState('')
    
    React.useEffect(() => {
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

    React.useEffect(() => {
        if (starWarsData === null) {
            return
        } else if (search === '') {
            setDisplayPage(starWarsData[currentPage])
            return
        }
        setDisplayPage(findCharacter)
    }, [search])

    function handleSearchChange(event) {
        setSearch(event.target.value)
    }

    function findCharacter() {
        const flattenedData = starWarsData.flat();
        return flattenedData.filter(character => character.name.toLowerCase().includes(search.toLowerCase()))
    }



    // Unsure why data variable needs to be destructured when using axios.get instead of .fetch

    async function getHomeworld(character) {
        const {data} = await axios.get(character.homeworld);
        character.homeworld = data.name;
    }

    async function getSpecies(character) {
        if (character.species.length === 0){
            character.species = 'Human'
        } else {
            const {data} = await axios.get(character.species[0]);
            character.species = data.name;
        }      
    }

    async function fetchFullCharacterList() {
        let nextPage = 'https://swapi.dev/api/people/?page=1';

        let fullCharacterList = [];

        while (nextPage) {
            var {data} = await axios.get(nextPage);
            for (const character of data.results) {
                getHomeworld(character);
                getSpecies(character);
            };
            fullCharacterList = [...fullCharacterList, data.results];
            nextPage = data.next;             
        }
        setStarWarsData(fullCharacterList)
    }

    return (
        <div>
            <Container>
                <div className="text-center mb-5 mt-5">
                    <img src={logo} className="logo" alt="Logo" />
                </div>
                <Form>
                    <Form.Group className="mb-3" controlId="formSearch">
                        <Form.Control type="text" onChange={handleSearchChange} placeholder="Search" />
                    </Form.Group>
                </Form>
            </Container>
            <CharacterTable 
                starWarsData={starWarsData}
                currentPage={currentPage}
                displayPage={displayPage}
            />
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs lg="2">
                        <Button onClick={() => setCurrentPage(currentPage === 0 ? 0 : currentPage - 1)}>Prev Page</Button>
                    </Col>
                    <Col xs lg="2">
                        <Button onClick={() => setCurrentPage(currentPage === 8 ? 8 : currentPage + 1)}>Next Page</Button>
                    </Col>
                </Row>
            </Container>           
        </div>
    )
}
