import dynamic from 'next/dynamic'
import React, { useEffect, useRef, useState } from 'react'
import { Loader, DragHandle } from 'components'
import { Flex, Box, Heading, Text, chakra, Divider, Button, useColorMode } from '@chakra-ui/react'
import { useI18n } from 'utils/hooks/useI18n'
import { getPercentage } from 'utils'
import searchJSON from 'statics/search/search.json'
import { ProfileCard } from 'layouts/search/ProfileCard'
import { ProfileCardMobileHorizontal } from 'layouts/search/ProfileCardMobileHorizontal'
import { SearchFormMobile } from 'layouts/search/SearchFormMobile'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { isServer } from 'utils'
import { throttle } from 'throttle-debounce'
import { FiMap } from 'react-icons/fi'
import { bgColor, shadow } from 'theme/colors'
import { useScrolling } from 'react-use'

const SearchMapMobileOnly = dynamic(
	// @ts-expect-error
	() => import('layouts/shared/SearchMapMobileOnly').then((mod) => mod.SearchMapMobileOnly),
	{ ssr: false }
)

const MotionBox = chakra(motion.div)
export function MobileUI({
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
	const { t } = useI18n(searchJSON)
	const hasInteracted = useRef(false)
	const { colorMode } = useColorMode()
	const [showMapShortCut, setShowMapShortCut] = useState(false)
	const [preventIntersectionEffect, setPreventIntersectionEffect] = useState(false)
	const scrollRef = React.useRef(null)
	const scrolling = useScrolling(scrollRef)
	const WINDOW_WIDTH = window ? window.innerWidth : undefined

	const MAX_TOP_HEIGHT = window ? window.innerHeight - 60 : undefined
	const MAX_BOTTOM_HEIGHT = 76
	const INITIAL_HEIGHT = window ? getPercentage(window.innerHeight, 60) : undefined
	const EIGHTY_FIVE_PERCENT_BREAKPOINT = window
		? getPercentage(window.innerHeight, 85)
		: undefined
	const TWENTY_FIVE_PERCENT_BREAKPOINT = window
		? getPercentage(window.innerHeight, 25)
		: undefined

	function handleTransformY(y: number) {
		const CURRENT_HEIGHT = INITIAL_HEIGHT - y
		// Under 30% height breakpoint -> snap to bottom
		if (CURRENT_HEIGHT < TWENTY_FIVE_PERCENT_BREAKPOINT) {
			showMapShortCut && setShowMapShortCut(false)
			return `${MAX_BOTTOM_HEIGHT}px`
		}
		// Over 85% height breakpoint -> snap to top
		if (CURRENT_HEIGHT > EIGHTY_FIVE_PERCENT_BREAKPOINT) {
			return `${MAX_TOP_HEIGHT}px`
		}
		// Else drag freely
		showMapShortCut && setShowMapShortCut(false)
		return `${CURRENT_HEIGHT}px`
	}

	// Handle drag actions
	const y = useMotionValue(0)
	const height = useTransform(y, handleTransformY)
	const [startOffset, setStartOffset] = React.useState(0)
	const heightAsNumber = Number(height.get().replace('px', ''))
	const isOpen = height.get() !== `${MAX_BOTTOM_HEIGHT}px`
	const isProfilesContainerFullSize = heightAsNumber === MAX_TOP_HEIGHT

	let prevScrollVal = useRef(window ? window.pageYOffset : 0).current

	function handleVerticalContainerScroll() {
		const st = window.pageYOffset || this.scrollTop
		const isScrollingDown = st > prevScrollVal

		if (isScrollingDown) {
			!showMapShortCut && setShowMapShortCut(true)
			if (!isProfilesContainerFullSize) {
				const DIFF_BETWEEN_CURRENT_AND_TOP_HEIGHT = MAX_TOP_HEIGHT - heightAsNumber
				y.set(-DIFF_BETWEEN_CURRENT_AND_TOP_HEIGHT)
			}
		}
		prevScrollVal = st <= 0 ? 0 : st
	}

	// // Trigger Scroll event
	useEffect(() => {
		if (!isServer) {
			const verticalContainer = document.getElementById('verticalContainer')
			if (verticalContainer) {
				verticalContainer.addEventListener(
					'scroll',
					throttle(500, true, handleVerticalContainerScroll)
				)
				verticalContainer.addEventListener(
					'mousewheel',
					throttle(500, true, handleVerticalContainerScroll)
				)
			}
		}

		return () => {
			if (!isServer) {
				const verticalContainer = document.getElementById('verticalContainer')
				if (verticalContainer) {
					verticalContainer.removeEventListener(
						'scroll',
						throttle(500, true, handleVerticalContainerScroll)
					)
					verticalContainer.removeEventListener(
						'mousewheel',
						throttle(500, true, handleVerticalContainerScroll)
					)
				}
			}
		}
	}, [])

	function handleShowMapFromProfilesList() {
		setShowMapShortCut(false)
		const verticalContainer = document.getElementById('verticalContainer')
		verticalContainer.scrollTop = 0
		const DIFF_BETWEEN_TOP_AND_BOTTOM = MAX_TOP_HEIGHT - MAX_BOTTOM_HEIGHT
		y.set(DIFF_BETWEEN_TOP_AND_BOTTOM)
	}

	function handleGetElementIntoView(elementId) {
		setPreventIntersectionEffect(true)
		setCurrentHoverId(elementId)
		document.getElementById(elementId).scrollIntoView()
	}

	useEffect(() => {
		if (!scrolling && preventIntersectionEffect) {
			setPreventIntersectionEffect(false)
		}
	}, [scrolling])

	return (
		<>
			<Box
				zIndex={1}
				width='100%'
				height='calc(100vh - 65px)'
				pos='absolute'
				top='60px'
				left={0}
				boxSizing='border-box'
			>
				<Box width='100%' height='100%' pos='relative'>
					<SearchMapMobileOnly
						//@ts-expect-error
						coordinates={state.location.coordinates}
						searchItems={sittersGeoInfos}
						state={state}
						setState={setState}
						currentHoverId={currentHoverId}
						setCurrentHoverId={setCurrentHoverId}
						heightParam='65'
						fullScreen={true}
						handleGetElementIntoView={handleGetElementIntoView}
					/>
				</Box>
			</Box>
			{!isOpen && data?.searchProfiles?.profiles.length > 0 ? (
				<motion.ul
					id='horizontalContainer'
					ref={scrollRef}
					style={{
						overflowX: 'auto',
						display: 'flex',
						alignItems: 'flex-start',
						flexWrap: 'nowrap',
						position: 'fixed',
						left: '0',
						bottom: '0',
						width: '100%',
						height: '230px',
						zIndex: 3,
						WebkitOverflowScrolling: 'touch',
						scrollSnapType: 'x mandatory',
						overscrollBehaviorX: 'contain',
						scrollSnapAlign: 'center',
						boxSizing: 'unset'
					}}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1, scrollBehavior: 'smooth' }}
				>
					<Box flex='0 0 5%' />
					{data.searchProfiles.profiles.map((profile, index) => (
						<motion.li
							key={index}
							id={profile.id}
							style={{
								width: getPercentage(WINDOW_WIDTH, 90),
								height: '230px',
								display: 'flex',
								alignItems: 'flex-start',
								justifyContent: 'center',
								flex: '0 0 auto',
								padding: '16px 8px',
								scrollSnapAlign: 'center',
								scrollSnapStop: 'always',
								borderRadius: '25px'
							}}
						>
							<ProfileCardMobileHorizontal
								profile={profile}
								state={state}
								hostingsLookUp={hostingsLookUp}
								partnersLookUp={partnersLookUp}
								currentHoverId={currentHoverId}
								setCurrentHoverId={setCurrentHoverId}
								preventIntersectionEffect={preventIntersectionEffect}
							/>
						</motion.li>
					))}
				</motion.ul>
			) : null}
			<MotionBox
				id='verticalContainer'
				pos='fixed'
				display={{ base: 'flex', lg: 'none' }}
				flexDir='column'
				alignItems='center'
				justifyContent='flex-start'
				bottom='0'
				left='0'
				w='100%'
				overflowY='scroll'
				bg='white'
				pt={3}
				px={6}
				zIndex={3}
				boxShadow='rgba(0, 0, 0, 0.12) 0px -6px 16px'
				borderTopLeftRadius='25px'
				borderTopRightRadius='25px'
				tabIndex={0}
				role='button'
				_hover={{ cursor: 'drag' }}
				aria-describedby='Pet sitters list'
				drag='y'
				onDrag={(_, info) => {
					if (!hasInteracted.current) {
						hasInteracted.current = true
					}
					y.set(startOffset + info.offset.y)
				}}
				onDragEnd={(e, info) => setStartOffset(startOffset + info.offset.y)}
				dragConstraints={{ bottom: 0, top: 0 }}
				dragElastic={false}
				dragMomentum={false}
				style={{ height, transition: 'height 0.05s ease-in-out' }}
			>
				<Flex
					width='100%'
					align='center'
					justify='center'
					flexDir='column'
					_hover={{ cursor: 'drag' }}
				>
					<DragHandle
						pointDownwards={isProfilesContainerFullSize}
						strokeColor={isProfilesContainerFullSize ? '#E53E3E' : undefined}
						fillColor={isProfilesContainerFullSize ? '#B794F4' : undefined}
					/>

					<Flex width='100%' align='center' justify='space-between' mb={isOpen ? 6 : 3}>
						<Heading as='h3' size='sm'>
							{t('petSitterNumber', {
								num: data?.searchProfiles?.profiles?.length
									? data.searchProfiles.profiles.length
									: 0
							})}
						</Heading>
						<SearchFormMobile
							state={state}
							setState={setState}
							errors={errors}
							handleChange={handleChange}
							handleCheckBoxes={handleCheckBoxes}
							languagesOptions={languagesOptions}
							hostingsOptions={hostingsOptions}
							servicesOptions={servicesOptions}
						/>
					</Flex>

					<Divider mb={isOpen ? 6 : 3} />
				</Flex>
				{loading && <Loader />}
				{data?.searchProfiles?.profiles.length === 0 && (
					<Flex flexDir='column' align='center'>
						<Heading as='h3' size='md' mb={3} textAlign='center'>
							{t('noPetSittersOne')}
						</Heading>
						<Text textAlign='center'>{t('noPetSittersTwo')}</Text>
					</Flex>
				)}
				{data?.searchProfiles?.profiles.length > 0 &&
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
			</MotionBox>
			{showMapShortCut ? (
				<Flex
					display={{ base: 'flex', lg: 'none' }}
					pos='fixed'
					bottom='30px'
					left='0'
					align='center'
					justify='space-evenly'
					width='100%'
					zIndex={4}
				>
					<Button
						leftIcon={<FiMap />}
						display={{ base: 'flex', lg: 'none' }}
						backgroundColor={bgColor['dark']}
						color='white'
						borderRadius='20px'
						fontWeight='normal'
						boxShadow={shadow[colorMode]}
						onClick={handleShowMapFromProfilesList}
					>
						{t('map')}
					</Button>
				</Flex>
			) : null}
		</>
	)
}
