interface auth {
	jwt: {
		expiresIn: string
		secret: string
		algorithm: 'HS256'
	}
}

export default {
	jwt: {
		expiresIn: '7d',
		secret: 'backend',
		algorithm: 'HS256'
	}
} as auth
