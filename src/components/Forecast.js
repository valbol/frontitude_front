import ForecastItem from "./ForecastItem"

const Forecast = props => {
	props.value.forEach(e => console.log(e.date))
console.log('========PROPS================')
console.log(props)

return(
<>
<h1 style={{ "text-align" : "center"}}> The weather in {props.city} for the upcoming 5 days:</h1>
	<ul >
	{props.value.map(e => (
		<ForecastItem 
			id={Math.random()}
			date={e.date}
			Min={e.Min.Value}
			Max={e.Max.Value}
		/>))
	}
	</ul>
</>
)
}

export default Forecast;