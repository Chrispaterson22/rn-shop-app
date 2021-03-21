import React, { useState, useEffect, useCallback, useReducer } from 'react'
import {
	StyleSheet,
	View,
	ScrollView,
	Platform,
	Alert,
	KeyboardAvoidingView,
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'

import HeaderButton from '../../components/UI/HeaderButton'
import Input from '../../components/UI/Input'
import * as productsActions from '../../store/actions/products'

const formReducer = (state, action) => {
	if (action.type === 'FORM_INPUT_UPDATE') {
		const updatedValues = {
			...state.inputValues,
			[action.input]: action.value,
		}
		const updatedValidities = {
			...state.inputValidities,
			[action.input]: action.isValid,
		}
		let updatedFormIsValid = true
		for (const key in updatedValidities) {
			updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
		}
		return {
			formIsValid: updatedFormIsValid,
			inputValues: updatedValues,
			inputValidities: updatedValidities,
		}
	}
	return state
}

const EditProductScreen = props => {
	const prodId = props.navigation.getParam('productId')
	const editedProduct = useSelector(state =>
		state.products.userProducts.find(prod => prod.id === prodId)
	)

	const dispatch = useDispatch()

	const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			title: editedProduct ? editedProduct.title : '',
			imageUrl: editedProduct ? editedProduct.imageUrl : '',
			description: editedProduct ? editedProduct.description : '',
			price: '',
		},
		inputValidities: {
			title: editedProduct ? true : false,
			imageUrl: editedProduct ? true : false,
			description: editedProduct ? true : false,
			price: editedProduct ? true : false,
		},
		formIsValid: editedProduct ? true : false,
	})

	// const [title, setTitle] = useState(editedProduct ? editedProduct.title : '')
	// const [titleIsValid, setTitleIsValid] = useState(false)
	// const [imageUrl, setImageUrl] = useState(
	// 	editedProduct ? editedProduct.imageUrl : ''
	// )
	// const [price, setPrice] = useState('')
	// const [description, setDescription] = useState(
	// 	editedProduct ? editedProduct.description : ''
	// )

	const submitHandler = useCallback(() => {
		if (!formState.formIsValid) {
			Alert.alert('Wrong input!', 'Please check the errors in the form', [
				{ text: 'OK' },
			])
			return
		}
		if (editedProduct) {
			dispatch(
				productsActions.updateProduct(
					prodId,
					formState.inputValues.title,
					formState.inputValues.description,
					formState.inputValues.imageUrl
				)
			)
		} else {
			dispatch(
				productsActions.createProduct(
					formState.inputValues.title,
					formState.inputValues.description,
					formState.inputValues.imageUrl,
					+formState.inputValues.price
				)
			)
		}
		props.navigation.goBack()
	}, [dispatch, prodId, formState])

	useEffect(() => {
		props.navigation.setParams({ submit: submitHandler })
	}, [submitHandler])

	const inputChangeHandler = useCallback(
		(inputIdentifier, inputValue, inputValidity) => {
			dispatchFormState({
				type: 'FORM_INPUT_UPDATE',
				value: inputValue,
				isValid: inputValidity,
				input: inputIdentifier,
			})
		},
		[dispatchFormState]
	)

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }} // REQUIRED!!!!
			behavior='padding'
			keyboardVerticalOffset={100}
		>
			<ScrollView>
				<View style={styles.form}>
					<Input
						id='title'
						label='Title'
						errorText='Please enter a valid title!'
						keyboardType='default'
						autoCapitalize='sentences'
						autoCorrect
						onInputChange={inputChangeHandler}
						initialValue={editedProduct ? editedProduct.title : ''}
						initiallyValid={!!editedProduct}
						required
					/>
					<Input
						id='imageUrl'
						label='Image URL'
						errorText='Please enter a valid image URL!'
						keyboardType={Platform.OS === 'android' ? 'default' : 'url'}
						onInputChange={inputChangeHandler}
						initialValue={editedProduct ? editedProduct.imageUrl : ''}
						initiallyValid={!!editedProduct}
						required
					/>
					{editedProduct ? null : (
						<Input
							id='price'
							label='Price'
							errorText='Please enter a valid price!'
							keyboardType='numeric'
							onInputChange={inputChangeHandler}
							required
							min={0.01}
						/>
					)}
					<Input
						id='description'
						label='Description'
						errorText='Please enter a valid description!'
						keyboardType='default'
						autoCapitalize='sentences'
						autoCorrect
						multiline
						numberOfLines={3}
						onInputChange={inputChangeHandler}
						initialValue={editedProduct ? editedProduct.description : ''}
						initiallyValid={!!editedProduct}
						required
						min={5}
					/>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

EditProductScreen.navigationOptions = navData => {
	const submitFn = navData.navigation.getParam('submit')

	return {
		headerTitle: navData.navigation.getParam('productId')
			? 'Edit Product'
			: 'Add Product',
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title='Save'
					iconName={
						Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
					}
					onPress={submitFn}
				/>
			</HeaderButtons>
		),
	}
}

export default EditProductScreen

const styles = StyleSheet.create({
	form: {
		margin: 20,
	},
})
