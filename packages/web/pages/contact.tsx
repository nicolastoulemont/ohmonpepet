import { Layout } from 'components'
import React from 'react'
import { Flex, Image, Heading, Text } from '@chakra-ui/react'
import contactJSON from 'statics/misc/contact.json'
import { useI18n } from 'utils/hooks/useI18n'

const EMAIL_COLOR = '#3840CE'

export default function Contact() {
	const { t } = useI18n(contactJSON)

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
					src='/img/message.svg'
					fallbackSrc='/img/message.svg'
					width={['125px', '200px']}
					height={['125px', '200px']}
					mt={[2, 6]}
					alt='contact us'
					margin='0 auto'
				/>
				<Heading as='h1' mb={6} mt={8} textAlign={{ base: 'center', md: 'left' }}>
					{t('title')}
				</Heading>
				<Text
					my={2}
					fontSize='xl'
					fontWeight={500}
					textAlign={{ base: 'center', md: 'left' }}
				>
					{t('generalQuestion')}{' '}
					<Text as='span' color={EMAIL_COLOR} fontWeight={600}>
						{t('generalQuestionEmail')}
					</Text>
				</Text>
				<Text
					my={2}
					fontSize='xl'
					fontWeight={500}
					textAlign={{ base: 'center', md: 'left' }}
				>
					{t('dataQuestion')}{' '}
					<Text as='span' color={EMAIL_COLOR} fontWeight={600}>
						{t('dataQuestionEmail')}
					</Text>
				</Text>
			</Flex>
		</Layout>
	)
}
