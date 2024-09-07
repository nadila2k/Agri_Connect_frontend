import React from 'react';
import './Styles_table.css';
import { FaEdit } from 'react-icons/fa'; 

const Table = ({ columns, data }) => {
    return (
        <table>
            <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index}>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        <td>{row.id}</td>
                        <td>{row.name}</td>
                        <td>
                            <button className="crop-button update-crop-button">
                                <FaEdit className="button-icon" /> Update
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
