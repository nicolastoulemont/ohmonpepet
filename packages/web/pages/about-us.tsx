import { Layout } from 'components'
import React from 'react'
import { Flex, Image, Heading, Text } from '@chakra-ui/react'
import aboutUsJSON from 'statics/misc/aboutUs.json'
import { useI18n } from 'utils/hooks/useI18n'

export default function AboutUs() {
	const { t } = useI18n(aboutUsJSON)

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
					src='/img/message.svg'
					width={['125px', '200px']}
					height={['125px', '200px']}
					mt={[2, 6]}
					alt='contact us'
				/>
				<Heading as='h1' mb={6} mt={8}>
					{t('title')}
				</Heading>
				<Text my={4} fontSize='2xl' fontWeight={600}>
					{t('subTitle')}
				</Text>
				<Text my={4} fontSize='2xl' fontWeight={600} color='#3840CE'>
					{t('email')}
				</Text>
			</Flex>
		</Layout>
	)
}
