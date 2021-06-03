import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
	return (
		<WeatherContextProvider>
			<Router>
				<Switch>
					<Route exact path="/"></Route>
				</Switch>
			</Router>
		</WeatherContextProvider>
	);
}

export default App;
