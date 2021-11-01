import React, { useEffect } from 'react'
import { Flex, Heading, useToast } from '@chakra-ui/react'
import { useI18n } from 'utils/hooks/useI18n'
import rootJSON from 'statics/root.json'
import { useRouter } from 'next/router'

export function CTA() {
	const { t } = useI18n(rootJSON)
	const toast = useToast()

	const { query, replace } = useRouter()

	useEffect(() => {
		if (query?.deletedAccount === 'true') {
			toast({
				position: 'top',
				title: t('deleteAccountTitle'),
				description: t('deleteAccountSubTitle'),
				status: 'success',
				duration: 9000,
				isClosable: true
			})
			replace('/')
		}
	}, [query])

	return (
		<Flex
			as='section'
			width='100%'
			height={{ base: '125px', sm: '150px', md: '300px' }}
			align='center'
			justify='center'
			mb={4}
			mt={{ base: 4, md: 0 }}
		>
			<Heading
				fontSize={{ base: '2.8rem', sm: '3rem', md: '3.75rem' }}
				lineHeight={1}
				as='h1'
				textAlign='center'
				width={{ base: '100%', lg: '90%' }}
				mb={{ base: 3, sm: 0 }}
			>
				{t('titleOne')}
				<em>{t('titleTwo')}</em>
				{t('titleThree')}
			</Heading>
		</Flex>
	)
}
