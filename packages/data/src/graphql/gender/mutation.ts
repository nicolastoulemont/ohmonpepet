import gql from 'graphql-tag'

export const CREATE_GENDER = gql`
	mutation CreateGenderOption($input: CreateGenderOptionInput!) {
		createGenderOption(input: $input) {
			gender {
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

export const UPDATE_GENDER = gql`
	mutation UpdateGenderOption($id: ID!, $input: UpdateGenderOptionInput!) {
		updateGenderOption(id: $id, input: $input) {
			gender {
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

export const DELETE_GENDER = gql`
	mutation DeleteGenderOption($id: ID!) {
		deleteGenderOption(id: $id) {
			success
			errors {
				key
				message
			}
		}
	}
`
