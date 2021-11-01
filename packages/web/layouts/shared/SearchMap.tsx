import React, { useState, useEffect, useMemo, useRef } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import { SitterServicePricesMobileHorizontal } from 'layouts/shared/SitterServicePricesMobileHorizontal'
import { FiRefreshCw } from 'react-icons/fi'
import { bgColor, shadow, shadowMd } from 'theme/colors'
import { Heading, useColorMode } from '@chakra-ui/react'
import { useI18n } from 'utils/hooks/useI18n'
import searchJSON from 'statics/search/search.json'
import profileCardJSON from 'statics/search/profileCard.json'
import { MAP_SEARCH_HIGHER_LIMIT, MAP_SEARCH_LOWER_LIMIT } from 'utils/constants'
import { useDimensions } from 'utils/hooks'
import { keyValidation } from 'utils/keyboard'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import NextLink from 'next/link'
import { formatForUrl } from 'utils/dates'
import { isMobile } from 'react-device-detect'
import { capitalizeFirstLetter } from 'utils'
import {
	Box,
	Checkbox,
	chakra,
	Popover,
	PopoverTrigger,
	Portal,
	PopoverContent,
	PopoverArrow,
	PopoverBody,
	Image,
	Tag,
	Tooltip,
	Link,
	Flex,
	Text
} from '@chakra-ui/react'
const MotionBox = chakra(motion.div)

export function SearchMap({
	coordinates,
	searchItems = [],
	heightParam = '98',
	state,
	setState,
	currentHoverId,
	setCurrentHoverId,
	onDragSearch = true,
	fullScreen = false,
	partnersLookUp,
	hostingsLookUp
}) {
	const { colorMode } = useColorMode()
	const [width] = useDimensions()
	const [searchOnDrag, setSearchOnDrag] = useState(onDragSearch)
	const [showRefreshSearch, setShowRefreshSearch] = useState(false)
	const [viewport, setViewport] = useState({
		latitude: 48.86,
		longitude: 2.3413,
		width: '100%',
		height: `calc(100vh - ${heightParam}px)`,
		zoom: 13
	})
	const { t } = useI18n(searchJSON)
	const { pathname } = useRouter()

	useEffect(() => {
		if (coordinates) {
			setViewport({ ...viewport, latitude: coordinates[1], longitude: coordinates[0] })
		}
	}, [coordinates])

	function handleViewPortChange(viewport: any) {
		setViewport({ ...viewport })
		if (searchOnDrag) {
			setState({
				...state,
				maxDistance: viewport.zoom >= 13 ? MAP_SEARCH_LOWER_LIMIT : MAP_SEARCH_HIGHER_LIMIT,
				location: {
					type: 'Point',
					coordinates: [viewport.longitude, viewport.latitude]
				}
			})
		} else {
			setShowRefreshSearch(true)
		}
	}

	function handleRefreshSearch() {
		setShowRefreshSearch(false)
		setState({
			...state,
			maxDistance: viewport.zoom >= 13 ? MAP_SEARCH_LOWER_LIMIT : MAP_SEARCH_HIGHER_LIMIT,
			location: {
				type: 'Point',
				coordinates: [viewport.longitude, viewport.latitude]
			}
		})
	}

	return (
		<>
			<Box
				width={['300px', '300px', '300px', '300px', '420px']}
				p={3}
				backgroundColor={bgColor['dark']}
				color='white'
				boxShadow={shadow[colorMode]}
				borderRadius='10px'
				pos='absolute'
				top='30px'
				left={[
					'calc(calc(100% - 300px) / 2)',
					'calc(calc(100% - 300px) / 2)',
					'calc(calc(100% - 300px) / 2)',
					'calc(calc(100% - 300px) / 2)',
					'calc(calc(100% - 420px) / 2)'
				]}
				zIndex={100}
				display='flex'
				alignItems='center'
				justifyContent='center'
			>
				{showRefreshSearch ? (
					<Box
						width='100%'
						display='flex'
						alignItems='center'
						justifyContent='center'
						role='button'
						tabIndex={0}
						onClick={handleRefreshSearch}
						onKeyDown={(event) => keyValidation(event) && handleRefreshSearch()}
					>
						<Box as={FiRefreshCw} mr={6} />
						{t('refreshSearch')}
					</Box>
				) : (
					<Checkbox
						isChecked={searchOnDrag}
						onChange={(e) => setSearchOnDrag(e.target.checked)}
						size={width && width <= 1165 && !fullScreen ? 'sm' : 'md'}
					>
						{t('searchOnDrag')}
					</Checkbox>
				)}
			</Box>

			<ReactMapGL
				{...viewport}
				mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAP_BOX_TOKEN}
				onViewportChange={handleViewPortChange}
				mapStyle='mapbox://styles/mapbox/streets-v9'
			>
				{searchItems.map((item) => (
					<Marker
						key={item.id}
						latitude={item.latitude}
						longitude={item.longitude}
						className={item.id === currentHoverId ? 'marker-focus' : ''}
					>
						{pathname === '/pet-sitter/ads' && (
							<AdGeoInfos
								ad={item}
								isFocus={item.id === currentHoverId}
								setCurrentHoverId={setCurrentHoverId}
							/>
						)}
						{pathname === '/search' && (
							<SitterGeoInfos
								sitter={item}
								state={state}
								isFocus={item.id === currentHoverId}
								setCurrentHoverId={setCurrentHoverId}
								partnersLookUp={partnersLookUp}
								hostingsLookUp={hostingsLookUp}
							/>
						)}
					</Marker>
				))}
			</ReactMapGL>
		</>
	)
}

