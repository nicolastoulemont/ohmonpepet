import React, { useState, useEffect, useRef } from 'react'
import { useI18n } from 'utils/hooks/useI18n'
import headerJson from 'statics/header.json'
import { FiActivity, FiBriefcase, FiLogIn, FiLogOut, FiSettings, FiUser } from 'react-icons/fi'
import { TiPlus } from 'react-icons/ti'
import { useCurrentUserQuery, useSignOutMutation } from 'generated/graphql'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { isType } from 'utils/types'

import {
	Link,
	Image,
	Button,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	Divider,
	Icon
} from '@chakra-ui/react'

export function UserMenu() {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const { t, lang } = useI18n(headerJson)
	const btnRef = useRef()

	const { pathname } = useRouter()
	const { data } = useCurrentUserQuery()
	const [signOut] = useSignOutMutation({
		update: (cache, { data: { signOut } }) => {
			signOut.__typename === 'Success' && cache.reset()
		}
	})

	useEffect(() => {
		if (isType(data?.currentUser, 'User')) {
			setIsLoggedIn(true)
		} else if (isType(data?.currentUser, 'UserAuthenticationError') && isLoggedIn) {
			setIsLoggedIn(false)
		}
	}, [data])

	return (
		<>
			<Button ref={btnRef} onClick={onOpen} variant='ghost'>
				<Image
					src='/img/menu.svg'
					fallbackSrc='/img/menu.svg'
					width='30px'
					height='30px'
					alt='menu'
					transform='rotate(180deg)'
				/>
			</Button>
			<Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef}>
				<DrawerOverlay>
					<DrawerContent borderTopLeftRadius='10px' borderBottomLeftRadius='10px'>
						<DrawerCloseButton />
						<DrawerHeader fontSize='22px'>{t('drawerTitle')}</DrawerHeader>
						<DrawerBody textAlign='left' boxSizing='border-box' py={2} color='gray.700'>
							<Divider mb={2} />
							{!isLoggedIn ? (
								<>
									<NextLink href='/signin' passHref>
										<Link
											display='flex'
											alignItems='center'
											justifyContent='flex-start'
											fontSize='22px'
											mb={2}
										>
											<Icon as={FiLogIn} mr={4} />
											{t('signIn')}
										</Link>
									</NextLink>

									<NextLink href='/signup' passHref>
										<Link
											display='flex'
											alignItems='center'
											justifyContent='flex-start'
											fontSize='22px'
											mb={2}
										>
											<Icon as={TiPlus} mr={4} />
											{t('signUp')}
										</Link>
									</NextLink>
								</>
							) : (
								<>
									{data?.currentUser?.__typename === 'User' &&
										data?.currentUser?.profile?.isPetSitter && (
											<>
												<NextLink href='/pet-sitter' passHref>
													<Link
														display='flex'
														alignItems='center'
														justifyContent='flex-start'
														fontSize='22px'
														mb={2}
													>
														<Icon
															as={FiBriefcase}
															mr={4}
															color='green.500'
														/>
														{t('petSitterSpace')}
													</Link>
												</NextLink>
												<NextLink href='/pet-sitter/metrics' passHref>
													<Link
														display='flex'
														alignItems='center'
														justifyContent='flex-start'
														fontSize='22px'
														mb={2}
													>
														<Icon
															as={FiActivity}
															mr={4}
															color='purple.500'
														/>
														{t('petSitterMetrics')}
													</Link>
												</NextLink>
											</>
										)}
									<NextLink href='/bookings' passHref>
										<Link
											display='flex'
											alignItems='center'
											justifyContent='flex-start'
											fontSize='22px'
											mb={2}
										>
											<Icon as={FiBriefcase} mr={4} color='red.500' />
											{t('bookings')}
										</Link>
									</NextLink>
									<NextLink href='/booking-ads' passHref>
										<Link
											display='flex'
											alignItems='center'
											justifyContent='flex-start'
											fontSize='22px'
											mb={2}
										>
											<Icon as={FiBriefcase} mr={4} color='blue.500' />
											{t('openBookings')}
										</Link>
									</NextLink>
									<NextLink href='/profile' passHref>
										<Link
											display='flex'
											alignItems='center'
											justifyContent='flex-start'
											fontSize='22px'
											mb={2}
										>
											<Icon as={FiUser} mr={4} />
											{t('profile')}
										</Link>
									</NextLink>

									<NextLink href='/account' passHref>
										<Link
											display='flex'
											alignItems='center'
											justifyContent='flex-start'
											fontSize='22px'
											mb={2}
										>
											<Icon as={FiSettings} mr={4} />
											{t('account')}
										</Link>
									</NextLink>
									<Link
										display='flex'
										alignItems='center'
										justifyContent='flex-start'
										fontSize='22px'
										mb={2}
										onClick={() => signOut()}
									>
										<Icon as={FiLogOut} mr={4} />
										{t('signOut')}
									</Link>
								</>
							)}
							{pathname &&
								!pathname.includes('onboarding') &&
								data?.currentUser?.__typename === 'User' &&
								!data?.currentUser?.profile?.isPetSitter && (
									<NextLink href='/onboarding' passHref>
										<Link
											display='flex'
											alignItems='center'
											justifyContent='flex-start'
											fontSize='22px'
											mb={2}
										>
											<Image
												src='/img/dog.svg'
												fallbackSrc='/img/dog.svg'
												alt='pet with petsitter'
												width='22px'
												height='22px'
												mr={4}
											/>
											{t('petsitter')}
										</Link>
									</NextLink>
								)}

							{lang === 'fr' ? (
								<LanguageMenuItem targetLang='en' />
							) : (
								<LanguageMenuItem targetLang='fr' />
							)}
						</DrawerBody>
					</DrawerContent>
				</DrawerOverlay>
			</Drawer>
		</>
	)
}

function LanguageMenuItem({ targetLang = 'fr' }: { targetLang: 'fr' | 'en' }) {
	const { asPath } = useRouter()

	return (
		<NextLink href={asPath} locale={targetLang} passHref>
			<Image
				src={`/img/${targetLang === 'fr' ? 'france' : 'uk'}.png`}
				fallbackSrc={`/img/${targetLang === 'fr' ? 'france' : 'uk'}.png`}
				alt={targetLang === 'fr' ? 'french' : 'english'}
				width='30px'
				minWidth='30px'
				_hover={{ cursor: 'pointer' }}
			/>
		</NextLink>
	)
}
