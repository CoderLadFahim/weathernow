import { createContext, useReducer } from 'react';

export const AppContext = createContext();

const appState = {
	apiKey: '051b2b620d19b836a71135e92c59335f',
	localCoords: {},

	unitSystem: 'metric',
	timelyDataType: 'hourly',

	userSearchingLocation: false,
	searchedLocationName: '',

	activeCoordsForData: {},
	weatherDataToShow: {},
};

const appReducer = (state, action) => {
	switch (action.type) {
		case 'SET_LOCAL_COORDS':
			return { ...state, localCoords: action.payload };

		case 'SET_UNIT_SYSTEM':
			return { ...state, unitSystem: action.payload };

		case 'SET_TIMELY_DATA_TYPE':
			return { ...state, timelyDataType: action.payload };

		case 'SET_USER_SEARCHING_LOCATION':
			return { ...state, userSearchingLocation: action.payload };

		case 'SET_SEARCHED_LOCATION_DATA':
			return { ...state, searchedLocationData: action.payload };

		case 'SET_SEARCHED_LOCATION_NAME':
			return { ...state, searchedLocationName: action.payload };

		case 'SET_ACTIVE_COORDS':
			return { ...state, activeCoordsForData: action.payload };

		case 'SET_WEATHER_DATA_TO_SHOW':
			return { ...state, weatherDataToShow: action.payload };

		default:
			throw new Error('Invalid Action Type!');
	}
};

function AppContextProvider({ children }) {
	const [AppData, dispatch] = useReducer(appReducer, appState);

	return (
		<AppContext.Provider value={{ AppData, dispatch }}>
			{children}
		</AppContext.Provider>
	);
}

export default AppContextProvider;
