import React, { useState, useEffect, useRef } from 'react'
import { useI18n } from 'utils/hooks/useI18n'
import headerJson from 'statics/header.json'
import { FiLogIn, FiLogOut, FiSettings, FiActivity, FiArchive, FiHome } from 'react-icons/fi'
import { GoGraph } from 'react-icons/go'
import { TiPlus } from 'react-icons/ti'
import { IoMdFemale, IoMdOptions } from 'react-icons/io'
import { FaCat, FaLanguage, FaHandshake } from 'react-icons/fa'
import { AiOutlineHeart } from 'react-icons/ai'
import { useCurrentAdminQuery, useSignOutMutation } from 'generated/graphql'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
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

export function AdminMenu() {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const btnRef = useRef()
	const { data } = useCurrentAdminQuery()
	const [signOut] = useSignOutMutation({
		update: (cache, { data: { signOut } }) => {
			signOut.__typename === 'Success' && cache.reset()
		}
	})

	useEffect(() => {
		if (data?.currentAdmin.admin) {
			setIsLoggedIn(true)
		} else if (data?.currentAdmin.errors && isLoggedIn) {
			setIsLoggedIn(false)
		}
	}, [data])

	const { t, lang } = useI18n(headerJson)

	return (
		<>
			<Button ref={btnRef} onClick={onOpen} variant='ghost'>
				<Image
					src='/img/menu.svg'
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
									<NextLink href='/admin' passHref>
										<Link
											display='flex'
											alignItems='center'
											justifyContent='flex-start'
											fontSize='22px'
											mb={2}
										>
											<Icon as={FiActivity} mr={4} color='blue.500' />
											{t('dashboard')}
										</Link>
									</NextLink>
									<NextLink href='/admin/payments' passHref>
										<Link
											display='flex'
											alignItems='center'
											justifyContent='flex-start'
											fontSize='22px'
											mb={2}
										>
											<Icon as={GoGraph} mr={4} color='green.500' />
											{t('payments')}
										</Link>
									</NextLink>
									<NextLink href='/admin/donations' passHref>
										<Link
											display='flex'
											alignItems='center'
											justifyContent='flex-start'
											fontSize='22px'
											mb={2}
										>
											<Icon as={AiOutlineHeart} mr={4} color='purple.500' />
											{t('donations')}
										</Link>
									</NextLink>
									<NextLink href='/admin/services' passHref>
										<Link
											display='flex'
											alignItems='center'
											justifyContent='flex-start'
											fontSize='22px'
											mb={2}
										>
											<Icon as={IoMdOptions} mr={4} color='blue.500' />
											{t('services')}
										</Link>
									</NextLink>
									<NextLink href='/admin/claims' passHref>
										<Link
											display='flex'
											alignItems='center'
											justifyContent='flex-start'
											fontSize='22px'
											mb={2}
										>
											<Icon as={FiArchive} mr={4} color='red.500' />
											{t('claims')}
										</Link>
									</NextLink>
									<NextLink href='/admin/genders' passHref>
										<Link
											display='flex'
											alignItems='center'
											justifyContent='flex-start'
											fontSize='22px'
											mb={2}
										>
											<Icon as={IoMdFemale} mr={4} color='teal.500' />
											{t('genders')}
										</Link>
									</NextLink>
									<NextLink href='/admin/hostings' passHref>
										<Link
											display='flex'
											alignItems='center'
											justifyContent='flex-start'
											fontSize='22px'
											mb={2}
										>
											<Icon as={FiHome} mr={4} color='purple.500' />
											{t('hostings')}
										</Link>
									</NextLink>
									<NextLink href='/admin/species' passHref>
										<Link
											display='flex'
											alignItems='center'
											justifyContent='flex-start'
											fontSize='22px'
											mb={2}
										>
											<Icon as={FaCat} mr={4} color='green.500' />
											{t('species')}
										</Link>
									</NextLink>
									<NextLink href='/admin/languages' passHref>
										<Link
											display='flex'
											alignItems='center'
											justifyContent='flex-start'
											fontSize='22px'
											mb={2}
										>
											<Icon as={FaLanguage} mr={4} color='orange.500' />
											{t('languages')}
										</Link>
									</NextLink>
									<NextLink href='/admin/partners' passHref>
										<Link
											display='flex'
											alignItems='center'
											justifyContent='flex-start'
											fontSize='22px'
											mb={2}
										>
											<Icon as={FaHandshake} mr={4} color='cyan.500' />
											{t('partners')}
										</Link>
									</NextLink>

									<NextLink href='/admin/account' passHref>
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
