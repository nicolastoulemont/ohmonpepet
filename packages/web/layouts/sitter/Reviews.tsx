import React from 'react'
import { Box, Flex, Heading, Text, Image, Grid } from '@chakra-ui/react'
import { IoIosStar } from 'react-icons/io'
import { format } from 'date-fns'
import { fr, enUS } from 'date-fns/locale'
import { useI18n } from 'utils/hooks/useI18n'

export function Reviews({ reviews }) {
	return (
		<Grid
			templateColumns={{ base: 'repeat(1,1fr)', md: 'repeat(2,1fr)' }}
			gap={6}
			my={6}
			maxH={{ base: '400px', md: '600px' }}
			overflow={{ base: 'scroll', md: 'scroll' }}
		>
			{reviews.map((review) => (
				<Review key={review.id} review={review} />
			))}
		</Grid>
	)
}

function Review({ review }) {
	const { lang } = useI18n()
	return (
		<Flex
			width='100%'
			align='flex-start'
			justify='space-between'
			boxShadow='rgba(0, 0, 0, 0.1) 0px 3px 8px'
			p={6}
			borderRadius='10px'
		>
			<Box maxW='75%'>
				<Flex align='center' justify='flex-start' mb={3}>
					{[...Array(Math.floor(review.rating)).keys()].map((star, index) => (
						<IoIosStar color='#ECC94B' fontSize='20px' key={`${index}${star}`} />
					))}
				</Flex>
				<Heading as='h3' size='md' mb={3}>
					{review.title}
				</Heading>
				{review.body && <Text fontSize='sm'>{review.body}</Text>}
				<Text fontSize='xs' fontStyle='italic'>
					{format(new Date(review.createdAt), 'd LLL yyyy', {
						locale: lang === 'fr' ? fr : enUS
					})}
				</Text>
			</Box>
			<Box>
				{review.author.pictureUrl && (
					<Image
						src={review.author.pictureUrl}
						fallbackSrc={review.author.pictureUrl}
						borderRadius='10px'
						width='80px'
						objectFit='cover'
						alt='user picture'
					/>
				)}
			</Box>
		</Flex>
	)
}
