import React from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import rootJSON from 'statics/root.json'
import { useI18n } from 'utils/hooks/useI18n'
export function HowItWorks() {
	const { t } = useI18n(rootJSON)

	return (
		<Flex
			as='section'
			align='center'
			justify='center'
			width='100%'
			height={{ base: '150px', md: '400px' }}
			flexDir='column'
		>
			<Heading as='h2' size='2xl' mb={6} textAlign='center'>
				{t('howItWorksTitle')}
			</Heading>
			<Heading as='h3' size='lg' fontWeight={600} textAlign='center'>
				{t('howItWorksSubTitle')}
			</Heading>
		</Flex>
	)
}