function SitterGeoInfos({
	sitter,
	state,
	isFocus = false,
	setCurrentHoverId,
	partnersLookUp,
	hostingsLookUp
}) {
	const { t, lang } = useI18n(profileCardJSON)
	const sitterHasPartnerShip = sitter.partnerId && sitter.partnerPercentage !== 0

	const address = useMemo(
		() =>
			isMobile
				? `${sitter.city}, ${sitter.postcode}`.substring(0, 18).concat('...')
				: `${sitter.city}, ${sitter.postcode}`,
		[isMobile]
	)

	return (
		<Popover placement='auto' isLazy>
			<PopoverTrigger>
				<Box
					width='50px'
					height='35px'
					display='flex'
					alignItems='center'
					justifyContent='center'
					borderRadius='15px'
					bg={isFocus ? 'black' : 'white'}
					color={isFocus ? 'white' : 'black'}
					boxShadow='rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, 0.18) 0px 1px 2px;'
					transition='all .2s ease-in-out'
					transform='translate(-50%, -50%)'
					role='group'
					onMouseEnter={() => setCurrentHoverId(sitter.id)}
					onMouseLeave={() => setCurrentHoverId('')}
				>
					<Box display='flex' alignItems='center' flexDir='column'>
						<Box _groupHover={{ fontWeight: 600, textAlign: 'center' }}>
							{sitter.price} €
						</Box>
					</Box>
				</Box>
			</PopoverTrigger>
			<Portal>
				<PopoverContent
					width='275px'
					height='310px'
					borderRadius='10px'
					boxShadow={shadowMd}
				>
					<PopoverArrow />
					<PopoverBody p={0}>
						<NextLink
							passHref
							href={{
								pathname: '/sitter',
								query: {
									id: sitter.id,
									address: state.address,
									lat: state.location.coordinates[1],
									lng: state.location.coordinates[0],
									startDate: formatForUrl(state.startDate),
									endDate: formatForUrl(state.endDate),
									acceptedAnimalsIds: state.acceptedAnimalsIds,
									service: state.service
								}
							}}
						>
							<Link display='block'>
								<Image
									src={sitter.pictureUrl}
									fallbackSrc={sitter.pictureUrl}
									borderTopLeftRadius='10px'
									borderTopRightRadius='10px'
									height='auto'
									width='100%'
									maxH='185px'
									objectFit='cover'
									alt={`${sitter.firstName} profile image'`}
								/>
								<Box
									flex='1'
									height='100%'
									borderTopRightRadius='10px'
									borderBottomRightRadius='10px'
									display='flex'
									flexDir='column'
									alignItems='flex-start'
									justifyContent='space-evenly'
									p={3}
								>
									{sitter.stars && sitter.ratings && (
										<Flex
											fontSize='12px'
											fontWeight={600}
											width='100%'
											align='center'
											justify='space-between'
											mb={1}
										>
											<Flex>
												<Image
													src='/img/star.svg'
													fallbackSrc='/img/star.svg'
													width='14px'
													height='14px'
													mr={1}
													alt='ratings stars'
												/>
												{sitter.stars}{' '}
												<Text ml={1} fontWeight={400} color='gray.500'>
													({sitter.ratings.length})
												</Text>
											</Flex>

											{sitterHasPartnerShip ? (
												<Tooltip
													label={
														<Text>
															{t('giveTo', {
																name: sitter.firstName,
																percentage: sitter.partnerPercentage
															})}{' '}
															{partnersLookUp[sitter.partnerId].name}
														</Text>
													}
												>
													<Image
														src='/img/donation.svg'
														fallbackSrc='/img/donation.svg'
														alt={`${t('giveTo', {
															name: sitter.firstName,
															percentage: sitter.partnerPercentage
														})} ${
															partnersLookUp[sitter.partnerId].name
														}`}
														width='20px'
														tabIndex={0}
													/>
												</Tooltip>
											) : null}
										</Flex>
									)}
									<Flex align='center' justify='flex-start' mb={1}>
										<Heading size='sm' fontWeight='500'>
											{sitter.firstName}
										</Heading>
										<Tag colorScheme='blue' size='sm' ml={3}>
											{hostingsLookUp[sitter.hostingId] &&
												capitalizeFirstLetter(
													hostingsLookUp[sitter.hostingId].name[lang]
												)}
										</Tag>
									</Flex>
									<Text fontSize='14px' color='gray.700'>
										{address}
									</Text>
									<SitterServicePricesMobileHorizontal
										state={state}
										profile={sitter}
									/>
								</Box>
							</Link>
						</NextLink>
					</PopoverBody>
				</PopoverContent>
			</Portal>
		</Popover>
	)
}
function AdGeoInfos({ ad, isFocus = false, setCurrentHoverId }) {
	return (
		<MotionBox
			width='50px'
			height='35px'
			display='flex'
			alignItems='center'
			justifyContent='center'
			borderRadius='15px'
			bg={isFocus ? 'black' : 'white'}
			color={isFocus ? 'white' : 'black'}
			boxShadow='rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, 0.18) 0px 1px 2px;'
			transform='translate(-50%, -50%)'
			role='group'
			onMouseEnter={() => {
				setCurrentHoverId(ad.id)
			}}
			onMouseLeave={() => setCurrentHoverId('')}
		>
			<Box display='flex' alignItems='center' flexDir='column'>
				<Box _groupHover={{ fontWeight: 600, textAlign: 'center' }}>
					{ad.speciesNames.map((name) => name)}
				</Box>
			</Box>
		</MotionBox>
	)
}
