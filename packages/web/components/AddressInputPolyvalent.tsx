import React, { useEffect, useState, useRef } from 'react'
import { shadow, borderRadius, panelBgColor, bgColor, shadowSm } from 'theme/colors'
import { useLocationSearchLazyQuery } from 'generated/graphql'
import addressJson from 'statics/components/address.json'
import { useI18n } from 'utils/hooks/useI18n'
import { removeTypename } from 'utils'
import { keyValidation } from 'utils/keyboard'
import { useKeyBoardListNavigation } from 'utils/hooks/useKeyBoardListNavigation'
import { useClickAway } from 'react-use'
import { MOBILE_DRAWER_CONTAINER_HEIGHT, MOBILE_DRAWER_HEADER_HEIGHT } from 'theme/constants'
import { isMobileOnly } from 'react-device-detect'
import { motion } from 'framer-motion'
import {
	FormControl,
	FormLabel,
	Input,
	Box,
	useColorMode,
	List,
	ListItem,
	FormHelperText,
	useDisclosure,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	DrawerHeader,
	DrawerBody,
	InputGroup,
	InputLeftElement,
	chakra
} from '@chakra-ui/react'

const MotionListItem = chakra(motion.li)

import { SearchIcon } from '@chakra-ui/icons'
interface LocationResult {
	address: string
	location: {
		type: string
		coordinates: Array<number>
	}
	preventFetch: boolean
}

interface AddressInputPolyvalentProps {
	parentState: any
	setParentState: React.Dispatch<React.SetStateAction<any>>
	setErrors?: React.Dispatch<
		| React.SetStateAction<{
				[key: string]: any
		  }>
		| undefined
	>
	giveOnlyPointData?: boolean
	margin?: string
	address?: string
	location?: {
		type: string
		coordinates: Array<number>
	}
	label?: string
	placeholder?: string
	setFirstAvailableResult?: React.Dispatch<React.SetStateAction<any>>
	isRequired?: boolean
	isInvalid?: boolean
	helperText?: string
}

const DRAWER_HEADER_HEIGHT = 56

