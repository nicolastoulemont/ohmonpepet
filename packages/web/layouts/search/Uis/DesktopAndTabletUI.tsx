import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import { Loader } from 'components'
import { Flex, Box, Heading, Text, useColorMode, Icon, Button } from '@chakra-ui/react'
import { useI18n } from 'utils/hooks/useI18n'
import searchJSON from 'statics/search/search.json'
import { FiMap, FiX } from 'react-icons/fi'
import { bgColor, shadow } from 'theme/colors'
import { useDimensions } from 'utils/hooks'
import { keyValidation } from 'utils/keyboard'
import { ProfileCard } from 'layouts/search/ProfileCard'
import { SearchFormDesktop } from 'layouts/search/SearchFormDesktop'
const SearchMap = dynamic(
	// @ts-expect-error
	() => import('layouts/shared/SearchMap').then((mod) => mod.SearchMap),
	{ ssr: false }
)

export function DesktopAndTabletUI({
	state,
	setState,
	sittersGeoInfos,
	errors,
	languagesOptions,
	hostingsOptions,
	servicesOptions,
	handleChange,
	handleCheckBoxes,
	data,
	loading,
	languagesLookUp,
	hostingsLookUp,
	gendersLookUp,
	partnersLookUp,
	requiredDaysNumber,
	currentHoverId,
	setCurrentHoverId
}) {
	const [showSmallScreenMap, setShowSmallScreenMap] = useState(undefined)
	const { colorMode } = useColorMode()
	const [width] = useDimensions()
	const { t } = useI18n(searchJSON)

	useEffect(() => {
		if (width && width > 992 && showSmallScreenMap) {
			setShowSmallScreenMap(false)
		}
	}, [width])

	return (
		<>
			{showSmallScreenMap && (
				<Box
					zIndex={9}
					width='100%'
					height='calc(100vh - 65px)'
					pos='absolute'
					top='60px'
					left={0}
					boxSizing='border-box'
				>
					<Box width='100%' height='100%' pos='relative'>
						<Icon
							as={FiX}
							width='50px'
							height='50px'
							p={3}
							backgroundColor={bgColor['dark']}
							color='white'
							boxShadow={shadow[colorMode]}
							borderRadius='50%'
							pos='absolute'
							bottom='50px'
							left='calc(50% - 25px)'
							zIndex={100}
							fontSize='10px'
							role='button'
							onClick={() => setShowSmallScreenMap(false)}
							onKeyDown={(event) =>
								keyValidation(event) && setShowSmallScreenMap(false)
							}
						/>
						<SearchMap
							//@ts-expect-error
							coordinates={state.location.coordinates}
							searchItems={sittersGeoInfos}
							state={state}
							setState={setState}
							heightParam='60'
							currentHoverId={currentHoverId}
							setCurrentHoverId={setCurrentHoverId}
							partnersLookUp={partnersLookUp}
							hostingsLookUp={hostingsLookUp}
							fullScreen={true}
							onDragSearch={false}
						/>
					</Box>
				</Box>
			)}
			<Flex
				align='flex-start'
				justify='space-between'
				height={{ base: 'auto', sm: '100%' }}
				width='100%'
			>
				<Box
					width={{ base: '100%', lg: '50%' }}
					minWidth={{ base: 'none', lg: '650px' }}
					maxWidth={{ base: 'none', lg: '800px' }}
					height={{ base: 'auto', sm: '100%', lg: 'calc(100vh - 98px)' }}
					boxSizing='border-box'
					overflowY='auto'
				>
					<SearchFormDesktop
						state={state}
						setState={setState}
						errors={errors}
						handleChange={handleChange}
						handleCheckBoxes={handleCheckBoxes}
						languagesOptions={languagesOptions}
						hostingsOptions={hostingsOptions}
						servicesOptions={servicesOptions}
					/>

					<Flex width='100%' flexDir='column' pr={{ base: 0, md: 6 }} flex='1'>
						{loading && <Loader />}
						{data?.searchProfiles?.profiles.length === 0 && (
							<Flex flexDir='column' align='center'>
								<Heading as='h3' size='md' mb={3}>
									{t('noPetSittersOne')}
								</Heading>
								<Text>{t('noPetSittersTwo')}</Text>
							</Flex>
						)}
						{data?.searchProfiles.profiles.length > 0 &&
							data.searchProfiles.profiles.map((profile, index) => (
								<ProfileCard
									key={`${index}-${profile.id}`}
									profile={profile}
									state={state}
									hostingsLookUp={hostingsLookUp}
									languagesLookUp={languagesLookUp}
									gendersLookUp={gendersLookUp}
									requiredDaysNumber={requiredDaysNumber}
									setCurrentHoverId={setCurrentHoverId}
									partnersLookUp={partnersLookUp}
								/>
							))}
					</Flex>
				</Box>

				<Flex
					display={{ base: 'none', lg: 'flex' }}
					flex='1'
					maxWidth='calc(100% - 650px)'
					height='100%'
					borderRadius='4px'
					boxSizing='border-box'
					pos='relative'
					zIndex={1}
				>
					{(!width || width > 991) && (
						<SearchMap
							//@ts-expect-error
							coordinates={state.location.coordinates}
							searchItems={sittersGeoInfos}
							state={state}
							setState={setState}
							currentHoverId={currentHoverId}
							setCurrentHoverId={setCurrentHoverId}
							onDragSearch={true}
							partnersLookUp={partnersLookUp}
							hostingsLookUp={hostingsLookUp}
						/>
					)}
				</Flex>
			</Flex>
			<Flex
				display={{ base: 'flex', lg: 'none' }}
				pos='fixed'
				bottom='30px'
				left='0'
				align='center'
				justify='space-evenly'
				width='100%'
			>
				<Button
					leftIcon={<FiMap />}
					display={{ base: 'flex', lg: 'none' }}
					backgroundColor={bgColor['dark']}
					color='white'
					borderRadius='20px'
					fontWeight='normal'
					boxShadow={shadow[colorMode]}
					onClick={() => setShowSmallScreenMap(true)}
					onKeyDown={(event) => keyValidation(event) && setShowSmallScreenMap(true)}
				>
					{t('map')}
				</Button>
			</Flex>
		</>
	)
}
