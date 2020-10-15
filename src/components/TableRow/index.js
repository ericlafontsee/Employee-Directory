import React from "react";

function TableRow(props){
    return (<tr>
        <td>
            <img src={props.picture}></img>
        </td>
        <td>
            {props.firstName}
        </td>
        <td>
            {props.lastName}
        </td>
        <td>
            {props.email}
        </td>
        <td>
            {props.phone}
        </td>
    </tr>)
}
export default TableRow;