export function AddressInputPolyvalent({
	parentState,
	setParentState,
	setErrors,
	giveOnlyPointData = false,
	margin = '0',
	address,
	location,
	label,
	placeholder,
	setFirstAvailableResult,
	isRequired = false,
	isInvalid,
	helperText
}: AddressInputPolyvalentProps) {
	const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure()
	const [locationList, setLocationList] = useState([])
	const [showLocationList, setShowLocationList] = useState(false)
	const { handleKeyBoardNav, listContainerRef, inputRef } = useKeyBoardListNavigation({
		listDisplayController: setShowLocationList,
		optionsList: locationList,
		optionSelectorKey: 'id'
	})
	const {
		handleKeyBoardNav: handleMobileKeyBoardNav,
		listContainerRef: mobileListContainerRef,
		inputRef: mobileInputRef
	} = useKeyBoardListNavigation({
		listDisplayController: setShowLocationList,
		optionsList: locationList,
		optionSelectorKey: 'id'
	})
	const [state, setState] = useState<LocationResult>({
		address: '',
		location: {
			type: 'Point',
			coordinates: []
		},
		preventFetch: false
	})
	const { colorMode } = useColorMode()
	const { t, lang } = useI18n(addressJson)
	const containerRef = useRef<HTMLDivElement>(null)
	useClickAway(containerRef, () => setShowLocationList(false))

	// Map given val if any to locale state
	useEffect(() => {
		if (address && location) {
			setState({ ...state, address, location: removeTypename(location), preventFetch: true })
		}
	}, [address, location])

	// Handle Location
	const [searchLoc, { data }] = useLocationSearchLazyQuery()

	useEffect(() => {
		if (state?.address.length > 3 && !state.preventFetch) {
			searchLoc({ variables: { query: state.address, locale: lang } })
		}
	}, [state, lang])

	useEffect(() => {
		if (data?.locationSearch.locations && data?.locationSearch.locations !== locationList) {
			setLocationList(data.locationSearch.locations)
			if (data.locationSearch.locations.length > 0 && setFirstAvailableResult) {
				const [loc] = data.locationSearch.locations
				setFirstAvailableResult({
					address: loc.formattedLocationString,
					location: {
						type: 'Point',
						coordinates: [loc.location.coordinates[0], loc.location.coordinates[1]]
					}
				})
			}
			if (!showLocationList) setShowLocationList(true)
		}
	}, [data])

	function handleChange(e) {
		setState({ ...state, [e.target.name]: e.target.value, preventFetch: false })
		// If user empty field, then we need to reset the parents state
		// in order to enforce validation
		if (e.target.value === '') {
			const empty = {
				address: '',
				location: {
					type: 'Point',
					coordinates: []
				}
			}
			setState({ ...state, ...empty })
			setFirstAvailableResult && setFirstAvailableResult({ ...empty })
		}
	}

	function handleLocationClick(loc) {
		setState({
			...state,
			address: loc.formattedLocationString,
			location: {
				type: 'Point',
				coordinates: [loc.location.coordinates[0], loc.location.coordinates[1]]
			},
			preventFetch: true
		})
		setErrors && setErrors((errors) => ({ ...errors, address: undefined }))
		if (giveOnlyPointData) {
			setParentState({
				...parentState,
				address: loc.formattedLocationString,
				location: {
					type: 'Point',
					coordinates: [loc.location.coordinates[0], loc.location.coordinates[1]]
				}
			})
		} else {
			setParentState({
				...parentState,
				address: loc.formattedLocationString,
				location: {
					type: 'Point',
					coordinates: [loc.location.coordinates[0], loc.location.coordinates[1]]
				},
				city: loc.city,
				country: loc.country,
				country_code: loc.country_code,
				postcode: loc.postcode
			})
		}

		setShowLocationList(false)
		if (isMobileOnly) {
			onDrawerClose()
		}
	}

	function handleInputClick() {
		if (isMobileOnly) {
			onDrawerOpen()
		}
	}

	return (
		<>
			<FormControl
				flex='1'
				position='relative'
				zIndex={!isMobileOnly && showLocationList ? 9999 : 0}
				m={margin}
				isRequired={isRequired}
				onKeyDown={(event) => {
					if (isMobileOnly) {
						handleMobileKeyBoardNav(event)
					} else {
						handleKeyBoardNav(event)
					}
				}}
				ref={!isMobileOnly ? containerRef : null}
			>
				<FormLabel htmlFor='address'>{label ? label : t('addressField')}</FormLabel>
				<Input
					type='text'
					id='address'
					name='address'
					ref={inputRef}
					variant='outline'
					value={state['address']}
					onChange={handleChange}
					onClick={handleInputClick}
					aria-describedby={label ? label : t('addressField')}
					placeholder={placeholder ? placeholder : t('addressFieldPlaceholder')}
					zIndex={0}
					maxLength={200}
					isInvalid={isInvalid}
					autoComplete='new-address'
				/>
				{!isMobileOnly && state.address !== '' && showLocationList && (
					<Box>
						<Box
							position='absolute'
							zIndex={10}
							backgroundColor='white'
							boxShadow={shadow[colorMode]}
							py={[1, 2]}
							borderRadius={borderRadius}
							width='100%'
						>
							<List styleType='none' width='100%' ref={listContainerRef}>
								{locationList.map((loc) => (
									<ListItem
										key={loc.id}
										id={loc.id}
										my={2}
										px={[2, 4]}
										onClick={() => handleLocationClick(loc)}
										onKeyDown={(event) =>
											keyValidation(event) && handleLocationClick(loc)
										}
										tabIndex={0}
										role='button'
										backgroundColor={panelBgColor[colorMode]}
										_hover={{
											cursor: 'pointer',
											backgroundColor: bgColor[colorMode]
										}}
										_focus={{
											backgroundColor: bgColor[colorMode]
										}}
									>
										{loc.formattedLocationString}
									</ListItem>
								))}
							</List>
						</Box>
					</Box>
				)}
				{helperText && !showLocationList && <FormHelperText>{helperText}</FormHelperText>}
			</FormControl>
			{isDrawerOpen && (
				<Drawer isOpen={isDrawerOpen} placement='bottom' onClose={onDrawerClose}>
					<DrawerOverlay>
						<DrawerContent
							width='100%'
							height={MOBILE_DRAWER_CONTAINER_HEIGHT}
							borderTopRadius='25px'
						>
							<FormControl height={MOBILE_DRAWER_CONTAINER_HEIGHT}>
								<DrawerHeader
									display='flex'
									alignItems='center'
									justifyContent='space-between'
									px={4}
									py={3}
									height={`${DRAWER_HEADER_HEIGHT}px`}
								>
									<FormLabel>{label ? label : t('addressField')}</FormLabel>
									<DrawerCloseButton />
								</DrawerHeader>
								<DrawerBody
									p={3}
									height={`calc(100vh - ${
										DRAWER_HEADER_HEIGHT + MOBILE_DRAWER_HEADER_HEIGHT
									}px)`}
									overflowY='auto'
								>
									<InputGroup mb={6}>
										<InputLeftElement
											pointerEvents='none'
											height='100%'
											children={
												<SearchIcon
													color='red.500'
													fontWeight={700}
													fontSize='xl'
												/>
											}
										/>
										<Input
											type='text'
											id='address'
											name='address'
											size='lg'
											ref={mobileInputRef}
											variant='outline'
											borderRadius={borderRadius}
											value={state['address']}
											onChange={handleChange}
											aria-describedby={label ? label : t('addressField')}
											placeholder={
												placeholder
													? placeholder
													: t('addressFieldPlaceholder')
											}
											zIndex={0}
											maxLength={200}
											isInvalid={isInvalid}
											autoComplete='new-address'
										/>
									</InputGroup>
									{state.address !== '' && showLocationList && (
										<List
											styleType='none'
											width='100%'
											ref={mobileListContainerRef}
										>
											{locationList.map((loc) => (
												<MotionListItem
													key={loc.id}
													id={loc.id}
													my={3}
													p={{ base: 3, sm: 6 }}
													borderRadius={borderRadius}
													onClick={() => handleLocationClick(loc)}
													onKeyDown={(event) =>
														keyValidation(event) &&
														handleLocationClick(loc)
													}
													tabIndex={0}
													role='button'
													boxShadow={shadowSm}
													backgroundColor={panelBgColor[colorMode]}
													_hover={{
														cursor: 'pointer',
														backgroundColor: bgColor[colorMode]
													}}
													_focus={{
														backgroundColor: bgColor[colorMode]
													}}
													layout
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
												>
													{loc.formattedLocationString}
												</MotionListItem>
											))}
										</List>
									)}
								</DrawerBody>
							</FormControl>
						</DrawerContent>
					</DrawerOverlay>
				</Drawer>
			)}
		</>
	)
}
