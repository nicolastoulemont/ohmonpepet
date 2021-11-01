import React from 'react'
import { Image, Box, Flex, Heading, Text } from '@chakra-ui/react'
import introductionJSON from 'statics/introduction.json'
import { useI18n } from 'utils/hooks/useI18n'

export function IntroductionMobile() {
	const { t, lang } = useI18n(introductionJSON)

	return (
		<>
			<Flex
				as='section'
				height='60vh'
				width='100%'
				my={{ base: 6, sm: 10 }}
				flexDir='column'
				align='center'
				justify='center'
			>
				<Image
					src={lang === 'fr' ? '/img/MobileFrontOne.svg' : '/img/MobileFrontOneEng.svg'}
					fallbackSrc={
						lang === 'fr' ? '/img/MobileFrontOne.svg' : '/img/MobileFrontOneEng.svg'
					}
					width='100%'
					height='auto'
					alt={lang === 'fr' ? 'Chercher un pet sitter' : 'Search for a petsitter'}
				/>
				<Box width='100%'>
					<Heading as='h2' size='md' mb={6} color='red.400'>
						{t('titleOne')}
					</Heading>
					<Heading as='h3' size='lg' mb={6}>
						{t('subTitleOne')}
					</Heading>
					<Text fontSize='20px' color='gray.600'>
						{t('messageOne')}
					</Text>
				</Box>
			</Flex>

			<Flex
				as='section'
				height='60vh'
				width='100%'
				my={{ base: 6, sm: 10 }}
				flexDir='column'
				align='center'
				justify='center'
			>
				<Image
					src='/img/MobileFrontTwo.svg'
					fallbackSrc='/img/MobileFrontTwo.svg'
					width='100%'
					height='auto'
					alt={lang === 'fr' ? 'Sélectionner un pet sitter' : 'Select a petsitter'}
				/>
				<Box width='100%'>
					<Heading as='h2' size='md' mb={6} color='red.400'>
						{t('titleTwo')}
					</Heading>
					<Heading as='h3' size='lg' mb={6}>
						{t('subTitleTwo')}
					</Heading>

					<Text fontSize='20px' color='gray.600'>
						{t('messageTwo')}
					</Text>
				</Box>
			</Flex>
			<Flex
				as='section'
				height='60vh'
				width='100%'
				my={{ base: 6, sm: 10 }}
				flexDir='column'
				align='center'
				justify='center'
			>
				<Image
					src='/img/MobileFrontThree.svg'
					fallbackSrc='/img/MobileFrontThree.svg'
					width='100%'
					height='auto'
					alt={lang === 'fr' ? 'Réserver un pet sitter' : 'Book a petsitter'}
				/>
				<Box width='100%'>
					<Heading as='h2' size='md' mb={6} color='red.400'>
						{t('titleThree')}
					</Heading>
					<Heading as='h3' size='lg' mb={6}>
						{t('subTitleThree')}
					</Heading>
					<Text fontSize='20px' color='gray.600'>
						{t('messageThree')}
					</Text>
				</Box>
			</Flex>
		</>
	)
}
