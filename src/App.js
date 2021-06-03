import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WeatherContextProvider from './contexts/WeatherContext';
import Dashboard from './views/Dashboard';
import Opening from './views/Opening';

function App() {
	return (
		<WeatherContextProvider>
			<Router>
				<Switch>
					<Route exact path="/">
						<Opening />
					</Route>
					<Route exact path="/dashboard">
						<Dashboard />
					</Route>
				</Switch>
			</Router>
		</WeatherContextProvider>
	);
}

export default App;
