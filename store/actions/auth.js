export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'

export const signup = (email, password) => {
	return async dispatch => {
		const response = await fetch(
			'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDbieallMmBYhVc23YP-M21JWahO4sARVs',
			{
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify({
					email: email,
					password: password,
					returnSecureToken: true,
				}),
			}
		)

		if (!response.ok) {
			const errorResData = await response.json()
			const errorId = errorResData.error.message
			let message = 'Something went wrong!'

			if (errorId === 'EMAIL_EXISTS') {
				message = 'This email is already in use!'
			}

			throw new Error(message)
		}

		const resData = await response.json()
		console.log(resData)

		dispatch({ type: SIGNUP })
	}
}

export const login = (email, password) => {
	return async dispatch => {
		const response = await fetch(
			'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=  AIzaSyDbieallMmBYhVc23YP-M21JWahO4sARVs',
			{
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify({
					email: email,
					password: password,
					returnSecureToken: true,
				}),
			}
		)

		if (!response.ok) {
			const errorResData = await response.json()
			const errorId = errorResData.error.message
			let message = 'Something went wrong!'

			if (errorId === 'EMAIL_NOT_FOUND') {
				message = 'This email could not be found!'
			} else if (errorId === 'INVALID_PASSWORD') {
				message = 'The password is not valid!'
			}

			throw new Error(message)
		}

		const resData = await response.json()
		console.log(resData)
		dispatch({ type: LOGIN })
	}
}
