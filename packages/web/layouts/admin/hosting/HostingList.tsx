import React, { useState } from 'react'
import hostingJSON from 'statics/admin/hosting.json'
import { useI18n } from 'utils/hooks/useI18n'
import { CloseIcon, EditIcon } from '@chakra-ui/icons'
import { Loader } from 'components'
import { capitalizeFirstLetter } from 'utils'
import { GET_HOSTINGS } from 'graphql/hosting/query'
import {
	useChangeHostingMutation,
	useDeleteHostingMutation,
	useGetHostingsQuery
} from 'generated/graphql'
import {
	Heading,
	Flex,
	List,
	ListItem,
	Text,
	Box,
	IconButton,
	theme,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Button,
	FormControl,
	FormLabel,
	Input
} from '@chakra-ui/react'

export function HostingList() {
	const { t } = useI18n(hostingJSON)
	const { data, loading } = useGetHostingsQuery()
	return (
		<Flex
			align='flex-start'
			justify='flex-start'
			flexDir='column'
			height='30vh'
			p={6}
			boxShadow='rgba(0, 0, 0, 0.12) 0px 3px 8px'
			borderRadius='10px'
		>
			<Heading as='h2' size='md' mb={2}>
				{t('hostingListTitle')}
			</Heading>
			{loading && !data && <Loader />}
			<List width='100%' maxH='25vh' overflowX='auto'>
				{data?.hostings?.hostings?.map((hosting) => (
					<HostingItem key={hosting.id} hosting={hosting} />
				))}
			</List>
		</Flex>
	)
}

function HostingItem({ hosting }) {
	const [name, setName] = useState({ fr: hosting.name.fr, en: hosting.name.en })
	const { t, lang } = useI18n(hostingJSON)
	const {
		isOpen: isEditModalOpen,
		onOpen: onEditModalOpen,
		onClose: onEditModalClose
	} = useDisclosure()
	const {
		isOpen: isDeleteModalOpen,
		onOpen: onDeleteModalOpen,
		onClose: onDeleteModalClose
	} = useDisclosure()

	const [deleteHosting, { loading: deleteLoading }] = useDeleteHostingMutation({
		variables: { id: hosting.id },
		refetchQueries: [{ query: GET_HOSTINGS }]
	})
	const [changeHosting, { loading: changeLoading }] = useChangeHostingMutation({
		variables: { id: hosting.id, input: { name } },
		refetchQueries: [{ query: GET_HOSTINGS }]
	})

	async function handleDelete() {
		const { data } = await deleteHosting()
		if (data?.deleteHosting?.success) {
			onDeleteModalClose()
		}
	}

	async function handleChange() {
		const { data } = await changeHosting()
		if (data?.changeHosting?.hosting) {
			onEditModalClose()
		}
	}

	return (
		<>
			<ListItem
				my={2}
				px={3}
				py={2}
				borderRadius='10px'
				border='1px solid'
				borderColor='gray.300'
				width='100%'
				display='flex'
				alignItems='flex-start'
				justifyContent='space-between'
			>
				<Box>
					<Heading size='sm'>{capitalizeFirstLetter(hosting.name[lang])}</Heading>
					<Text fontSize='xs' fontStyle='italic'>
						{t('hostingListItemDesc')}
						{capitalizeFirstLetter(hosting.name[lang === 'fr' ? 'en' : 'fr'])}
					</Text>
				</Box>
				<Box>
					<IconButton
						aria-label='button'
						bgColor='white'
						_hover={{ bgColor: theme.colors.blue['50'] }}
						icon={
							<EditIcon color={theme.colors.blue['500']} width='15px' height='15px' />
						}
						isRound
						isLoading={false}
						onClick={onEditModalOpen}
						mr={1}
					/>
					<IconButton
						aria-label='button'
						bgColor='white'
						_hover={{ bgColor: theme.colors.red['50'] }}
						icon={
							<CloseIcon color={theme.colors.red['500']} width='15px' height='15px' />
						}
						isRound
						isLoading={false}
						onClick={onDeleteModalOpen}
					/>
				</Box>
			</ListItem>
			<Modal isOpen={isEditModalOpen} onClose={onEditModalClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{t('editModalTitle')}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FormControl isRequired my={3}>
							<FormLabel>{t('addHostingLabelFr')}</FormLabel>
							<Input
								type='text'
								name='name.fr'
								value={name.fr || ''}
								onChange={(e) =>
									setName((name) => ({ ...name, fr: e.target.value }))
								}
							/>
						</FormControl>
						<FormControl isRequired my={3}>
							<FormLabel>{t('addHostingLabelEn')}</FormLabel>
							<Input
								type='text'
								name='name.en'
								value={name.en || ''}
								onChange={(e) =>
									setName((name) => ({ ...name, en: e.target.value }))
								}
							/>
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='blue' mr={3} onClick={onEditModalClose}>
							{t('closeModalBtn')}
						</Button>
						<Button variant='ghost' isLoading={changeLoading} onClick={handleChange}>
							{t('addHostingBtn')}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
			<Modal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{t('deleteModalTitle')}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>{t('deleteModalMessage')}</ModalBody>
					<ModalFooter>
						<Button colorScheme='blue' mr={3} onClick={onDeleteModalClose}>
							{t('closeModalBtn')}
						</Button>
						<Button variant='ghost' isLoading={deleteLoading} onClick={handleDelete}>
							{t('deleteModalTitle')}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}
