import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

import ForecastList from '../ForecastList/ForecastList';
import useMain from './useMain';

const Main = () => {
  const {
    title,
    cityKey,
    forecast,
    autocompleteData,
    changeHandler,
    onBlurHandler,
    onClickHandler,
    radioChangeHandler,
    state,
  } = useMain();

  return (
    <>
      <Stack
        spacing={1}
        alignItems="stretch"
        sx={{
          maxWidth: '100%',
          minWidth: 300,
          boxShadow: 4,
          borderRadius: 2,
          p: 10,
        }}
      >
        <Typography
          variant="h4"
          component="div"
          sx={{ padding: 5, textAlign: 'center', margin: 0 }}
        >
          FrontiWheather
        </Typography>
        <RadioGroup
          row
          aria-label="Type"
          name="row-radio-buttons-group"
          value={state.unit}
          onChange={radioChangeHandler}
        >
          <FormControlLabel value="celsius" control={<Radio />} label="Celsius" />
          <FormControlLabel value="fahrenheit" control={<Radio />} label="Fahrenheit" />
        </RadioGroup>
        <Autocomplete
          id="clear-on-escape"
          clearOnEscape
          options={autocompleteData.map((option) => {
            return `${option.city}, ${option.country}`;
          })}
          renderInput={(choices) => (
            <TextField
              {...choices}
              label="city name"
              onChange={changeHandler}
              onBlur={onBlurHandler}
              variant="standard"
              placeholder={'Enter city name'}
            />
          )}
        />
        <Button variant="contained" size="medium" onClick={onClickHandler}>
          GO
        </Button>
        <ForecastList data={forecast} city={title} cityKey={cityKey} />
      </Stack>
    </>
  );
};

export default Main;
