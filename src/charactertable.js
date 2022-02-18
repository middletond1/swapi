import React from "react";
import Table from "react-bootstrap/Table"

export default function CharacterTable(props) {

    const tableElements = props.starWarsData.results.map((item, i) => (
        <tr key={i}>
            <td>{item.name}</td>
            <td>{item.birth_year}</td>
            <td>{item.height}</td>
            <td>{item.mass}</td>
            <td>{item.homeworld}</td>
            <td>{item.species}</td>
        </tr>
        )
    )

    console.log(props.starWarsData)

    return (
        <div className='container'>
            {props.darkMode ? 
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
                </Table>}
        </div>
    )
}
