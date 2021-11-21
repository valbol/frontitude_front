import React from 'react';

import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const ForecastItem = ({ date, Min, Max }) => {
    return (
        <>
        	<CardContent sx={{textAlign: "center",  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)",
  								borderRadius: "6px", overflow: "hidden", margin: 1}}>
      			<Typography variant="h5" component="div">
        			{date.split("T")[0]}
      			</Typography>
				<br />
      			<Typography sx={{ mb: 1.5 }} color="text.secondary">
        			Minimum: {Min} 
    				<br />
        			Maximum: {Max}	
      			</Typography>
    		</CardContent>
        </>
    );
};

export default ForecastItem;
