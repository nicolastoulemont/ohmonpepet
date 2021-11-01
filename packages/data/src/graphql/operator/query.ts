import gql from 'graphql-tag'
import {
	NOT_FOUND_FIELDS,
	UNABLE_TO_PROCESS_FIELDS,
	USER_AUTH_FIELDS,
	USER_FORBIDDEN_FIELDS
} from '../errors'

export const CURRENT_OPERATOR = gql`
	${NOT_FOUND_FIELDS}
	${USER_AUTH_FIELDS}
	${USER_FORBIDDEN_FIELDS}
	query CurrentOperator {
		currentOperator {
			... on IndividualOperator {
				id
				description
				birthDate
				genderOptionId
				hostingOptionId
				languageOptionIds
				acceptedSpecieOptionsIds
				ownAnimalsSpecieOptionsIds
				partnerId
				partnerPercentage
				avatar {
					storeUrl
				}
				account {
					user {
						firstName
						lastName
					}
				}
				location {
					address
					city
					country
					country_code
					postcode
					latitude
					longitude
				}
				availabilities {
					id
					date
				}
				coreServices {
					serviceOptionId
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
			... on NotFoundError {
				...NotFoundFields
			}
			... on UserAuthenticationError {
				...UserAuthFields
			}
			... on UserForbiddenError {
				...UserForbiddenFields
			}
		}
	}
`

export const OPERATOR_BY_ID = gql`
	${NOT_FOUND_FIELDS}
	query OperatorById($id: ID!) {
		operatorById(id: $id) {
			... on IndividualOperator {
				id
				description
				genderOptionId
				hostingOptionId
				languageOptionIds
				acceptedSpecieOptionsIds
				ownAnimalsSpecieOptionsIds
				averageScore
				averageResponseTime
				partnerId
				partnerPercentage
				account {
					user {
						firstName
					}
				}
				avatar {
					storeUrl
				}
				medias {
					storeUrl
				}
				location {
					city
					country
					latitude
					longitude
				}
				coreServices {
					serviceOptionId
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
				availabilities {
					id
					date
				}
				reviews {
					id
					createdAt
					score
					title
					body
					... on UserReview {
						user {
							firstName
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

export const OPERATOR_BOOKING_INFOS_BY_ID = gql`
	${NOT_FOUND_FIELDS}
	query OperatorBookingInfosById($id: ID!) {
		operatorById(id: $id) {
			... on IndividualOperator {
				id
				hostingOptionId
				averageScore
				avatar {
					storeUrl
				}
				account {
					user {
						firstName
					}
				}
				location {
					city
					postcode
				}
				availabilities {
					id
					date
				}
				coreServices {
					serviceOptionId
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
			... on NotFoundError {
				...NotFoundFields
			}
		}
	}
`

export const CURRENT_OPERATOR_MEDIAS = gql`
	${NOT_FOUND_FIELDS}
	${USER_AUTH_FIELDS}
	${USER_FORBIDDEN_FIELDS}
	query CurrentOperatorMedias {
		currentOperator {
			... on IndividualOperator {
				avatar {
					id
					storeUrl
				}
				medias {
					id
					storeUrl
				}
			}
			... on NotFoundError {
				...NotFoundFields
			}
			... on UserAuthenticationError {
				...UserAuthFields
			}
			... on UserForbiddenError {
				...UserForbiddenFields
			}
		}
	}
`
export const CURRENT_OPERATOR_BOOKING_INFOS = gql`
	${NOT_FOUND_FIELDS}
	${USER_AUTH_FIELDS}
	${USER_FORBIDDEN_FIELDS}
	query CurrentOperatorBookingInfos {
		currentOperator {
			... on IndividualOperator {
				acceptedSpecieOptionsIds
				ownAnimalsSpecieOptionsIds
				location {
					latitude
					longitude
				}
				availabilities {
					id
					date
				}
				coreServices {
					serviceOptionId
					price
				}
			}
			... on NotFoundError {
				...NotFoundFields
			}
			... on UserAuthenticationError {
				...UserAuthFields
			}
			... on UserForbiddenError {
				...UserForbiddenFields
			}
		}
	}
`

export const SEARCH_OPERATORS = gql`
	${UNABLE_TO_PROCESS_FIELDS}
	query SearchOperators($input: SearchOperatorsInput!) {
		searchOperators(input: $input) {
			... on Operators {
				operators {
					id
					hostingOptionId
					genderOptionId
					languageOptionIds
					averageScore
					averageResponseTime
					calendarUpdate
					partnerId
					partnerPercentage
					avatar {
						storeUrl
					}
					location {
						city
						postcode
						latitude
						longitude
					}
					coreServices {
						serviceOptionId
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
			... on UnableToProcessError {
				...UnableToProcessFields
			}
		}
	}
`

export const GET_ALL_OPERATORS = gql`
	${USER_AUTH_FIELDS}
	${USER_FORBIDDEN_FIELDS}
	${UNABLE_TO_PROCESS_FIELDS}
	query AllOperators {
		allOperators {
			... on Operators {
				operators {
					id
					updatedAt
				}
			}
			... on UserAuthenticationError {
				...UserAuthFields
			}
			... on UserForbiddenError {
				...UserForbiddenFields
			}
			... on UnableToProcessError {
				...UnableToProcessFields
			}
		}
	}
`
