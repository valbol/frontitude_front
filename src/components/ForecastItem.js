import React from 'react';

import './ForecastItem.css'

const ForecastItem = ({ date, Min, Max }) => {
    return (
        <>
            <li className='forecast-item'>      
            	<h3> {date.split("T")[0]}</h3>
				<p>
					Minimum: {Min} 
				</p>
				<p>
					Maximum: {Max}
				</p>
            </li>
        </>
    );
};

export default ForecastItem;
