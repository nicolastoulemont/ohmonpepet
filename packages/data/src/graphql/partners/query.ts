import gql from 'graphql-tag'
import { UNABLE_TO_PROCESS_FIELDS, NOT_FOUND_FIELDS } from '../errors'

export const GET_PARTNERS = gql`
	${UNABLE_TO_PROCESS_FIELDS}
	query GetPartners {
		partners {
			... on PartnersList {
				partners {
					id
					name
					description
					websiteUrl
					medias {
						id
						storeUrl
					}
				}
			}
			... on UnableToProcessError {
				...UnableToProcessFields
			}
		}
	}
`

export const GET_PARTNER_BY_ID = gql`
	${NOT_FOUND_FIELDS}
	query GetPartnerById($id: ID!) {
		partnerById(id: $id) {
			... on Partner {
				id
				name
				description
				websiteUrl
				receipts {
					id
					createdAt
					amountDonated
					files {
						id
						storeUrl
					}
					donations {
						id
						createdAt
						amountToDonate
						operator {
							account {
								user {
									firstName
								}
							}
							avatar {
								storeUrl
							}
						}
					}
				}
			}
			... on NotFoundError {
				...NotFoundFields
			}
		}
	}
`

export const GET_PARTNERS_IDS = gql`
	${UNABLE_TO_PROCESS_FIELDS}
	query GetPartnersIds {
		partners {
			... on PartnersList {
				partners {
					id
				}
			}
			... on UnableToProcessError {
				...UnableToProcessFields
			}
		}
	}
`

export const GET_PARTNERS_WITH_RECEIPTS = gql`
	query GetPartnersWithReceipts {
		partners {
			... on PartnersList {
				partners {
					id
					name
					description
					websiteUrl
					medias {
						id
						storeUrl
					}
					receipts {
						id
						amountDonated
						donations {
							id
						}
					}
				}
			}
			... on UnableToProcessError {
				...UnableToProcessFields
			}
		}
	}
`
