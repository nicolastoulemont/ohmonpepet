import React, { useState } from 'react'
import serviceJSON from 'statics/admin/service.json'
import { useI18n } from 'utils/hooks/useI18n'
import { CloseIcon, EditIcon } from '@chakra-ui/icons'
import { Loader } from 'components'
import { GET_SERVICES } from 'graphql/service/query'
import { capitalizeFirstLetter } from 'utils'
import {
	useChangeServiceMutation,
	useDeleteServiceMutation,
	useGetServicesQuery
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

export function ServiceList() {
	const { t } = useI18n(serviceJSON)
	const { data, loading } = useGetServicesQuery()
	return (
		<Flex
			align='flex-start'
			justify='flex-start'
			flexDir='column'
			height='auto'
			p={6}
			boxShadow='rgba(0, 0, 0, 0.12) 0px 3px 8px'
			borderRadius='10px'
		>
			<Heading as='h2' size='md' mb={2}>
				{t('serviceListTitle')}
			</Heading>
			{loading && !data && <Loader />}
			<List width='100%' maxH='80%' overflowX='auto'>
				{data?.services?.services?.map((service) => (
					<ServiceItem key={service.id} service={service} />
				))}
			</List>
		</Flex>
	)
}

function ServiceItem({ service }) {
	const [name, setName] = useState({ fr: service.name.fr, en: service.name.en })
	const [alternateName, setAlternateName] = useState({
		fr: service.alternateName?.fr,
		en: service.alternateName?.en
	})

	const [queryKey, setQueryKey] = useState(service.queryKey)
	const { t, lang } = useI18n(serviceJSON)
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

	const [deleteService, { loading: deleteLoading }] = useDeleteServiceMutation({
		variables: { id: service.id },
		refetchQueries: [{ query: GET_SERVICES }]
	})
	const [changeService, { loading: changeLoading }] = useChangeServiceMutation({
		variables: { id: service.id, input: { name, alternateName, queryKey } },
		refetchQueries: [{ query: GET_SERVICES }]
	})

	async function handleDelete() {
		const { data } = await deleteService()
		if (data?.deleteService?.success) {
			onDeleteModalClose()
		}
	}

	async function handleChange() {
		const { data } = await changeService()
		if (data?.changeService?.service) {
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
					<Heading size='sm'>{capitalizeFirstLetter(service.name[lang])}</Heading>
					<Text fontSize='xs' fontStyle='italic'>
						{t('serviceListItemDesc')}
						{capitalizeFirstLetter(service.name[lang === 'fr' ? 'en' : 'fr'])}
					</Text>
					{service.alternateName ? (
						<Text fontSize='xs' fontStyle='italic'>
							{t('serviceListItemDesc')}
							{capitalizeFirstLetter(
								service.alternateName[lang === 'fr' ? 'en' : 'fr']
							)}
						</Text>
					) : null}

					<Text fontSize='xs' fontStyle='italic'>
						{t('addServiceQueryKey')} {` : `}
						{service.queryKey}
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
							<FormLabel>{t('addServiceLabelFr')}</FormLabel>
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
							<FormLabel>{t('addServiceLabelEn')}</FormLabel>
							<Input
								type='text'
								name='name.en'
								value={name.en || ''}
								onChange={(e) =>
									setName((name) => ({ ...name, en: e.target.value }))
								}
							/>
						</FormControl>
						<FormControl my={3}>
							<FormLabel>{t('addServiceLabelAlternateFr')}</FormLabel>
							<Input
								type='text'
								name='alternateName.fr'
								value={alternateName.fr || ''}
								onChange={(e) =>
									setAlternateName((alternateName) => ({
										...alternateName,
										fr: e.target.value
									}))
								}
							/>
						</FormControl>
						<FormControl my={3}>
							<FormLabel>{t('addServiceLabelAlternateEn')}</FormLabel>
							<Input
								type='text'
								name='alternateName.en'
								value={alternateName.en || ''}
								onChange={(e) =>
									setAlternateName((alternateName) => ({
										...alternateName,
										en: e.target.value
									}))
								}
							/>
						</FormControl>
						<FormControl isRequired my={3}>
							<FormLabel>{t('addServiceQueryKey')}</FormLabel>
							<Input
								type='text'
								name='queryKey'
								value={queryKey}
								onChange={(e) => setQueryKey(e.target.value)}
							/>
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='blue' mr={3} onClick={onEditModalClose}>
							{t('closeModalBtn')}
						</Button>
						<Button variant='ghost' isLoading={changeLoading} onClick={handleChange}>
							{t('addServiceBtn')}
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
