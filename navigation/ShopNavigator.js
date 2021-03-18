import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { Platform } from 'react-native'

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import Colors from '../constants/Colors'
import { Ionicons } from '@expo/vector-icons'

const defaultNavOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
	},
	headerTitleStyle: {
		fontFamily: 'open-sans',
	},
	headerBackTitleStyle: {
		fontFamily: 'open-sans',
	},
	headerTintColor: Platform.OS === 'android' ? '#fff' : Colors.primary,
}

const ProductsNavigator = createStackNavigator(
	{
		ProductsOverview: ProductsOverviewScreen,
		ProductDetail: ProductDetailScreen,
		Cart: CartScreen,
	},
	{
		navigationOptions: {
			drawerIcon: drawerConfig => (
				<Ionicons
					name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
					size={23}
					color={drawerConfig.tintColor}
				/>
			),
		},
		defaultNavigationOptions: defaultNavOptions,
	}
)

const OrdersNavigator = createStackNavigator(
	{
		Orders: OrdersScreen,
	},
	{
		navigationOptions: {
			drawerIcon: drawerConfig => (
				<Ionicons
					name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
					size={23}
					color={drawerConfig.tintColor}
				/>
			),
		},
		defaultNavigationOptions: defaultNavOptions,
	}
)

const ShopNavigator = createDrawerNavigator(
	{
		Products: ProductsNavigator,
		Orders: OrdersNavigator,
	},
	{
		contentOptions: {
			activeTintColor: Colors.primary,
		},
	}
)

export default createAppContainer(ShopNavigator)
