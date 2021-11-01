import gql from 'graphql-tag'
import {
	INVALID_ARGUMENTS_FIELDS,
	NOT_FOUND_FIELDS,
	UNABLE_TO_PROCESS_FIELDS,
	USER_AUTH_FIELDS,
	USER_FORBIDDEN_FIELDS
} from '../errors'

export const CREATE_OPERATOR = gql`
	${INVALID_ARGUMENTS_FIELDS}
	${UNABLE_TO_PROCESS_FIELDS}
	${USER_AUTH_FIELDS}
	mutation CreateIndividualOperator($input: CreateIndividualOperatorInput!) {
		createIndividualOperator(input: $input) {
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
			... on InvalidArgumentsError {
				...InvalidArgumentsFields
			}
			... on UnableToProcessError {
				...UnableToProcessFields
			}
			... on UserAuthenticationError {
				...UserAuthFields
			}
		}
	}
`

export const UPDATE_OPERATOR = gql`
	${INVALID_ARGUMENTS_FIELDS}
	${UNABLE_TO_PROCESS_FIELDS}
	${USER_AUTH_FIELDS}
	${USER_FORBIDDEN_FIELDS}
	${NOT_FOUND_FIELDS}
	mutation UpdateIndividualOperator($input: UpdateIndividualOperatorInput!) {
		updateIndividualOperator(input: $input) {
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
			... on InvalidArgumentsError {
				...InvalidArgumentsFields
			}
			... on UnableToProcessError {
				...UnableToProcessFields
			}
			... on UserAuthenticationError {
				...UserAuthFields
			}
			... on UserForbiddenError {
				...UserForbiddenFields
			}
			... on NotFoundError {
				...NotFoundFields
			}
		}
	}
`
