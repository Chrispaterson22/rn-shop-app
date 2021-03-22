import React from 'react'
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	KeyboardAvoidingView,
	Button,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import Input from '../../components/UI/Input'
import Card from '../../components/UI/Card'
import Colors from '../../constants/Colors'

const AuthScreen = props => {
	return (
		<KeyboardAvoidingView
			behavior='padding'
			keyboardVerticalOffset={50}
			style={styles.screen}
		>
			<LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
				<Card style={styles.authContainer}>
					<ScrollView>
						<Input
							id='email'
							label='E-Mail'
							keyboardType='email-address'
							required
							email
							autoCapitalize='none'
							errorMessage='Please enter a valid email address'
							onInputChange={() => {}}
							initialValue=''
						/>
						<Input
							id='password'
							label='Password'
							keyboardType='default'
							secureTextEntry
							required
							minLength={5}
							autoCapitalize='none'
							errorMessage='Please enter a valid password'
							onInputChange={() => {}}
							initialValue=''
						/>
						<View style={styles.btn}>
							<Button title='Login' color={Colors.primary} onPress={() => {}} />
						</View>
						<View style={styles.btn}>
							<Button
								title='Sign Up'
								color={Colors.accent}
								onPress={() => {}}
							/>
						</View>
					</ScrollView>
				</Card>
			</LinearGradient>
		</KeyboardAvoidingView>
	)
}

AuthScreen.navigationOptions = {
	headerTitle: 'Login',
}

export default AuthScreen

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	gradient: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	authContainer: {
		width: '80%',
		maxWidth: 400,
		maxHeight: 400,
		padding: 20,
	},
	btn: {
		marginTop: 10,
	},
})
