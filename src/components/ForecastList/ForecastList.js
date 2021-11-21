import Typography from '@mui/material/Typography';

import ForecastItem from "../ForcastItem/ForecastItem"

const ForecastList = ({data, city, cityKey}) => {

	return (
		<>
			<Typography  hidden={!city} variant="h5" component="div" sx={{padding: 3, textAlign: "center"}}>
        		The weather in {city} for the upcoming 5 days
      		</Typography>
			<ul >
			{data.map(e => {
console.log(e)
				return (
					<ForecastItem 
						key={`${e.date}_${cityKey}`} 
						date={e.date}
						Min={e.Min.Value}
						Max={e.Max.Value}
						Unit={e.Min.Unit}
					/>
				)				
			})}
			</ul>
		</>
	)
}

export default ForecastList;