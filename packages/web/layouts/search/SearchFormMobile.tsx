import React, { useMemo } from 'react'
import { useI18n } from 'utils/hooks/useI18n'
import searchJSON from 'statics/search/search.json'
import { ExtraFiltersMobileContainer } from 'layouts/search/filters/ExtraFiltersMobileContainer'
import { FiSliders } from 'react-icons/fi'
import { useDisclosure, IconButton } from '@chakra-ui/react'
import { bgColor } from 'theme/colors'

export function SearchFormMobile({
	state,
	setState,
	errors,
	handleChange,
	handleCheckBoxes,
	languagesOptions,
	hostingsOptions,
	servicesOptions
}) {
	const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure()
	const { t } = useI18n(searchJSON)

	const serviceOrDefault = useMemo(
		() => (state['service'] && state['service'] !== '' ? state['service'] : 'atHomeDay'),
		[state['service']]
	)

	function handleSliderChange(value: number) {
		if (value !== state['serviceMaxPrice']) {
			setState((state) => ({ ...state, serviceMaxPrice: value }))
		}
	}

	return (
		<>
			<IconButton
				aria-label={t('filters')}
				onClick={onDrawerOpen}
				bg={bgColor['dark']}
				color='white'
				borderRadius='20px'
				fontWeight='normal'
				icon={<FiSliders style={{ transform: 'rotate(90deg)' }} color='white' />}
			/>

			<ExtraFiltersMobileContainer
				state={state}
				setState={setState}
				handleChange={handleChange}
				handleSliderChange={handleSliderChange}
				handleCheckBoxes={handleCheckBoxes}
				hostingsOptions={hostingsOptions}
				languagesOptions={languagesOptions}
				servicesOptions={servicesOptions}
				errors={errors}
				onDrawerClose={onDrawerClose}
				isDrawerOpen={isDrawerOpen}
				serviceOrDefault={serviceOrDefault}
			/>
		</>
	)
}
