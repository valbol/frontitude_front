import React, { useState, useEffect } from 'react';
import axios from 'axios';


import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Forecast from './Forecast';


const Main = props => {

  const [cityName, setCityName] = useState('blaaaaaa');
  const [cityKey, setCityKey] = useState('12312313');
  const [autocompleteData, setAutocompleteData] = useState()
  const [forecast, setForecast] = useState([])
  
  const dummy = ["a","b","c",]

  const changeHandler = (e) => {
    setCityName(e.target.value);
  };
const onBlurHandler = () =>{
setCityKey(autocompleteData[0].cityKey)
console.log(`autocompleteData=${autocompleteData[0].cityKey}`)
console.log(`cityKey=${cityKey}`)
}

  const onClickHandler = async (e) => {
    e.preventDefault();
      try {
        let response = await axios.get(`http://localhost:4000/api/weather/${cityKey}`);
      console.log(response)
      const flatData = response.data.DailyForecasts.map(e => {return {date: e.Date, Max: e.Temperature.Maximum, Min: e.Temperature.Minimum}});
console.log(flatData)
      setForecast(flatData)
      }
      catch(err){
        console.log(err)
      } 
  }
    useEffect(() => {
        async function fetchData() {
            try {
                let response = await axios.get(
                    `http://localhost:4000/api/weather/autocomplete/${cityName}`
                );
        console.log('----here----------')
        console.log(response.data)
				setAutocompleteData(response.data)
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();

    }, [cityName]);

  return (
   <>
		<h1>FrontiWheather</h1>
   		<input
        	id={props.id}
        	type={props.type}
        	placeholder={"Enter city name"}
        	onChange={changeHandler}
        	onBlur={onBlurHandler}
			    label="city name"
        	value={cityName}
    	/>
     <Stack spacing={1} sx={{ width: 300 }}>
      <Autocomplete
        {...dummy}
        id="clear-on-escape"
        clearOnEscape
        renderInput={(dummy) => (
          <TextField {...dummy} label='' variant="standard" />
        )}
      />
    </Stack>
		<button
			type={props.type}
			onClick={onClickHandler}
		>GO</button>
    {/*<h2>{forecast}</h2>*/}
    <Forecast value={forecast} city={cityName} />

	</>
)
};

export default Main;
