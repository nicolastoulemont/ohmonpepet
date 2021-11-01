import { Flex, Heading, Image, Link } from '@chakra-ui/react'
import React from 'react'
import bookingAdsJSON from 'statics/bookingAds.json'
import { useI18n } from 'utils/hooks/useI18n'
import NextLink from 'next/link'

export function NoBidsYet() {
	const { t } = useI18n(bookingAdsJSON)

	return (
		<Flex width='100%' align='center' justify='center' flexDir='column' mt={6}>
			<Image
				src='/img/blank.svg'
				fallbackSrc='/img/blank.svg'
				width={['75px', '125px']}
				height={['75px', '125px']}
				my={[2, 6]}
				alt={t('noAdsImageAlt')}
			/>
			<Heading as='h6' size='sm' my={{ base: 3, sm: 6 }} textAlign='center'>
				{t('noBidsYet')}
			</Heading>
			<NextLink href='/pet-sitter/ads'>
				<Link
					backgroundColor='blue.500'
					color='white'
					px={4}
					py={2}
					borderRadius='4px'
					fontWeight={600}
					textAlign='center'
				>
					{t('firstAdBidTitle')}
				</Link>
			</NextLink>
		</Flex>
	)
}
