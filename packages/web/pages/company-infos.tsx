import { Layout } from 'components'
import React from 'react'
import { Flex, Image, Heading, Text } from '@chakra-ui/react'
import companyInfosJSON from 'statics/misc/companyInfos.json'
import { useI18n } from 'utils/hooks/useI18n'

export default function CompanyInfos() {
	const { t } = useI18n(companyInfosJSON)

	return (
		<Layout>
			<Flex
				flexDirection='column'
				justify='flex-start'
				width='100%'
				margin='0 auto'
				height='auto'
				boxSizing='border-box'
				textAlign='left'
			>
				<Image
					src='/img/certificate-company.svg'
					width={['125px', '200px']}
					height={['125px', '200px']}
					mt={[2, 6]}
					margin='0 auto'
					alt={t('imageAlt')}
				/>
				<Text mt={4} mb={2} fontSize='3xl' as='h1' fontWeight={500}>
					{t('detailsTitle')}
				</Text>
				<Text fontSize='lg' color='gray.600'>
					{t('address')}
				</Text>
				<Text fontSize='lg' color='gray.600'>
					{t('street')}
				</Text>
				<Text fontSize='lg' color='gray.600'>
					{t('codePost')}, {t('city')}, {t('country')}
				</Text>
				<Text fontSize='lg' color='gray.600'>
					{t('typeOfCompany')}
				</Text>
				<Text fontSize='lg' color='gray.600'>
					{t('siren')}
				</Text>
				<Heading as='h2' size='md' mt={4} mb={0}>
					{t('contactUs')}
				</Heading>
				<Text fontSize='lg' fontWeight={600} color='#3840CE'>
					{t('email')}
				</Text>
			</Flex>
		</Layout>
	)
}
