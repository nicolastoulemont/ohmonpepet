import React, { useState } from 'react'
import donationsJSON from 'statics/admin/donations.json'
import { useI18n } from 'utils/hooks/useI18n'
import { Loader, RangeInput } from 'components'
import { useSearchDonationsQuery } from 'generated/graphql'
import { stringToTyped } from 'utils'
import { CheckIcon, WarningTwoIcon } from '@chakra-ui/icons'
import { format } from 'date-fns'
import {
	Heading,
	Flex,
	FormControl,
	Select,
	FormLabel,
	theme,
	Button,
	Text,
	Box,
	GridItem
} from '@chakra-ui/react'

export function DonationsList({ partnersOptions }) {
	const [query, setQuery] = useState({
		donated: false
	})
	const { t } = useI18n(donationsJSON)

	function handleChange(e: React.ChangeEvent<any>) {
		const { name, value } = stringToTyped(e)
		setQuery({ ...query, [name]: value })
	}

	const { data } = useSearchDonationsQuery({
		variables: { input: query },
		fetchPolicy: 'network-only'
	})
	return (
		<GridItem
			colSpan={{ base: 1, lg: 2 }}
			display='flex'
			alignItems='flex-start'
			justifyContent='flex-start'
			flexDir='column'
			minHeight='40vh'
			p={6}
			boxShadow='rgba(0, 0, 0, 0.12) 0px 3px 8px'
			borderRadius='10px'
		>
			<Heading as='h2' size='md' mb={2}>
				{t('donationsList')}
			</Heading>
			<Flex
				width='100%'
				justify={{ base: 'center', xl: 'flex-start' }}
				align={{ base: 'flex-start', xl: 'flex-end' }}
				mb={6}
				flexDir={{ base: 'column', xl: 'row' }}
			>
				<Flex
					justify={{ base: 'center', lg: 'flex-start' }}
					align={{ base: 'center', lg: 'flex-end' }}
					flexDir={{ base: 'column', lg: 'row' }}
					mb={{ base: 3, xl: 0 }}
					width={{ base: '100%', lg: 'auto' }}
				>
					<FormControl width={{ base: '100%', lg: '50%' }}>
						<FormLabel htmlFor='partnerId'>{t('partnerListLabel')}</FormLabel>
						<Select
							id='partnerId'
							name='partnerId'
							value={query['partnerId'] || ''}
							aria-describedby='association partner id'
							variant='outline'
							onChange={handleChange}
							placeholder={t('partnerListPlaceholder')}
						>
							{partnersOptions.map((partner) => (
								<option key={partner.key} value={partner.value}>
									{partner.text}
								</option>
							))}
						</Select>
					</FormControl>
					<RangeInput
						state={query}
						setState={setQuery}
						errors={{}}
						label={t('datesFieldLabel')}
						placeholder={t('datesFieldPlaceholder')}
						styles={{
							mt: [3, 3, 3, 0],
							mr: [0, 0, 0, 2],
							ml: [0, 0, 0, 4],
							width: ['100%', '100%', '100%', 'auto']
						}}
					/>
				</Flex>
				<Flex
					justify={{ base: 'center', lg: 'flex-start' }}
					align={{ base: 'flex-start', lg: 'flex-end' }}
					flexDir={{ base: 'column', lg: 'row' }}
				>
					<Button
						size='sm'
						bgColor={
							query.donated ? theme.colors.green['100'] : theme.colors.red['100']
						}
						mb={{ base: 3, lg: 1 }}
						ml={{ base: 0, lg: 3 }}
						onClick={() => setQuery({ ...query, donated: true })}
					>
						<Text>{t('donated')}</Text>
					</Button>
					<Button
						size='sm'
						bgColor={
							query.donated ? theme.colors.red['100'] : theme.colors.green['100']
						}
						mb={1}
						ml={{ base: 0, lg: 3 }}
						onClick={() => setQuery({ ...query, donated: false })}
					>
						<Text>{t('notDonated')}</Text>
					</Button>
				</Flex>
			</Flex>

			<Box width='100%' maxH='30vh' overflowX='auto'>
				{!data && <Loader />}
				{data?.searchDonations?.donations.length === 0 && (
					<Flex width='100%' align='center' justify='center'>
						<Heading size='xs'>{t('noDonationsQuery')}</Heading>
					</Flex>
				)}
				{data?.searchDonations?.donations?.map((donation) => (
					<Flex
						key={donation.id}
						rounded='md'
						bgColor='gray.50'
						p={3}
						justify='space-between'
						align='center'
						flexDirection={{ base: 'column', md: 'row' }}
					>
						<Box>
							<Heading size='xs'>
								{t('association')} {donation.partner.name}
							</Heading>
							<Text fontSize='xs' display={{ base: 'none', sm: 'block' }}>
								{t('created')}
								{format(new Date(donation.createdAt), 'dd/MM/yyyy')} /{' '}
								{t('updated')}
								{format(new Date(donation.updatedAt), 'dd/MM/yyyy')}
							</Text>
							<Text fontSize='xs' display={{ base: 'block', sm: 'none' }}>
								{t('created')}
								{format(new Date(donation.createdAt), 'dd/MM/yyyy')}
							</Text>
							<Text fontSize='xs' display={{ base: 'block', sm: 'none' }}>
								{t('updated')}
								{format(new Date(donation.updatedAt), 'dd/MM/yyyy')}
							</Text>
						</Box>

						<Flex mt={{ base: 3, sm: 0 }}>
							<Text fontSize='sm'>
								{t('amountToDonate')}
								{donation.amountToDonate} €
							</Text>
							{donation.donated ? (
								<CheckIcon color='green.300' ml={3} w='20px' h='20px' />
							) : (
								<WarningTwoIcon color='red.300' ml={3} w='20px' h='20px' />
							)}
						</Flex>
					</Flex>
				))}
			</Box>
		</GridItem>
	)
}
