import React from "react";
import Table from "react-bootstrap/Table"

export default function CharacterTable(props) {

    // const tableElements = props.tableData.map(item => (
    //     <tr key={item.id}>
    //         <td>{item.expense}</td>
    //         <td>$ {item.amount}</td>
    //         <td>{}</td>
    //         <td>{item.store}</td>
    //         <td><button id={item.id} onClick={props.removeTableData}>Delete</button></td>
    //     </tr>
    //     )
    // )

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
                        {/* {tableElements} */}
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
                        {/* {tableElements} */}
                    </tbody>
                </Table>}
        </div>
    )
}
