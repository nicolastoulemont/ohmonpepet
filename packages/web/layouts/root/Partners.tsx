import React, { useMemo } from 'react'
import rootJSON from 'statics/root.json'
import { useI18n } from 'utils/hooks/useI18n'
import { motion } from 'framer-motion'
import { Partner, DonationReceipt, Maybe } from '@ohmonpepet/data'
import { IoMdStats } from 'react-icons/io'
import NextLink from 'next/link'
import {
	Box,
	Heading,
	Text,
	Grid,
	Image,
	chakra,
	Flex,
	Tag,
	TagLabel,
	TagLeftIcon,
	Link
} from '@chakra-ui/react'

const MotionFlex = chakra(motion.div)

export function Partners({ partnersList }) {
	const { t } = useI18n(rootJSON)

	return (
		<Box as='section' mb={{ base: 12, md: '200px' }} width='100%'>
			<Heading as='h2' size='2xl' textAlign='center' mb={6}>
				{t('partnersTitle')}
			</Heading>
			<Heading as='h3' size='lg' textAlign='center' mb={3}>
				{t('partnersSubTitle')}
			</Heading>
			<Text textAlign='center'>{t('partnersTextFirst')}</Text>

			<Grid
				width='100%'
				templateColumns={{ base: 'repeat(1,1fr)', md: 'repeat(2,1fr)' }}
				my={6}
			>
				{partnersList.map((partner) => (
					<PartnerCard key={partner.id} partner={partner} />
				))}
			</Grid>
		</Box>
	)
}

interface PartnerCardProps {
	partner: Pick<Partner, 'id' | 'name' | 'description' | 'websiteUrl' | 'medias'> & {
		receipts?: Maybe<
			Array<
				Maybe<
					{ __typename?: 'Receipt' } & Pick<
						DonationReceipt,
						'id' | 'donations' | 'amountDonated'
					>
				>
			>
		>
	}
}

function PartnerCard({ partner }: PartnerCardProps) {
	const { t } = useI18n(rootJSON)

	const totalDonated = useMemo(() => {
		if (!partner.receipts) return 0
		return partner.receipts.reduce((acc, item) => (acc += item.amountDonated), 0)
	}, [partner])

	const numberOfDonations = useMemo(() => {
		if (!partner.receipts) return 0
		return partner.receipts.reduce((acc, item) => (acc += item.donations.length), 0)
	}, [partner])

	return (
		<MotionFlex
			key={partner.id}
			p={6}
			borderRadius='10px'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			boxShadow='rgba(0, 0, 0, 0.12) 0px 3px 8px'
			transition='box-shadow 0.3s ease-in-out'
			_hover={{
				boxShadow: 'rgba(0, 0, 0, 0.12) 0px 8px 12px'
			}}
			alignItems='center'
			justifyContent='center'
			flexDir='column'
		>
			<Image
				src={partner.medias[0].storeUrl}
				fallbackSrc={partner.medias[0].storeUrl}
				alt={`${partner.name} logo`}
				width='150px'
				m='0 auto'
			/>
			<Heading as='h4' size='md' textAlign='center' mb={3}>
				<Link isExternal href={partner.websiteUrl}>
					{partner.name}
				</Link>
			</Heading>
			<Text textAlign='center' mb={3}>
				{partner.description}
			</Text>
			{totalDonated > 0 ? (
				<Flex
					align='center'
					justify='space-around'
					width='100%'
					flexDir={{ base: 'column', md: 'row' }}
				>
					<NextLink href={`/partner/${partner.id}`} passHref>
						<Link>
							<Tag variant='subtle' colorScheme='cyan' mb={{ base: 3, md: 0 }}>
								<TagLeftIcon boxSize='12px' as={IoMdStats} />
								<TagLabel>
									{t('partnersTotalAmountDonated')}
									{totalDonated} €
								</TagLabel>
							</Tag>
						</Link>
					</NextLink>
					<NextLink href={`/partner/${partner.id}`} passHref>
						<Link>
							<Tag variant='subtle' colorScheme='blue'>
								<TagLeftIcon boxSize='12px' as={IoMdStats} />
								<TagLabel>
									{t('partnersTotalNumberOfDonations')}
									{numberOfDonations}
								</TagLabel>
							</Tag>
						</Link>
					</NextLink>
				</Flex>
			) : null}
		</MotionFlex>
	)
}
