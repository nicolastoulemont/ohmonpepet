import React from 'react'
import { Layout, Loader } from 'components'
import { initializeApollo } from 'lib'
import { GET_PARTNER_BY_ID, GET_PARTNERS_IDS } from 'graphql/partners/query'
import partnerJSON from 'statics/partner/page.json'
import { useI18n } from 'utils/hooks/useI18n'
import { Partner, Maybe, Receipt, Donation, Profile } from 'generated/graphql'
import { format } from 'date-fns'
import { fr, enUS } from 'date-fns/locale'
import { useDimensions } from 'utils/hooks'
import { NextSeo } from 'next-seo'
import {
	Heading,
	Text,
	Flex,
	Image,
	Box,
	Link,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	TableCaption,
	Tag,
	Avatar,
	TagLabel
} from '@chakra-ui/react'

export async function getStaticPaths() {
	const apolloClient = initializeApollo()
	const { data } = await apolloClient.query({
		query: GET_PARTNERS_IDS
	})

	const paths = data.partners.partners.map((partner) => ({ params: { id: partner.id } }))
	return {
		paths,
		fallback: false // See the "fallback" section below
	}
}

export async function getStaticProps({ params }) {
	const apolloClient = initializeApollo()

	const { data } = await apolloClient.query({
		query: GET_PARTNER_BY_ID,
		variables: { id: params.id }
	})

	return {
		props: {
			partner: data.partnerById.partner
		},
		revalidate: 60 * 60 * 12
	}
}

interface PartnerPageProps {
	partner: Pick<Partner, 'id' | 'name' | 'description' | 'websiteUrl' | 'logoUrl'> & {
		receipts?: Maybe<
			Array<
				Maybe<
					{ __typename?: 'Receipt' } & Pick<
						Receipt,
						'id' | 'amountDonated' | 'filesUrls' | 'createdAt'
					> & {
							donations?: Maybe<
								Array<
									Maybe<
										{ __typename?: 'Donation' } & Pick<
											Donation,
											'id' | 'amountToDonate' | 'createdAt'
										> & {
												sitter?: Maybe<
													{ __typename?: 'Profile' } & Pick<
														Profile,
														'pictureUrl' | 'firstName'
													>
												>
											}
									>
								>
							>
						}
				>
			>
		>
	}
}

