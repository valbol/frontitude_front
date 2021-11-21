import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

const reducer = (state, action) => {
  //state == current state & action == trigger what we need
  // reducer return new updated state
  console.log(`action=${action.type}`);
  switch (action.type) {
    case 'fahrenheit':
      return { unit: 'fahrenheit' };
    case 'celsius':
      return { unit: 'celsius' };
    case 'clear':
      return { unit: '' };
    default:
      return state;
  }
};

const useMain = () => {
  const [cityName, setCityName] = useState();
  const [title, setTitle] = useState();
  const [cityKey, setCityKey] = useState();
  const [autocompleteData, setAutocompleteData] = useState([]);
  const [forecast, setForecast] = useState([]);

  const [state, dispatch] = useReducer(reducer, { unit: 'celsius' }); //!! TODO

  const radioChangeHandler = (e) => {
    dispatch({ type: e.target.value });
  };

  const changeHandler = (e) => {
    setCityName(e.target.value);
  };

  const onBlurHandler = (e) => {
    setCityName(e.target.value);
  };

  const onClickHandler = async () => {
    setTitle(cityName);
    setForecast([]);
    console.log(`state.unit=${state.unit}`);
    let metric = state.unit === 'celsius' ? true : false;
    console.log(`metric=${metric}`);
    try {
      let response = await axios.get(`http://localhost:4000/api/weather/${cityKey}/${metric}`);
      console.log(response);
      const flatData = response.data.DailyForecasts.map((e) => {
        return { date: e.Date, Max: e.Temperature.Maximum, Min: e.Temperature.Minimum };
      });
      console.log(response.data.DailyForecasts);
      setForecast(flatData);
      setCityKey();
      setCityName();
      dispatch({ type: 'clear' });
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  useEffect(() => {
    async function fetchData() {
      try {
        let response = await axios.get(
          `http://localhost:4000/api/weather/autocomplete/${cityName}`
        );
        let autoData = JSON.parse(response.data);
        setAutocompleteData(autoData);
        let cityKey = autoData[0]?.cityKey ? JSON.parse(autoData[0].cityKey) : '';
        setCityKey(cityKey);
      } catch (err) {
        console.log(err.response.data.message);
      }
    }
    fetchData();
  }, [cityName]);

  console.log(`autocompleteData ${JSON.stringify(autocompleteData)}`);

  return {
    title,
    cityKey,
    forecast,
    autocompleteData,
    changeHandler,
    onBlurHandler,
    onClickHandler,
    radioChangeHandler,
    state,
  };
};
export default useMain;
