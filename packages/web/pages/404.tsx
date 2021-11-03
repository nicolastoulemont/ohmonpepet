import { Layout } from 'components'
import React from 'react'
import { Flex, Image, Heading, Link } from '@chakra-ui/react'
import errorsJSON from 'statics/errors.json'
import { useI18n } from 'utils/hooks/useI18n'
import NextLink from 'next/link'

export default function Page404() {
	const { t } = useI18n(errorsJSON)

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
					src='/img/warning.svg'
					width={['125px', '200px']}
					height={['125px', '200px']}
					mt={[2, 6]}
					alt={t('title')}
				/>
				<Heading as='h1' mb={6} mt={8}>
					{t('title')}
				</Heading>
				<NextLink href='/' passHref>
					<Link color='blue.600' fontWeight={600} textDecoration='underline'>
						{t('linkBack')}
					</Link>
				</NextLink>
			</Flex>
		</Layout>
	)
}
