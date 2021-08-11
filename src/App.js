import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppContextProvider from './contexts/AppContext';
import Dashboard from './views/Dashboard';
import Opening from './views/Opening';
import Coder from './views/Coder';

function App() {
	return (
		<AppContextProvider>
			<Router>
				<Switch>
					<Route exact path="/">
						<Opening />
					</Route>
					<Route exact path="/dashboard">
						<Dashboard />
					</Route>
					<Route exact path="/coder">
						<Coder />
					</Route>
				</Switch>
			</Router>
		</AppContextProvider>
	);
}

export default App;
