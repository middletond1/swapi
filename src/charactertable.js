import React from "react";
import Table from "react-bootstrap/Table"
import Spinner from "react-bootstrap/Spinner"

export default function CharacterTable(props) {

    const tableElements = props.displayPage === null ? [] : props.displayPage.map((item, i) => {
        return (
            <tr key={i}>
                <td>{item.name}</td>
                <td>{item.birth_year}</td>
                <td>{item.height}</td>
                <td>{item.mass}</td>
                <td>{item.homeworld}</td>
                <td>{item.species}</td>
            </tr>
            )
        } 
    )

    return (
        <div className='container'>
            {props.starWarsData === null ?
                <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading</span>
                </Spinner>
                :
                props.darkMode ? 
                    <Table variant="dark" striped hover bordered id="expensetable">
                        <thead className={`${props.darkMode ? 'table-light' : 'table-success'}`}>
                            <tr>
                                <th>Name</th>
                                <th>Birth Date</th>
                                <th>Height</th>
                                <th>Mass</th>
                                <th>Homeworld</th>
                                <th>Species</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableElements}
                        </tbody>
                    </Table>
                : 
                    <Table striped hover bordered id="expensetable">
                        <thead className={`${props.darkMode ? 'table-light' : 'table-success'}`}>
                            <tr>
                                <th>Name</th>
                                <th>Birth Date</th>
                                <th>Height</th>
                                <th>Mass</th>
                                <th>Homeworld</th>
                                <th>Species</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableElements}
                        </tbody>
                    </Table>
            }
            
        </div>
    )
}
