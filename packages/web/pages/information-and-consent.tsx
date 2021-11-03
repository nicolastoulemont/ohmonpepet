import { Layout } from 'components'
import React from 'react'
import { Flex, Image, Heading } from '@chakra-ui/react'
import InformationAndConsentJSON from 'statics/misc/information-and-consent.json'
import { useI18n } from 'utils/hooks/useI18n'

export default function InformationAndConsent() {
	const { t } = useI18n(InformationAndConsentJSON)

	return (
		<Layout>
			<Flex
				flexDirection='column'
				align='center'
				justify='flex-start'
				width={['100%', '100%', '75%']}
				margin='0 auto'
				height='auto'
				textAlign='center'
				boxSizing='border-box'
			>
				<Image
					src='/img/court.svg'
					width={['125px', '200px']}
					height={['125px', '200px']}
					mt={[2, 6]}
					alt='contact us'
				/>
				<Heading as='h1' mb={6} mt={8}>
					{t('title')}
				</Heading>
			</Flex>
		</Layout>
	)
}
