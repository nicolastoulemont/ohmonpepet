import { Box, Flex, Heading, Image, Text, Link } from '@chakra-ui/react'
import React from 'react'
import rootJSON from 'statics/root.json'
import { useI18n } from 'utils/hooks/useI18n'
import NextLink from 'next/link'

export function Arguments() {
	const { t } = useI18n(rootJSON)

	return (
		<>
			<Heading as='h2' size='2xl' textAlign='center' mb={{ base: 3, md: 6 }}>
				{t('argumentTitle')}
			</Heading>
			<Flex
				as='section'
				align={{ base: 'center', md: 'flex-start' }}
				justify='space-between'
				width={{ base: '100%', md: '75%' }}
				m={{ base: 0, md: '0 auto' }}
				flexDir={{ base: 'column', md: 'row' }}
				mb={{ base: 12, md: '200px' }}
			>
				<Box
					width={{ base: '100%', md: '40%' }}
					mb={{ base: 6, md: 0 }}
					mt={{ base: 0, md: 6 }}
					textAlign='center'
				>
					<Heading as='h2' mb={6} color='red.400'>
						{t('argumentsTitleOne')}
					</Heading>
					<Heading as='h3' size='md' mb={6}>
						{t('argumentsSubTitleOne')}
					</Heading>
					<Text>{t('argumentsMessageOne')}</Text>
				</Box>
				<Box width={{ base: '100%', md: '40%' }} textAlign='center'>
					<Heading as='h2' mb={6} mt={{ base: 0, md: 6 }} color='red.400'>
						{t('argumentsTitleTwo')}
					</Heading>
					<Heading as='h3' size='md' mb={6}>
						{t('argumentsSubTitleTwo')}
					</Heading>
					<Text>
						{t('argumentsMessageTwo')}{' '}
						<NextLink href='/onboarding' passHref>
							<Link
								color='blue.600'
								textDecoration='underline'
								fontWeight={600}
								rel='nofollow'
							>
								{t('argumentsMessageTwoLink')}
							</Link>
						</NextLink>{' '}
					</Text>
				</Box>
			</Flex>
			<Box as='section' width='100%' mb={{ base: 12, md: '200px' }}>
				<Heading textAlign='center' as='h2' my={12}>
					{t('servicesTitle')}
				</Heading>
				<Flex
					align='flex-start'
					justify='space-between'
					wrap='wrap'
					width='100%'
					flexDir={['column', 'column', 'row']}
				>
					<Flex
						width={['100%', '100%', '30%']}
						mb={6}
						mr={6}
						align='flex-start'
						justify='space-between'
					>
						<Image
							src='/img/suitcase.svg'
							fallbackSrc='/img/suitcase.svg'
							width='20%'
							alt={t('serviceOneImageAlt')}
						/>
						<Box width='75%'>
							<Heading as='h3' mb={3} size='sm'>
								{t('serviceOneTitle')}
							</Heading>
							<Text>{t('serviceOneMessage')}</Text>
						</Box>
					</Flex>
					<Flex
						width={['100%', '100%', '30%']}
						mb={6}
						mr={6}
						align='flex-start'
						justify='space-between'
					>
						<Image
							src='/img/dog-petting.svg'
							fallbackSrc='/img/dog-petting.svg'
							width='20%'
							alt={t('serviceTwoImageAlt')}
						/>
						<Box width='75%'>
							<Heading as='h3' mb={3} size='sm'>
								{t('serviceTwoTitle')}
							</Heading>
							<Text>{t('serviceTwoMessage')}</Text>
						</Box>
					</Flex>
					<Flex
						width={['100%', '100%', '30%']}
						mb={6}
						mr={6}
						align='flex-start'
						justify='space-between'
					>
						<Image
							src='/img/pet-house.svg'
							fallbackSrc='/img/pet-house.svg'
							width='20%'
							alt={t('serviceThreeImageAlt')}
						/>
						<Box width='75%'>
							<Heading as='h3' mb={3} size='sm'>
								{t('serviceThreeTitle')}
							</Heading>
							<Text>{t('serviceThreeMessage')}</Text>
						</Box>
					</Flex>
					<Flex
						width={['100%', '100%', '30%']}
						mb={6}
						mr={6}
						align='flex-start'
						justify='space-between'
					>
						<Image
							src='/img/play-with-pet.svg'
							fallbackSrc='/img/play-with-pet.svg'
							width='20%'
							alt={t('serviceFourImageAlt')}
						/>
						<Box width='75%'>
							<Heading as='h3' mb={3} size='sm'>
								{t('serviceFourTitle')}
							</Heading>
							<Text>{t('serviceFourMessage')}</Text>
						</Box>
					</Flex>
					<Flex
						width={['100%', '100%', '30%']}
						mb={6}
						mr={6}
						align='flex-start'
						justify='space-between'
					>
						<Image
							src='/img/dog-walking.svg'
							fallbackSrc='/img/dog-walking.svg'
							width='20%'
							alt={t('serviceFiveImageAlt')}
						/>
						<Box width='75%'>
							<Heading as='h3' mb={3} size='sm'>
								{t('serviceFiveTitle')}
							</Heading>
							<Text>{t('serviceFiveMessage')}</Text>
						</Box>
					</Flex>
				</Flex>
			</Box>
		</>
	)
}
