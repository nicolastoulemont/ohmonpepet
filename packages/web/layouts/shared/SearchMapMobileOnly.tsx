import React, { useState, useEffect, useRef } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import { Box, chakra, Button } from '@chakra-ui/react'
import { FiRefreshCw } from 'react-icons/fi'
import { bgColor, shadow } from 'theme/colors'
import { useColorMode } from '@chakra-ui/react'
import { useI18n } from 'utils/hooks/useI18n'
import searchJSON from 'statics/search/search.json'
import { keyValidation } from 'utils/keyboard'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { MAP_SEARCH_HIGHER_LIMIT, MAP_SEARCH_LOWER_LIMIT } from 'utils/constants'

const MotionBox = chakra(motion.div)

export function SearchMapMobileOnly({
	coordinates,
	searchItems = [],
	heightParam = '98',
	state,
	setState,
	currentHoverId,
	setCurrentHoverId,
	handleGetElementIntoView
}) {
	const { colorMode } = useColorMode()
	const [showRefreshSearch, setShowRefreshSearch] = useState(false)
	const [viewport, setViewport] = useState({
		latitude: 48.86,
		longitude: 2.3413,
		width: '100%',
		height: `calc(100vh - ${heightParam}px)`,
		zoom: 12
	})
	const { t } = useI18n(searchJSON)
	const { pathname } = useRouter()
	const hasInitializedToCoordinates = useRef(false)

	useEffect(() => {
		if (coordinates) {
			setViewport({ ...viewport, latitude: coordinates[1], longitude: coordinates[0] })
		}
	}, [coordinates])

	function handleViewPortChange(viewport: any) {
		setViewport({ ...viewport })
		if (hasInitializedToCoordinates.current) {
			setShowRefreshSearch(true)
		} else {
			hasInitializedToCoordinates.current = true
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
			{showRefreshSearch ? (
				<MotionBox
					width='260px'
					p={3}
					backgroundColor={bgColor['dark']}
					color='white'
					boxShadow={shadow[colorMode]}
					borderRadius='25px'
					pos='absolute'
					top='20px'
					left='calc(calc(100% - 260px) / 2)'
					zIndex={999}
					display='flex'
					alignItems='center'
					justifyContent='center'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<Box
						width='100%'
						display='flex'
						alignItems='center'
						justifyContent='center'
						role='button'
						tabIndex={0}
						onClick={handleRefreshSearch}
						onKeyDown={(event) => keyValidation(event) && handleRefreshSearch()}
						fontSize='sm'
					>
						<Box as={FiRefreshCw} mr={3} />
						{t('refreshSearch')}
					</Box>
				</MotionBox>
			) : null}

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
								isFocus={item.id === currentHoverId}
								handleGetElementIntoView={handleGetElementIntoView}
							/>
						)}
					</Marker>
				))}
			</ReactMapGL>
		</>
	)
}

function SitterGeoInfos({ sitter, isFocus = false, handleGetElementIntoView }) {
	return (
		<Button
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
			onClick={() => handleGetElementIntoView(sitter.id)}
			_hover={{}}
		>
			<Box display='flex' alignItems='center' flexDir='column'>
				<Box _groupHover={{ fontWeight: 600, textAlign: 'center' }}>{sitter.price} €</Box>
			</Box>
		</Button>
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
