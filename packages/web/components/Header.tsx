import React from 'react'
import NextLink from 'next/link'
import { Flex, Heading, Link, useColorMode, Image, Icon } from '@chakra-ui/react'
import { color, panelBgColor, shadow } from 'theme/colors'
import { UserMenu } from './Menu/UserMenu'
import { FiChevronLeft } from 'react-icons/fi'
import { useRouter } from 'next/router'
import { keyValidation } from 'utils/keyboard'
import { AdminMenu } from './Menu/AdminMenu'

export function Header({ children, maxWidth }) {
	const { colorMode } = useColorMode()
	const { back, push, pathname } = useRouter()

	function handleGoBackHeader() {
		if (pathname.includes('search')) {
			push('/')
		} else {
			back()
		}
	}
	return (
		<Flex
			as='header'
			color={color[colorMode]}
			backgroundColor={panelBgColor[colorMode]}
			boxShadow={shadow[colorMode]}
			position='sticky'
			width='100%'
			top={0}
			zIndex={1000}
			height='60px'
			align='center'
			justify='center'
		>
			<Flex
				as='nav'
				align='center'
				justify='space-between'
				width='100%'
				maxWidth={maxWidth}
				py={{ base: 1, sm: 4 }}
				px={{ base: 2, sm: 6 }}
				boxSizing='border-box'
				position='relative'
			>
				<Icon
					as={FiChevronLeft}
					fontSize='30px'
					onClick={handleGoBackHeader}
					tabIndex={0}
					onKeyDown={(event) => keyValidation(event) && handleGoBackHeader()}
					display={
						typeof children !== 'undefined'
							? ['block', 'block', 'block', 'none']
							: 'none'
					}
				/>

				<NextLink href='/' passHref>
					<Link
						display={
							typeof children !== 'undefined'
								? ['none', 'none', 'none', 'flex']
								: ['flex']
						}
						alignItems='center'
						justifyContent='center'
						_hover={{ textDecor: 'none' }}
					>
						<Image
							src='/img/logo-fullname.png'
							fallbackSrc='/img/logo-fullname.png'
							height='45px'
							width='auto'
							alt='logo'
							display={{ base: 'none', sm: 'block' }}
						/>
						<Image
							src='/img/logo-shortname.png'
							fallbackSrc='/img/logo-shortname.png'
							height='45px'
							ml='14px'
							width='auto'
							display={{ base: 'block', sm: 'none' }}
							alt='logo'
						/>
					</Link>
				</NextLink>

				{children}
				{pathname.includes('admin') ? <AdminMenu /> : <UserMenu />}
			</Flex>
		</Flex>
	)
}
