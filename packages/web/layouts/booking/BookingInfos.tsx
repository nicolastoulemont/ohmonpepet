import React from 'react'
import { Box, Flex, Image, Text, Heading } from '@chakra-ui/react'
import { useI18n } from 'utils/hooks/useI18n'
import bookingJSON from 'statics/booking.json'
import { SitterServicePrices } from 'layouts/shared/SitterServicePrices'
import { calculateTotalPrice } from 'utils'
import { BookingTotal } from 'layouts/shared/BookingTotal'

export function BookingInfos({ state, profile, selectedDays }) {
	const { t } = useI18n(bookingJSON)

	return (
		<Flex display={['none', 'none', 'none', 'flex']} width='37%' pl={6} mt={8} pos='relative'>
			<Box
				pos='sticky'
				top='100px'
				width='100%'
				height='auto'
				boxShadow='rgba(0, 0, 0, 0.12) 0px 6px 16px'
				borderRadius='10px'
				p={6}
			>
				<Flex width='100%' align='stretch' justifyContent='space-between' mb={6}>
					<Image
						src={profile.pictureUrl}
						alt='profile picture'
						width='110px'
						height='110px'
						borderRadius='10px'
					/>

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
							{profile.stars && profile.ratings && (
								<Flex width='100%' align='center' justify='flex-end'>
									<Image src='/img/star.svg' width='16px' height='16px' mr={1} />
									{profile.stars}{' '}
									<Text ml={1} fontWeight={400} color='gray.500'>
										({profile.ratings.length})
									</Text>
								</Flex>
							)}
						</Flex>
					</Flex>
				</Flex>

				<Heading size='md' my={3}>
					{t('priceDetails')}
				</Heading>
				<Flex align='center' justify='space-between' my={2}>
					<Flex align='center' justify='flex-start'>
						<SitterServicePrices
							state={state}
							profile={profile}
							requiredDaysNumber={selectedDays?.length || 0}
							showTotal={false}
						/>
						<Text mx={2} fontSize='14px'>
							x
						</Text>{' '}
						{selectedDays.length}
					</Flex>
					<Text>
						{!state['service']
							? profile.atHomeDay * selectedDays.length
							: profile[state['service']] * selectedDays.length}
						{`€`}
					</Text>
				</Flex>
				{state.selectedOptions.map((option) => (
					<Flex my={2} align='center' justify='space-between' key={option.name}>
						<Text fontSize='14px'>
							{option.name && option.name !== 'undefined'
								? // @ts-expect-error
								  t(`${option.name}Short`)
								: ''}
						</Text>
						<Text>
							{option.price} {`€`}
						</Text>
					</Flex>
				))}
				<BookingTotal
					total={calculateTotalPrice(
						selectedDays.length,
						state.selectedOptions,
						profile,
						state['service']
					)}
				/>
			</Box>
		</Flex>
	)
}
