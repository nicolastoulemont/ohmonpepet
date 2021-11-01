import gql from 'graphql-tag'
import { INVALID_ARGUMENTS_FIELDS, NOT_FOUND_FIELDS, UNABLE_TO_PROCESS_FIELDS } from '../errors'

export const GET_CURRENT_USER_ADS = gql`
	${UNABLE_TO_PROCESS_FIELDS}
	query CurrentUserAds {
		currentUserAds {
			... on BookingAds {
				bookingAds {
					id
					createdAt
					updatedAt
					animalsSpeciesIds
					startDate
					endDate
					serviceOptionId
					serviceMaxPrice
					description
					bidders {
						id
						bids {
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

export const AD_BY_ID = gql`
	${INVALID_ARGUMENTS_FIELDS}
	${NOT_FOUND_FIELDS}
	query AdById($id: ID!) {
		adById(id: $id) {
			... on BookingAd {
				id
				updatedAt
				animalsSpeciesIds
				startDate
				endDate
				serviceOptionId
				description
				serviceMaxPrice
				location {
					latitude
					longitude
				}
				bidders {
					id
					account {
						user {
							firstName
						}
					}
					avatar {
						storeUrl
					}
					averageScore
					location {
						latitude
						longitude
					}
					coreServices {
						id
						price
					}
					extraServices {
						atHomeExclusivity
						atHomeExclusivityExtraPrice
						atHomeContinuously
						atHomeContinuouslyExtraPrice
						atHomeOnlyBringPet
						atHomeOnlyBringPetExtraPrice
						atHomeComeGetPet
						atHomeComeGetPetExtraPrice
						atOwnerHomePlantsCare
						atOwnerHomePlantsCareExtraPrice
						atOwnerHomeMail
						atOwnerHomeMailExtraPrice
						atOwnerHomeCurtains
						atOwnerHomeCurtainsExtraPrice
						acceptShortNotice
						flexibleCancelation
						isProfessionalOperator
						abilityToProvideMedicalCare
					}
				}
			}
			... on InvalidArgumentsError {
				...InvalidArgumentsFields
			}
			... on NotFoundError {
				...NotFoundFields
			}
		}
	}
`

export const SEARCH_ADS = gql`
	query SearchAds($input: SearchAdsInput!) {
		searchAds(input: $input) {
			... on BookingAds {
				bookingAds {
					id
					updatedAt
					animalsSpeciesIds
					startDate
					endDate
					serviceOptionId
					description
					location {
						latitude
						longitude
					}
				}
			}
			... on UnableToProcessError {
				...UnableToProcessFields
			}
		}
	}
`

export const CURRENT_OPERATOR_BIDS = gql`
	${UNABLE_TO_PROCESS_FIELDS}
	query CurrentOperatorBids {
		currentOperatorBids {
			... on BookingAdBids {
				bids {
					bookingAd {
						id
						updatedAt
						animalsSpeciesIds
						startDate
						endDate
						serviceOptionId
						description
						location {
							latitude
							longitude
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
