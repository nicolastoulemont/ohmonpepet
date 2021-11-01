import petSitterServicesListJSON from 'statics/petSitterServicesList.json'
import { Image, Tooltip } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { useI18n } from 'utils/hooks/useI18n'

export function PetSitterServicesList({ petsitter, gendersLookUp }) {
	const { t, lang } = useI18n(petSitterServicesListJSON)

	const isFemale = useMemo(
		() =>
			gendersLookUp[petsitter.genderId] &&
			(gendersLookUp[petsitter.genderId].name[lang] === 'madame' ||
				gendersLookUp[petsitter.genderId].name[lang] === 'female'),
		[gendersLookUp]
	)

	return (
		<>
			{petsitter.flexibleCancelation && (
				<Tooltip label={t('flexibleCancelation', { name: petsitter.firstName })}>
					<Image
						src='/img/cancel.svg'
						fallbackSrc='/img/cancel.svg'
						alt={t('flexibleCancelation', { name: petsitter.firstName })}
						width='20px'
						mr={3}
						mt={3}
						tabIndex={0}
					/>
				</Tooltip>
			)}
			{petsitter.acceptShortNotice && (
				<Tooltip label={t('acceptShortNotice', { name: petsitter.firstName })}>
					<Image
						src='/img/chrono.svg'
						fallbackSrc='/img/chrono.svg'
						alt={t('acceptShortNotice', { name: petsitter.firstName })}
						width='20px'
						mr={3}
						mt={3}
						tabIndex={0}
					/>
				</Tooltip>
			)}
			{petsitter.professionalPetSitter && (
				<Tooltip
					label={t('professionalPetSitter', {
						name: petsitter.firstName,
						genderOne: isFemale ? 'e' : '',
						genderTwo: isFemale ? 'le' : ''
					})}
				>
					<Image
						src='/img/certificate.svg'
						fallbackSrc='/img/certificate.svg'
						alt={t('professionalPetSitter', {
							name: petsitter.firstName,
							genderOne: isFemale ? 'e' : '',
							genderTwo: isFemale ? 'le' : ''
						})}
						width='20px'
						mr={3}
						mt={3}
						tabIndex={0}
					/>
				</Tooltip>
			)}
			{petsitter.abilityToProvideMedicalCare && (
				<Tooltip
					label={t('abilityToProvideMedicalCare', {
						name: petsitter.firstName
					})}
				>
					<Image
						src='/img/veterinary.svg'
						fallbackSrc='/img/veterinary.svg'
						alt={t('abilityToProvideMedicalCare', {
							name: petsitter.firstName
						})}
						width='20px'
						mr={3}
						mt={3}
						tabIndex={0}
					/>
				</Tooltip>
			)}
			{petsitter.atHomeContinuously && (
				<Tooltip
					label={t('atHomeContinuously', {
						name: petsitter.firstName,
						gender: isFemale ? 'e' : ''
					})}
				>
					<Image
						src='/img/time.svg'
						fallbackSrc='/img/time.svg'
						alt={t('atHomeContinuously', {
							name: petsitter.firstName,
							gender: isFemale ? 'e' : ''
						})}
						width='20px'
						mr={3}
						mt={3}
						tabIndex={0}
					/>
				</Tooltip>
			)}
			{petsitter.atHomeExclusivity && (
				<Tooltip
					label={t('atHomeExclusivity', {
						name: petsitter.firstName
					})}
				>
					<Image
						src='/img/first.svg'
						fallbackSrc='/img/first.svg'
						alt={t('atHomeExclusivity', {
							name: petsitter.firstName
						})}
						width='20px'
						mr={3}
						mt={3}
						tabIndex={0}
					/>
				</Tooltip>
			)}
			{petsitter.atHomeOnlyBringPet && (
				<Tooltip
					label={t('atHomeOnlyBringPet', {
						name: petsitter.firstName,
						gender: isFemale
							? lang === 'fr'
								? 'elle'
								: 'her'
							: lang == 'fr'
							? 'lui'
							: 'his'
					})}
				>
					<Image
						src='/img/pet-food.svg'
						fallbackSrc='/img/pet-food.svg'
						alt={t('atHomeOnlyBringPet', {
							name: petsitter.firstName,
							gender: isFemale
								? lang === 'fr'
									? 'elle'
									: 'her'
								: lang == 'fr'
								? 'lui'
								: 'his'
						})}
						width='20px'
						mr={3}
						mt={3}
						tabIndex={0}
					/>
				</Tooltip>
			)}
			{petsitter.atHomeComeGetPet && (
				<Tooltip
					label={t('atHomeComeGetPet', {
						name: petsitter.firstName
					})}
				>
					<Image
						src='/img/thank-you.svg'
						fallbackSrc='/img/thank-you.svg'
						alt={t('atHomeComeGetPet', {
							name: petsitter.firstName
						})}
						width='20px'
						mr={3}
						mt={3}
						tabIndex={0}
					/>
				</Tooltip>
			)}
			{petsitter.atOwnerHomeMail && (
				<Tooltip
					label={t('atOwnerHomeMail', {
						name: petsitter.firstName
					})}
				>
					<Image
						src='/img/delivery.svg'
						fallbackSrc='/img/delivery.svg'
						alt={t('atOwnerHomeMail', {
							name: petsitter.firstName
						})}
						width='20px'
						mr={3}
						mt={3}
						tabIndex={0}
					/>
				</Tooltip>
			)}
			{petsitter.atOwnerHomePlantsCare && (
				<Tooltip
					label={t('atOwnerHomePlantsCare', {
						name: petsitter.firstName
					})}
				>
					<Image
						src='/img/plantscare.svg'
						fallbackSrc='/img/plantscare.svg'
						alt={t('atOwnerHomePlantsCare', {
							name: petsitter.firstName
						})}
						width='20px'
						mr={3}
						mt={3}
						tabIndex={0}
					/>
				</Tooltip>
			)}
			{petsitter.atOwnerHomeCurtains && (
				<Tooltip
					label={t('atOwnerHomeCurtains', {
						name: petsitter.firstName
					})}
				>
					<Image
						src='/img/window.svg'
						fallbackSrc='/img/window.svg'
						alt={t('atOwnerHomeCurtains', {
							name: petsitter.firstName
						})}
						width='20px'
						mr={3}
						mt={3}
						tabIndex={0}
					/>
				</Tooltip>
			)}
		</>
	)
}
