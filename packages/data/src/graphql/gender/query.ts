import gql from 'graphql-tag'

export const GET_GENDERS = gql`
	query GetGenders {
		genders {
			genders {
				id
				name {
					fr
					en
				}
			}
			errors {
				key
				message
			}
		}
	}
`
