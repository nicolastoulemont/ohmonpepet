import { ListItem, ListIcon, Flex, Box, Heading, Text, IconButton } from '@chakra-ui/react'
import { CheckIcon, CloseIcon, NotAllowedIcon } from '@chakra-ui/icons'
import { isType } from 'gql-typeguards'
import {
	useChangeUserStatusMutation,
	UserStatus,
	BannedUser,
	DeletedUser,
	ActiveUser
} from '@ohmonpepet/data'

interface UserListItemProps {
	user: ActiveUser | DeletedUser | BannedUser
	children?: React.ReactNode
}

export function UserListItem({ user, children }: UserListItemProps) {
	const [result, changeUserStatus] = useChangeUserStatusMutation()
	const icon =
		user.status === 'ACTIVE'
			? { name: CheckIcon, color: 'green.500' }
			: user.status === 'DELETED'
			? { name: CloseIcon, color: 'orange.500' }
			: user.status === 'BANNED'
			? { name: NotAllowedIcon, color: 'red.500' }
			: null

	async function changeStatus(status: UserStatus) {
		await changeUserStatus({
			id: user.id,
			status
		})
	}

	return (
		<ListItem
			listStyleType='none'
			my={2}
			p={3}
			display='flex'
			alignItems='flex-start'
			justifyContent='flex-start'
			borderRadius='10px'
			bgColor='gray.50'
			_hover={{ bgColor: 'gray.100' }}
			width='100%'
			role={user.status}
			aria-describedby={
				isType(user, 'ActiveUser')
					? 'Active User'
					: isType(user, 'DeletedUser')
					? 'Deleted User'
					: isType(user, 'BannedUser')
					? 'Banned User'
					: null
			}
		>
			{icon && <ListIcon as={icon.name} color={icon.color} mt={1} mr={3} />}
			<Box flex='1'>
				<Heading size='md'>{user.name}</Heading>
				{isType(user, 'ActiveUser') ? <Text size='sm'>{user.email}</Text> : null}
				{children}
			</Box>
			<Flex>
				{user.status === 'ACTIVE' ? (
					<>
						<IconButton
							aria-label='Delete user'
							icon={<CloseIcon />}
							size='sm'
							colorScheme='orange'
							onClick={() => changeStatus('DELETED' as UserStatus.Deleted)}
						/>
						<IconButton
							aria-label='Ban user'
							icon={<NotAllowedIcon />}
							size='sm'
							ml={1}
							colorScheme='red'
							onClick={() => changeStatus('BANNED' as UserStatus.Banned)}
						/>
					</>
				) : null}
				{user.status === 'DELETED' ? (
					<>
						<IconButton
							aria-label='UnDelete user'
							icon={<CheckIcon />}
							colorScheme='green'
							size='sm'
							onClick={() => changeStatus('ACTIVE' as UserStatus.Active)}
						/>
						<IconButton
							aria-label='Ban user'
							icon={<NotAllowedIcon />}
							size='sm'
							ml={1}
							colorScheme='red'
							onClick={() => changeStatus('BANNED' as UserStatus.Banned)}
						/>
					</>
				) : null}
				{user.status === 'BANNED' ? (
					<>
						<IconButton
							aria-label='Delete user'
							icon={<CloseIcon />}
							size='sm'
							colorScheme='orange'
							onClick={() => changeStatus('DELETED' as UserStatus.Deleted)}
						/>
						<IconButton
							aria-label='Unban user'
							icon={<CheckIcon />}
							size='sm'
							ml={1}
							colorScheme='green'
							onClick={() => changeStatus('ACTIVE' as UserStatus.Active)}
						/>
					</>
				) : null}
			</Flex>
		</ListItem>
	)
}
