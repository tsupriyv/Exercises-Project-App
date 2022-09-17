// Importing dependencies.
import React from 'react';
import { MdDeleteForever, MdModeEdit } from 'react-icons/md';

// Function base component for the table row
function Row({ exercise, onDelete, onEdit}) {

    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date.substring(0,10).split("-").reverse().join("-")}</td>
            <td><MdDeleteForever onClick={() => onDelete(exercise._id)} /></td>
            <td><MdModeEdit onClick={() => onEdit(exercise)} /></td>
        </tr>
    );
}


export default Row;