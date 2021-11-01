import React from 'react'
import { Box, Flex, Image, Text, Heading, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useI18n } from 'utils/hooks/useI18n'
import bookingJSON from 'statics/booking.json'

export function BookingMobileInfosTop({ profile }) {
	const { t } = useI18n(bookingJSON)
	const { back } = useRouter()
	return (
		<Box display={{ base: 'block', lg: 'none' }} width='100%'>
			<Button display={{ base: 'block', lg: 'none' }} size='sm' mb={3} onClick={back}>
				{t('goBack')}
			</Button>
			<Flex width='100%' align='stretch' justifyContent='space-between' mb={6}>
				<Image src={profile.pictureUrl} width='110px' borderRadius='10px' />
				{profile.stars && profile.ratings && (
					<Flex fontSize='14px' fontWeight={600} flex='1'>
						<Flex
							flexDir='column'
							align='flex-end'
							justify='space-between'
							height='100%'
							width='100%'
						>
							<Box width='100%' textAlign='right'>
								<Heading size='sm'>{profile.firstName}</Heading>
								<Text color='gray.500' fontSize='14px'>
									{profile.city}
								</Text>
							</Box>
							<Flex width='100%' align='center' justify='flex-end'>
								<Image src='/img/star.svg' width='16px' height='16px' mr={1} />
								{profile.stars}{' '}
								<Text ml={1} fontWeight={400} color='gray.500'>
									({profile.ratings.length})
								</Text>
							</Flex>
						</Flex>
					</Flex>
				)}
			</Flex>
		</Box>
	)
}
