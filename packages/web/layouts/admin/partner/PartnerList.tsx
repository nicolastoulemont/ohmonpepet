import React, { useState } from 'react'
import partnerJSON from 'statics/admin/partner.json'
import { useI18n } from 'utils/hooks/useI18n'
import { CloseIcon, EditIcon } from '@chakra-ui/icons'
import { Loader } from 'components'
import { capitalizeFirstLetter } from 'utils'
import { GET_PARTNERS } from 'graphql/partners/query'
import {
	useChangePartnerMutation,
	useDeletePartnerMutation,
	useGetPartnersQuery
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
	Input,
	Textarea,
	Image
} from '@chakra-ui/react'

export function PartnerList() {
	const { t } = useI18n(partnerJSON)
	const { data, loading } = useGetPartnersQuery()
	return (
		<Flex
			align='flex-start'
			justify='flex-start'
			flexDir='column'
			height='50vh'
			p={6}
			boxShadow='rgba(0, 0, 0, 0.12) 0px 3px 8px'
			borderRadius='10px'
		>
			<Heading as='h2' size='md' mb={2}>
				{t('partnerListTitle')}
			</Heading>
			{loading && !data && <Loader />}
			<List width='100%' maxH='25vh' overflowX='auto'>
				{data?.partners?.partners?.map((partner) => (
					<PartnerItem key={partner.id} partner={partner} />
				))}
			</List>
		</Flex>
	)
}

const initialValues = {
	name: '',
	description: '',
	websiteUrl: '',
	logoUrl: ''
}

function PartnerItem({ partner }) {
	const [fields, setFields] = useState(partner)
	const { t } = useI18n(partnerJSON)
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

	const [deletePartner, { loading: deleteLoading }] = useDeletePartnerMutation({
		variables: { id: partner.id },
		refetchQueries: [{ query: GET_PARTNERS }]
	})
	const [changePartner, { loading: changeLoading }] = useChangePartnerMutation({
		variables: { id: partner.id, input: fields },
		refetchQueries: [{ query: GET_PARTNERS }]
	})

	async function handleDelete() {
		const { data } = await deletePartner()
		if (data?.deletePartner?.success) {
			onDeleteModalClose()
		}
	}

	async function handleChange() {
		const { data } = await changePartner()
		if (data?.changePartner?.partner) {
			setFields(initialValues)
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
				<Flex flex='1' alignItems='center' justify='flex-start'>
					<Image
						src={partner.logoUrl}
						fallbackSrc={partner.logoUrl}
						width='40px'
						mr={3}
					/>
					<Box>
						<Heading size='sm'>{capitalizeFirstLetter(partner.name)}</Heading>
						<Text fontSize='xs' fontStyle='italic'>
							{capitalizeFirstLetter(partner.description)}
						</Text>
					</Box>
				</Flex>
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
							<FormLabel>{t('addPartnerName')}</FormLabel>
							<Input
								type='text'
								name='name'
								value={fields.name || ''}
								onChange={(e) => setFields({ ...fields, name: e.target.value })}
							/>
						</FormControl>
						<FormControl isRequired my={3}>
							<FormLabel>{t('addPartnerWebsite')}</FormLabel>
							<Input
								type='text'
								name='websiteUrl'
								value={fields.websiteUrl || ''}
								onChange={(e) =>
									setFields({ ...fields, websiteUrl: e.target.value })
								}
							/>
						</FormControl>
						<FormControl isRequired my={3}>
							<FormLabel>{t('addPartnerLogo')}</FormLabel>
							<Input
								type='text'
								name='logoUrl'
								value={fields.logoUrl || ''}
								onChange={(e) => setFields({ ...fields, logoUrl: e.target.value })}
							/>
						</FormControl>
						<FormControl isRequired my={3}>
							<FormLabel>{t('addPartnerDescription')}</FormLabel>
							<Textarea
								type='text'
								name='description'
								value={fields.description || ''}
								onChange={(e) =>
									setFields({ ...fields, description: e.target.value })
								}
							/>
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='blue' mr={3} onClick={onEditModalClose}>
							{t('closeModalBtn')}
						</Button>
						<Button variant='ghost' isLoading={changeLoading} onClick={handleChange}>
							{t('addPartnerBtn')}
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
