import React from "react";
import Table from "react-bootstrap/Table"
import Spinner from "react-bootstrap/Spinner"

export default function CharacterTable({displayPage}) {

    return (
        <div className='container'>
            <Table variant="dark" striped hover bordered id="expensetable">
                <thead className='table-light'>
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
                    {displayPage && displayPage.map((item, i) => {
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
                    )}
                </tbody>
            </Table>     
        </div>
    )
}
