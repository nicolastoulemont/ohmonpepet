import React from 'react'
import { Box, Flex, Heading, List, ListItem, Link, Text, Icon } from '@chakra-ui/react'
import NextLink from 'next/link'
import footerJSON from 'statics/footer.json'
import { useI18n } from 'utils/hooks/useI18n'
import { FaFacebookF, FaTwitter } from 'react-icons/fa'

export function Footer({ maxWidth }) {
	const { t } = useI18n(footerJSON)

	return (
		<Flex
			as='footer'
			width='100%'
			backgroundColor='#f7f7f7'
			borderTop='1px solid'
			borderTopColor='rgb(221, 221, 221)'
			alignItems='center'
			justifyContent='baseline'
			flexDir='column'
			py={2}
		>
			<Flex
				width='100%'
				margin='0 auto'
				maxWidth={maxWidth}
				align='flex-start'
				justifyContent='space-between'
				p={6}
				boxSizing='border-box'
				flexDir={{ base: 'column', sm: 'row' }}
			>
				<Box>
					<Heading as='h2' size='sm' mb={2}>
						{t('sectionOneTitle')}
					</Heading>
					<List spacing={2}>
						<ListItem>
							<NextLink href='/about-us' passHref>
								<Link>{t('us')}</Link>
							</NextLink>
						</ListItem>
						<ListItem>
							<NextLink href='/company-infos' passHref>
								<Link>{t('company-infos')}</Link>
							</NextLink>
						</ListItem>
						<ListItem>
							{' '}
							<NextLink href='/contact' passHref>
								<Link>{t('contact')}</Link>
							</NextLink>
						</ListItem>
					</List>
				</Box>
				<Box>
					<Heading as='h2' size='sm' mb={2} mt={{ base: 2, sm: 0 }}>
						{t('sectionTwoTitle')}
					</Heading>
					<List spacing={2}>
						<ListItem>
							<NextLink href='/articles' passHref>
								<Link>{t('blog')}</Link>
							</NextLink>
						</ListItem>
						<ListItem>
							<Link
								href='https://www.facebook.com/ohmonpepet'
								target='_blank'
								rel='noreferrer'
								isExternal
								title='Ohmonpepet facebook page'
							>
								<Icon as={FaFacebookF} />
							</Link>
						</ListItem>
						<ListItem>
							<Link
								href='https://twitter.com/ohmonpepet'
								target='_blank'
								rel='noreferrer'
								isExternal
								title='Ohmonpepet twitter page'
							>
								<Icon as={FaTwitter} />
							</Link>
						</ListItem>
					</List>
				</Box>
				<Box>
					<Heading as='h2' size='sm' mb={2} mt={{ base: 2, sm: 0 }}>
						{t('sectionFourTitle')}
					</Heading>
					<List spacing={2}>
						<ListItem>
							<NextLink href='/cancelation-options' passHref>
								<Link>{t('cancelationOptions')}</Link>
							</NextLink>
						</ListItem>
						<ListItem>
							<NextLink href='/help' passHref>
								<Link>{t('helpCenter')}</Link>
							</NextLink>
						</ListItem>
						<ListItem>
							{' '}
							<NextLink href='/trust' passHref>
								<Link>{t('trust')}</Link>
							</NextLink>
						</ListItem>
					</List>
				</Box>
				<Box>
					<Heading as='h2' size='sm' mb={2} mt={{ base: 2, sm: 0 }}>
						{t('sectionThreeTitle')}
					</Heading>
					<List spacing={2}>
						<ListItem>
							<NextLink href='/cgs' passHref>
								<Link>{t('cgs')}</Link>
							</NextLink>
						</ListItem>
						<ListItem>
							<NextLink href='/information-and-consent' passHref>
								<Link>{t('legalMention')}</Link>
							</NextLink>
						</ListItem>
						<ListItem>
							{' '}
							<NextLink href='/confidentiality-policy' passHref>
								<Link>{t('confidentialityPolicy')}</Link>
							</NextLink>
						</ListItem>
					</List>
				</Box>
			</Flex>
			<Flex
				align='center'
				justify='space-between'
				width='100%'
				margin='0 auto'
				maxWidth={maxWidth}
				px={6}
				flexDir={{ base: 'column', sm: 'row' }}
			>
				<Text fontSize='12px'>{t('copyright', { date: new Date().getFullYear() })}</Text>
				<Text fontSize='10px' mt={2}>
					{t('iconsOne')}
					<a
						href='https://www.flaticon.com/authors/freepik'
						title='Freepik'
						target='_blank'
						rel='noreferrer'
					>
						Freepik
					</a>{' '}
					{t('iconsTwo')}
					<a href='https://www.flaticon.com/' target='_blank' rel='noreferrer'>
						{' '}
						{t('iconsThree')}
					</a>
				</Text>
			</Flex>
		</Flex>
	)
}
