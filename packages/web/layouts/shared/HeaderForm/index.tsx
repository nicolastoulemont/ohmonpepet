import React, { useState, useEffect, useRef } from 'react'
import { Tag, Text, Box, useDisclosure } from '@chakra-ui/react'
import { format } from 'date-fns'
import { fr, enUS } from 'date-fns/locale'
import { useI18n } from 'utils/hooks/useI18n'
import { capitalizeFirstLetter } from 'utils'
import headerSearchJSON from 'statics/headerSearch.json'
import { useDimensions } from 'utils/hooks'
import { keyValidation } from 'utils/keyboard'
import { useClickAway } from 'react-use'
import { DesktopForm } from './DesktopForm'
import { MobileForm } from './MobileForm'
import { isMobile } from 'react-device-detect'

interface HeaderSearchFormProps {
	state: { [key: string]: any }
	setState: React.Dispatch<
		React.SetStateAction<{
			[key: string]: any
		}>
	>
	errors: { [key: string]: string }
	speciesLookUp: { [key: string]: any }
	speciesOptions: any
	setFirstAvailableResult: React.Dispatch<React.SetStateAction<any>>
	showBtn?: boolean
	handleSearch?: () => void
}

export function HeaderSearchForm({
	state,
	setState,
	errors,
	speciesLookUp,
	speciesOptions,
	showBtn,
	handleSearch,
	setFirstAvailableResult
}: HeaderSearchFormProps) {
	const {
		isOpen: isMobileFormOpen,
		onOpen: onMobileFormOpen,
		onClose: onMobileFormClose
	} = useDisclosure()
	const [showInputs, setShowInputs] = useState(false)
	const [rangeDateInputValue, setRangeDateInputValue] = useState('')
	const { lang } = useI18n(headerSearchJSON)
	const [width] = useDimensions()
	const containerRef = useRef<HTMLDivElement>(null)
	useClickAway(containerRef, () => setShowInputs(false))
	useEffect(() => {
		if (state.startDate && !state.endDate) {
			setRangeDateInputValue(
				format(new Date(state.startDate), `${width && width <= 420 ? 'dd/MM' : 'dd LLL'}`, {
					locale: lang === 'fr' ? fr : enUS
				})
			)
		} else if (state.startDate && state.endDate) {
			setRangeDateInputValue(
				`${format(new Date(state.startDate), 'dd/MM', {
					locale: lang === 'fr' ? fr : enUS
				})} - ${format(new Date(state.endDate), 'dd/MM', {
					locale: lang === 'fr' ? fr : enUS
				})}`
			)
		}
	}, [state, lang, width])

	function handleClick() {
		if (isMobile) {
			onMobileFormOpen()
		} else {
			setShowInputs(true)
		}
	}

	function handleKeyDown(event) {
		if (keyValidation(event)) {
			handleClick()
		}
	}

	return (
		<Box
			width='100%'
			display='flex'
			alignItems='center'
			justifyContent='center'
			border='1px solid'
			borderColor='gray.300'
			minWidth={['150px', 'none']}
			maxWidth={['370px', '370px', '400px']}
			py={2}
			px={[2, 2, 4]}
			ml={[0, 0, '-135px', '-200px']}
			borderRadius='10px'
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			tabIndex={0}
			role='button'
			transition='box-shadow 0.2s ease-in-out'
			_hover={{ cursor: 'pointer', boxShadow: '0px 1.5px 3px 0px rgba(214,214,214,1)' }}
			ref={containerRef}
		>
			<Text
				fontSize='14px'
				pr={2}
				borderRight='1px solid'
				borderRightColor='gray.300'
				display={['none', 'block']}
			>
				{state['address'].substring(0, 20).concat('...')}
			</Text>
			<Text
				fontSize={{ base: '11px', sm: '14px' }}
				pr={2}
				borderRight='1px solid'
				borderRightColor='gray.300'
				display={['block', 'none']}
			>
				{state['address'].substring(0, 7).concat('...')}
			</Text>
			<Text
				fontWeight={600}
				px={2}
				mr={2}
				borderRight='1px solid'
				borderRightColor='gray.300'
				fontSize={{ base: '11px', sm: '14px' }}
			>
				{rangeDateInputValue}
			</Text>

			{state['acceptedAnimalsIds'].length > 1 ? (
				<>
					<Tag size='sm' key={state['acceptedAnimalsIds'][0]} color='gray.900'>
						{speciesLookUp[state['acceptedAnimalsIds'][0]] &&
							capitalizeFirstLetter(
								speciesLookUp[state['acceptedAnimalsIds'][0]].name[lang]
							).substring(0, 4)}
					</Tag>
					{`...`}
				</>
			) : (
				state['acceptedAnimalsIds'].map((animalId) => (
					<Tag size='sm' key={animalId} color='gray.900'>
						{speciesLookUp[animalId] &&
							capitalizeFirstLetter(speciesLookUp[animalId].name[lang]).substring(
								0,
								5
							)}
					</Tag>
				))
			)}
			{showInputs && (
				<DesktopForm
					showBtn={showBtn}
					handleSearch={handleSearch}
					state={state}
					setState={setState}
					setFirstAvailableResult={setFirstAvailableResult}
					errors={errors}
					speciesOptions={speciesOptions}
				/>
			)}
			<MobileForm
				handleSearch={handleSearch}
				state={state}
				setState={setState}
				setFirstAvailableResult={setFirstAvailableResult}
				errors={errors}
				speciesOptions={speciesOptions}
				isDrawerOpen={isMobileFormOpen}
				onDrawerClose={onMobileFormClose}
			/>
		</Box>
	)
}
