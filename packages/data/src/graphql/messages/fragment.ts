import gql from 'graphql-tag'

export const MESSAGE_FIELDS = gql`
	fragment MessageFields on Message {
		id
		updatedAt
		readAt
	}
`