export default function PartnerDonationsAndReceiptsPage({ partner }: PartnerPageProps) {
	const { t, lang } = useI18n(partnerJSON)
	const [width] = useDimensions()

	if (!partner) {
		return (
			<Layout>
				<Loader />
			</Layout>
		)
	}

	return (
		<Layout>
			<NextSeo title={`Ohmonpepet | ${partner.name}`} />
			<Flex
				width='100%'
				align='flex-start'
				justify='space-between'
				mb={{ base: 3, md: 6 }}
				flexDir={{ base: 'column-reverse', sm: 'row' }}
			>
				<Box>
					<Heading as='h1' size='2xl' mb={6}>
						{partner.name}
					</Heading>
					<Text mb={3}>{t('title', { name: partner.name })}</Text>
					<Heading as='h3' size='md' mb={3}>
						{t('description')}
					</Heading>
					<Text mb={3}>{partner.description}</Text>
					<Heading as='h3' size='md' mb={3}>
						{t('website')}
					</Heading>
					<Link href={partner.websiteUrl} isExternal color='blue.400' fontWeight={600}>
						{partner.websiteUrl}
					</Link>
				</Box>

				<Image
					src={partner.logoUrl}
					fallbackSrc={partner.logoUrl}
					alt={`logo ${partner.name}`}
					rounded='md'
					width={{ base: 'auto', sm: '30%' }}
					height={{ base: '200px', sm: 'auto' }}
					m={{ base: '0 auto', sm: 'auto' }}
					maxHeight={{ base: '200px', sm: '450px' }}
				/>
			</Flex>
			{partner.receipts.length === 0 && (
				<Box>
					<Heading size='sm' as='h4' textAlign='center'>
						{t('noReceiptsYet')}
					</Heading>
				</Box>
			)}
			{partner.receipts.length > 0 && (
				<Accordion defaultIndex={[0]} allowMultiple width='100%'>
					{partner.receipts.map((receipt) => (
						<AccordionItem key={receipt.id}>
							<AccordionButton px={!width || width > 400 ? 3 : 0}>
								<Flex align='center' justify='space-between' width='100%'>
									<Heading as='h3' size='sm'>
										{t('donationDate', {
											date: format(
												new Date(receipt.createdAt),
												'd LLLL yyyy',
												{
													locale: lang === 'fr' ? fr : enUS
												}
											)
										})}
									</Heading>
									<AccordionIcon />
								</Flex>
							</AccordionButton>
							<AccordionPanel pb={3} px={!width || width > 400 ? 3 : 0}>
								<Flex
									width='100%'
									align='flex-start'
									justify='space-between'
									flexDir={{ base: 'column', sm: 'row' }}
									mb={3}
								>
									<Flex
										align='center'
										justify={{ base: 'center', sm: 'flex-start' }}
										flexDir={{ base: 'row', sm: 'column' }}
										mb={{ base: 3, sm: 0 }}
									>
										<Heading
											as='h4'
											fontSize={{ base: '14px', sm: '16px' }}
											mb={{ base: 0, sm: 3 }}
										>
											{!width || width > 400
												? `${t('amountDonated')} ${receipt.amountDonated} €`
												: `${t('amountDonatedShort')} ${
														receipt.amountDonated
												  } €`}
										</Heading>
										<Text
											fontSize={{ base: '14px', sm: '16px' }}
											ml={{ base: 3, sm: 0 }}
										>
											{!width || width > 400
												? t('numberOfDonations', {
														number: receipt.donations.length
												  })
												: t('numberOfDonationsShort', {
														number: receipt.donations.length
												  })}
										</Text>
									</Flex>
									<Flex
										align='center'
										justify={{ base: 'space-evenly', sm: 'flex-end' }}
										width='100%'
									>
										{receipt.filesUrls.map((url, index) => (
											<Image
												key={url}
												src={url}
												ml={index !== 0 ? 3 : 0}
												fallbackSrc={url}
												rounded='md'
												height='75px'
												alt='recu de donation'
											/>
										))}
									</Flex>
								</Flex>
								<Table variant='stripped' size='sm'>
									<TableCaption>{t('tableCaption')}</TableCaption>
									<Thead>
										<Tr>
											<Th p={{ base: 1, sm: 3 }}>{t('tablePetSitter')}</Th>
											<Th p={{ base: 1, sm: 3 }}>
												{!width || width > 400
													? t('tableDonationDate')
													: t('tableDonationDateShort')}
											</Th>
											<Th isNumeric p={{ base: 1, sm: 3 }}>
												{!width || width > 400
													? t('tableAmountToDonate')
													: t('tableAmountToDonateShort')}
											</Th>
										</Tr>
									</Thead>
									<Tbody>
										{receipt.donations.map((donation) => (
											<Tr key={donation.id}>
												<Td p={{ base: 1, sm: 3 }}>
													<Tag
														size={!width || width > 400 ? 'lg' : 'sm'}
														colorScheme='red'
														borderRadius='full'
													>
														<Avatar
															src={donation.sitter.pictureUrl}
															size='xs'
															name={donation.sitter.firstName}
															ml={-1}
															mr={2}
														/>
														<TagLabel>
															{donation.sitter.firstName}
														</TagLabel>
													</Tag>
												</Td>
												<Td p={{ base: 1, sm: 3 }}>
													{format(
														new Date(donation.createdAt),
														!width || width > 400
															? 'd LLLL yyyy'
															: 'dd/MM/yy',
														{
															locale: lang === 'fr' ? fr : enUS
														}
													)}
												</Td>
												<Td isNumeric p={{ base: 1, sm: 3 }}>
													{donation.amountToDonate}
												</Td>
											</Tr>
										))}
									</Tbody>
									{receipt.donations.length > 10 ? (
										<Tfoot>
											<Tr>
												<Th>{t('tablePetSitter')}</Th>
												<Th>
													{!width || width > 400
														? t('tableDonationDate')
														: t('tableDonationDateShort')}
												</Th>
												<Th isNumeric>
													{!width || width > 400
														? t('tableAmountToDonate')
														: t('tableAmountToDonateShort')}
												</Th>
											</Tr>
										</Tfoot>
									) : null}
								</Table>
							</AccordionPanel>
						</AccordionItem>
					))}
				</Accordion>
			)}
		</Layout>
	)
}
