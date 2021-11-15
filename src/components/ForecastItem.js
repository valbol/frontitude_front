import React from 'react';
import { Link } from 'react-router-dom';

import './ForecastItem.css'

const ForecastItem = ({ date,Min,Max }) => {
console.log(date)
    return (
        <>
            <li className='forecast-item'>
                <table>
                    <tbody>
                        <tr>
                            <td>           
                                    <h3> {date.split("T")[0]}</h3>
                                <p>
                                    Minimum: {Min} 
                                </p>
                                <p>
                                   Maximum: {Max}
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </li>
        </>
    );
};

export default ForecastItem;
