import React, { useState } from 'react'
import donationsJSON from 'statics/admin/donations.json'
import { useI18n } from 'utils/hooks/useI18n'
import { Loader, RangeInput } from 'components'
import { useSearchReceiptsQuery } from 'generated/graphql'
import { stringToTyped } from 'utils'
import { format } from 'date-fns'
import { Heading, Flex, FormControl, Select, FormLabel, Image, Text, Box } from '@chakra-ui/react'

export function ReceiptsList({ partnersOptions }) {
	const [query, setQuery] = useState({})
	const { t } = useI18n(donationsJSON)

	function handleChange(e: React.ChangeEvent<any>) {
		const { name, value } = stringToTyped(e)
		setQuery({ ...query, [name]: value })
	}

	const { data } = useSearchReceiptsQuery({
		variables: { input: query }
	})
	return (
		<Flex
			align='flex-start'
			justify='flex-start'
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
			</Flex>

			<Box width='100%' maxH='30vh' overflowX='auto'>
				{!data && <Loader />}
				{data?.searchReceipts?.receipts.length === 0 && (
					<Flex width='100%' align='center' justify='center'>
						<Heading size='xs'>{t('noReceiptsQuery')}</Heading>
					</Flex>
				)}
				{data?.searchReceipts?.receipts?.map((receipt) => (
					<Box key={receipt.id} rounded='md' bgColor='gray.50' p={3}>
						<Flex
							justify='space-between'
							align='center'
							flexDirection={{ base: 'column', md: 'row' }}
							mb={3}
						>
							<Box>
								<Heading size='xs'>
									{t('association')} {receipt.partner.name}
								</Heading>
								<Text fontSize='xs' display={{ base: 'none', sm: 'block' }}>
									{t('created')}
									{format(new Date(receipt.createdAt), 'dd/MM/yyyy')} /{' '}
									{t('updated')}
									{format(new Date(receipt.updatedAt), 'dd/MM/yyyy')}
								</Text>
								<Text fontSize='xs' display={{ base: 'block', sm: 'none' }}>
									{t('created')}
									{format(new Date(receipt.createdAt), 'dd/MM/yyyy')}
								</Text>
								<Text fontSize='xs' display={{ base: 'block', sm: 'none' }}>
									{t('updated')}
									{format(new Date(receipt.updatedAt), 'dd/MM/yyyy')}
								</Text>
							</Box>

							<Flex mt={{ base: 3, sm: 0 }}>
								<Text fontSize='sm'>
									{t('amountDonatedList')}
									{receipt.amountDonated} €
								</Text>
							</Flex>
						</Flex>
						<Flex wrap='wrap' width='100%'>
							{receipt.filesUrls.map((url, index) => (
								<Image
									src={url}
									fallbackSrc={url}
									width='50px'
									rounded='md'
									ml={index !== 0 ? 3 : 0}
								/>
							))}
						</Flex>
					</Box>
				))}
			</Box>
		</Flex>
	)
}
