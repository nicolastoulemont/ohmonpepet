import React, { useState, useEffect } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import { Heading, Divider, Image, Box } from '@chakra-ui/react'
import profileByIdJSON from 'statics/profileById.json'
import { useI18n } from 'utils/hooks/useI18n'

export function Map({ profile }) {
	const { t } = useI18n(profileByIdJSON)

	const [viewport, setViewport] = useState({
		latitude: 48.86,
		longitude: 2.3413,
		width: '100%',
		height: '500px',
		zoom: 13
	})

	useEffect(() => {
		if (profile?.location?.coordinates) {
			setViewport({
				...viewport,
				latitude: profile.location.coordinates[1],
				longitude: profile.location.coordinates[0]
			})
		}
	}, [profile])

	if (!profile || !profile.location || !profile.location.coordinates) {
		return <div />
	}

	return (
		<Box>
			<Divider my={[4, 6]} />
			<Heading size='lg' my={[4, 6]}>
				{t('place')}
			</Heading>
			<ReactMapGL
				{...viewport}
				mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAP_BOX_TOKEN}
				mapStyle='mapbox://styles/mapbox/streets-v9'
			>
				<Marker
					latitude={profile.location.coordinates[1]}
					longitude={profile.location.coordinates[0]}
				>
					<Box
						transform='translate(-50%, -50%)'
						pos='relative'
						width='175px'
						height='175px'
						display='flex'
						alignItems='center'
						justifyContent='center'
					>
						<Box
							width='175px'
							height='175px'
							bgColor='gray.700'
							borderRadius='50%'
							opacity='0.3'
						/>

						<Image
							pos='absolute'
							top='50%'
							left='50%'
							src='/img/location.svg'
							fallbackSrc='/img/location.svg'
							width='48px'
							height='48px'
							transform='translate(-50%, -50%)'
						/>
					</Box>
				</Marker>
			</ReactMapGL>
		</Box>
	)
}
