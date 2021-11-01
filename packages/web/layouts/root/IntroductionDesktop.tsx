import React, { useState, useRef, useEffect } from 'react'
import { Image, Box, Flex, Heading, Text, chakra } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import VisibilitySensor from 'react-visibility-sensor'
import introductionJSON from 'statics/introduction.json'
import { useI18n } from 'utils/hooks/useI18n'

const MotionImage = chakra(motion.img)
const MotionBox = chakra(motion.div)

export function IntroductionDesktop() {
	const { t, lang } = useI18n(introductionJSON)
	const firstConfig = {
		containerOne: 'translate(0%, 0px) rotate(-4e-10deg) rotateY(15deg) rotateX(9.99994deg)',
		containerTwo: 'translate(0%,0px)',
		subContainerTwo: 'translate(0%,0px)',
		subContainerImagePath: lang === 'fr' ? '/img/FrontDeskOne.svg' : '/img/FrontDeskOneEng.svg',
		subContainerImageAlt: lang === 'fr' ? 'Chercher un pet sitter' : 'Search for a petsitter',
		subContainerLeftPosition: '20%'
	}
	const secondConfig = {
		containerOne: 'translate(90%, 0px) rotate(-4e-10deg) rotateY(-15deg) rotateX(9.99994deg)',
		containerTwo: 'translate(-40%,0px)',
		subContainerTwo: 'translate(-30%,0px)',
		subContainerImagePath: '/img/FrontDeskTwo.svg',
		subContainerImageAlt: lang === 'fr' ? 'Sélectionner un pet sitter' : 'Select a petsitter',

		subContainerLeftPosition: '60%'
	}
	const thirdConfig = {
		containerOne: 'translate(0%, 0px) rotate(-4e-10deg) rotateY(15deg) rotateX(9.99994deg)',
		containerTwo: 'translate(0%,0px)',
		subContainerTwo: 'translate(0%,0px)',
		subContainerImagePath: '/img/FrontDeskThree.svg',
		subContainerImageAlt: lang === 'fr' ? 'Réserver un pet sitter' : 'Book a petsitter',
		subContainerLeftPosition: '20%'
	}

	const [config, setConfig] = useState(firstConfig)
	const [firstTextContainerOpacity, setFirstTextContainerOpacity] = useState(0)
	const [secondTextContainerOpacity, setSecondTextContainerOpacity] = useState(0)
	const [thirdTextContainerOpacity, setThirdTextContainerOpacity] = useState(0)
	const firstTextContainer = useRef<HTMLDivElement>(null)
	const secondTextContainer = useRef<HTMLDivElement>(null)
	const thirdTextContainer = useRef<HTMLDivElement>(null)

	function handleScroll() {
		if (
			firstTextContainer.current &&
			secondTextContainer.current &&
			thirdTextContainer.current
		) {
			const firstYPos = firstTextContainer.current.getBoundingClientRect().top
			const secondYPos = secondTextContainer.current.getBoundingClientRect().top
			const thirdYPos = thirdTextContainer.current.getBoundingClientRect().top

			if (firstYPos < 1100 && firstYPos > -50) {
				setFirstTextContainerOpacity(1)
			} else {
				setFirstTextContainerOpacity(0)
			}

			if (secondYPos < 1100 && secondYPos > -50) {
				setSecondTextContainerOpacity(1)
			} else {
				setSecondTextContainerOpacity(0)
			}
			if (thirdYPos < 1100 && thirdYPos > -50) {
				setThirdTextContainerOpacity(1)
			} else {
				setThirdTextContainerOpacity(0)
			}
		}
	}

	// Trigger Scroll event
	useEffect(() => {
		if (window) {
			window.addEventListener('scroll', handleScroll)
			window.addEventListener('mousewheel', handleScroll)
		}

		return () => {
			if (window) {
				window.removeEventListener('scroll', handleScroll)
				window.removeEventListener('mousewheel', handleScroll)
			}
		}
	}, [])

	return (
		<Box as='section' pos='relative' width='100%'>
			<MotionBox
				position='sticky'
				display='flex'
				alignItems='center'
				top='10%'
				margin={0}
				height='600px'
				width='100%'
				mb='-600px'
				style={{ perspective: '1800px' }}
				overflow='hidden'
			>
				<motion.div
					animate={{ transform: config.containerOne }}
					transition={{ duration: 0.2 }}
					style={{
						position: 'relative',
						width: '50%',
						willChange: 'transform',
						transformOrigin: 'center top'
					}}
				>
					<Box position='relative' zIndex={0} width='115%'>
						<Box paddingBottom='77.4%' position='relative' width='100%'>
							<Image
								src='/img/BackgroundDesktop.svg'
								fallbackSrc='/img/BackgroundDesktop.svg'
								alt={
									lang === 'fr'
										? 'Représentation de ohmonpepet'
										: 'Ohmonpepet representation'
								}
								position='absolute'
								top='0'
								left='0'
								width='100%'
								height='100%'
								objectPosition='center'
							/>
						</Box>
					</Box>
					<MotionBox
						position='absolute'
						zIndex={1}
						width='80%'
						left={config.subContainerLeftPosition}
						bottom='-30%'
						height='100%'
						willChange='transform'
						transform={config.containerTwo}
						style={{ perspective: '800px', transition: 'all 0.5s ease' }}
					>
						<MotionBox
							position='absolute'
							width='100%'
							height='auto'
							willChange='transform'
							transform={config.subContainerTwo}
							opacity='1'
							style={{ transition: 'all 0.5s ease' }}
						>
							<Box>
								<Box position='relative' width='100%' paddingBottom='76.9%'>
									<MotionImage
										src={config.subContainerImagePath}
										fallbackSrc={config.subContainerImagePath}
										alt={config.subContainerImageAlt}
										position='absolute'
										top='0'
										left='0'
										width='100%'
										height='auto'
										objectPosition='center'
										opacity='1'
									/>
								</Box>
							</Box>
						</MotionBox>
					</MotionBox>
				</motion.div>
			</MotionBox>

			<Flex height='95vh' width='100%' mb={4} justify='space-between' align='center'>
				<Image
					src='/img/TriangleBgOne.svg'
					fallbackSrc='/img/TriangleBgOne.svg'
					alt=''
					width={['50%', '50%', '50%', '50%', '70%']}
					height='auto'
				/>
				<Flex width='50%' align='center' justify='center'>
					<MotionBox
						width='60%'
						ref={firstTextContainer}
						animate={{ opacity: firstTextContainerOpacity }}
						initial={{ opacity: 0 }}
					>
						<Heading as='h2' size='md' mb={6} color='red.400'>
							{t('titleOne')}
						</Heading>
						<Heading as='h3' size='lg' mb={6}>
							{t('subTitleOne')}
						</Heading>
						<VisibilitySensor
							delayedCall={true}
							onChange={(isVisible) => {
								if (isVisible) {
									setConfig(firstConfig)
									setFirstTextContainerOpacity(1)
								}
							}}
						>
							<Text fontSize='20px' pb='140px' color='gray.600'>
								{t('messageOne')}
							</Text>
						</VisibilitySensor>
					</MotionBox>
				</Flex>
			</Flex>

			<Flex height='95vh' width='100%' mb={4} justify='space-between' align='center'>
				<Flex width='50%' align='center' justify='center'>
					<MotionBox
						width='60%'
						ref={secondTextContainer}
						animate={{ opacity: secondTextContainerOpacity }}
						initial={{ opacity: 0 }}
					>
						<Heading as='h2' size='md' mb={6} color='red.400'>
							{t('titleTwo')}
						</Heading>
						<Heading as='h3' size='lg' mb={6}>
							{t('subTitleTwo')}
						</Heading>
						<VisibilitySensor
							delayedCall={true}
							onChange={(isVisible) => isVisible && setConfig(secondConfig)}
						>
							<Text fontSize='20px' pb='140px' color='gray.600'>
								{t('messageTwo')}
							</Text>
						</VisibilitySensor>
					</MotionBox>
				</Flex>
				<Image
					src='/img/TriangleBgTwo.svg'
					fallbackSrc='/img/TriangleBgTwo.svg'
					width={['50%', '50%', '50%', '50%', '70%']}
					height='auto'
					alt=''
				/>
			</Flex>

			<Flex height='95vh' width='100%' mb={4} justify='space-between' align='center'>
				<Image
					src='/img/TriangleBgThree.svg'
					fallbackSrc='/img/TriangleBgThree.svg'
					width={['50%', '50%', '50%', '50%', '70%']}
					height='auto'
					alt=''
				/>
				<Flex width='50%' align='center' justify='center'>
					<MotionBox
						width='60%'
						ref={thirdTextContainer}
						animate={{ opacity: thirdTextContainerOpacity }}
						initial={{ opacity: 0 }}
					>
						<Heading as='h2' size='md' mb={6} color='red.400'>
							{t('titleThree')}
						</Heading>
						<Heading as='h3' size='lg' mb={6}>
							{t('subTitleThree')}
						</Heading>
						<VisibilitySensor
							delayedCall={true}
							onChange={(isVisible) => isVisible && setConfig(thirdConfig)}
						>
							<Text fontSize='20px' pb='140px' color='gray.600'>
								{t('messageThree')}
							</Text>
						</VisibilitySensor>
					</MotionBox>
				</Flex>
			</Flex>
		</Box>
	)
}
