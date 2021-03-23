import React, { useState } from 'react'
import { LogBox } from 'react-native'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import ReduxThunk from 'redux-thunk'

import productsReducer from './store/reducers/products'
import cartReducer from './store/reducers/cart'
import ordersReducer from './store/reducers/orders'
import authReducer from './store/reducers/auth'
import NavigationContainer from './navigation/NavigationContainer'

LogBox.ignoreLogs([
	'Your project is accessing the following APIs from a deprecated global rather than a module import: Constants (expo-constants).',
])

const rootReducer = combineReducers({
	products: productsReducer,
	cart: cartReducer,
	orders: ordersReducer,
	auth: authReducer,
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

const fetchFonts = () => {
	return Font.loadAsync({
		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
	})
}

export default function App() {
	const [fontLoaded, setFontLoaded] = useState(false)

	if (!fontLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onError={console.warn}
				onFinish={() => {
					setFontLoaded(true)
				}}
			/>
		)
	}

	return (
		<Provider store={store}>
			<NavigationContainer />
		</Provider>
	)
}
