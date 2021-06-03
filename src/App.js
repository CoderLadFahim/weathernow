import './App.css';
import WeatherContextProvider from './contexts/WeatherContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
	return (
		<WeatherContextProvider>
			<Router>
				<Switch>
					<Route exact path="/">
						<h1 className="text-green-400 text-5xl">Hello World</h1>
					</Route>
				</Switch>
			</Router>
		</WeatherContextProvider>
	);
}

export default App;
