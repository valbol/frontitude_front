import React, { useState, useEffect } from 'react';
import axios from 'axios';


import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Forecast from './Forecast';


const Main = props => {

  const [cityName, setCityName] = useState();
  const [cityKey, setCityKey] = useState();
  const [autocompleteData, setAutocompleteData] = useState([])
  const [forecast, setForecast] = useState([])
  

  const changeHandler = (e) => {
    setCityName(e.target.value);
    console.log(`change_handler=${cityName}`)
  };

  const onBlurHandler = (e) => {
    setCityName(e.target.value);
    console.log(`name3=${e.target.value}`)
    let key = autocompleteData.filter(data => data.cityKey === e.target.value)
    console.log(`cityKey=${key}`)
  }

  const onClickHandler = async () => {
    console.log(`onclick_key=${cityKey}`)
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
        console.log(typeof response.data)
        let autoData = JSON.parse(response.data)
				setAutocompleteData(autoData)
        setCityKey(JSON.parse(autoData[0].cityKey))
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, [cityName]);

console.log(`autocompleteData`)
console.log(autocompleteData)
  return (
  <>
    <Stack spacing={1} sx={{ width: 1200, boxShadow: 4,borderRadius: 1, p: 3}} alignItems="stretch" >
      <h1 style={{ "text-align" : "center"}}>FrontiWheather</h1>
      <Autocomplete
        {...autocompleteData}
        id="clear-on-escape"
        clearOnEscape
        options={autocompleteData.map((option) => option.city)}
        renderInput={(choises) => (
          <TextField {...choises} label='city name' onChange={changeHandler} onBlur={onBlurHandler} variant='standard' value={cityName} placeholder={'Enter city name'}/>
        )}
      />
      <button
		    type={props.type}
			  onClick={onClickHandler}
		  >GO</button>  
      <Forecast value={forecast} city={cityName} />
    </Stack>
	</>
  )
};

export default Main;
