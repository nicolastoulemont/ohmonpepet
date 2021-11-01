import React, { useEffect, useState } from 'react'
import { Box, Button, Input, Flex, Text } from '@chakra-ui/react'
import { useI18n } from 'utils/hooks/useI18n'
import profileBookingJSON from 'statics/profileBooking.json'
import { useCreateMessageMutation, useSetAsReadMutation } from 'generated/graphql'
import { useRouter } from 'next/router'
import { format } from 'date-fns'
import {
	GET_CURRENT_USER_PROFILE_OWNER_BOOKINGS,
	GET_CURRENT_USER_PROFILE_SITTER_BOOKINGS
} from 'graphql/booking/query'
import { GET_BOOKING_MESSAGES } from 'graphql/messages/query'

export function Messages({ messages, user, booking, unReadMessages, tabIndex }) {
	const [message, setMessage] = useState('')
	const { t } = useI18n(profileBookingJSON)
	const { query } = useRouter()
	const [setAsRead] = useSetAsReadMutation()
	const [createMessage, { loading }] = useCreateMessageMutation()

	useEffect(() => {
		if (tabIndex === 1 && unReadMessages.length > 0) {
			const isPetOwner = user.profile.id === booking.owner.id
			const queryToRefetch = isPetOwner
				? [
						{
							query: GET_BOOKING_MESSAGES,
							variables: { id: query.id as string },
							fetchPolicy: 'network-only'
						},
						{
							query: GET_CURRENT_USER_PROFILE_OWNER_BOOKINGS,
							fetchPolicy: 'network-only'
						}
				  ]
				: [
						{
							query: GET_BOOKING_MESSAGES,
							variables: { id: query.id as string },
							fetchPolicy: 'network-only'
						},
						{
							query: GET_CURRENT_USER_PROFILE_SITTER_BOOKINGS,
							fetchPolicy: 'network-only'
						}
				  ]
			setAsRead({
				variables: {
					input: { ids: unReadMessages.map((msg) => msg.id), readAt: Date.now() }
				},
				refetchQueries: queryToRefetch
			})
		}
	}, [unReadMessages, tabIndex])

	async function submitMessage(event) {
		event.preventDefault()
		if (!loading && message !== '') {
			await createMessage({
				variables: { input: { content: message, bookingId: query.id as string } }
			})
			setMessage('')
		}
	}

	return (
		<Box width='100%' height='calc(100vh - 290px)' pos='relative'>
			<Box
				width='100%'
				height={['calc(100% - 55px)', 'calc(100% - 55px)', 'calc(100% - 75px)']}
				overflowY='auto'
				borderRadius='10px'
				backgroundColor='gray.50'
				p={{ base: 0, md: 3, lg: 6 }}
				boxSizing='border-box'
			>
				{messages.map((message) => (
					<Message key={message.id} message={message} user={user} />
				))}
			</Box>
			{booking.status !== 'PAID' && booking.status !== 'UNDER_REVIEW' && (
				<Flex
					width='100%'
					align='center'
					justify='flex-start'
					boxSizing='border-box'
					mt='10px'
					as='form'
					onSubmit={submitMessage}
				>
					<Input
						variant='outline'
						placeholder={t('sendPlaceholder')}
						flex='1'
						size='md'
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>

					<Button size='md' ml={2} onClick={submitMessage}>
						{t('send')}
					</Button>
				</Flex>
			)}
		</Box>
	)
}

function Message({ message, user }) {
	if (message.authorId !== user.profile.id) {
		return (
			<Flex
				width='100%'
				align='flex-end'
				justify='flex-end'
				my={1}
				flexDir='column'
				id={message.id}
			>
				<Text
					borderBottomLeftRadius='25px'
					borderTopRightRadius='25px'
					borderTopLeftRadius='25px'
					py={2}
					px={3}
					backgroundColor='gray.200'
					maxWidth='95%'
				>
					{message.content}
				</Text>
				<Text color='gray.500' fontSize='10px' textAlign='right'>
					{format(new Date(message.createdAt), 'dd/MM/yyyy HH:mm')}
				</Text>
			</Flex>
		)
	}

	return (
		<Flex
			width='100%'
			align='flex-start'
			justify='flex-start'
			my={1}
			flexDir='column'
			id={message.id}
		>
			<Box
				width='auto'
				backgroundColor='blue.500'
				borderBottomRightRadius='25px'
				borderTopRightRadius='25px'
				borderTopLeftRadius='25px'
				py={2}
				px={3}
				maxWidth='95%'
			>
				<Text color='white'>{message.content}</Text>
			</Box>
			<Text color='gray.500' fontSize='10px'>
				{format(new Date(message.createdAt), 'dd/MM/yyyy HH:mm')}
			</Text>
		</Flex>
	)
}
