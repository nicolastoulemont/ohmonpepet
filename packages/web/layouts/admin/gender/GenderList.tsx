import React, { useState } from 'react'
import genderJSON from 'statics/admin/gender.json'
import { useI18n } from 'utils/hooks/useI18n'
import { CloseIcon, EditIcon } from '@chakra-ui/icons'
import { Loader } from 'components'
import { GET_GENDERS } from 'graphql/gender/query'
import { capitalizeFirstLetter } from 'utils'
import {
	useChangeGenderMutation,
	useDeleteGenderMutation,
	useGetGendersQuery
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

export function GenderList() {
	const { t } = useI18n(genderJSON)
	const { data, loading } = useGetGendersQuery()
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
				{t('genderListTitle')}
			</Heading>
			{loading && !data && <Loader />}
			<List width='100%' maxH='25vh' overflowX='auto'>
				{data?.genders?.genders?.map((gender) => (
					<GenderItem key={gender.id} gender={gender} />
				))}
			</List>
		</Flex>
	)
}

const initialValues = { fr: '', en: '' }

function GenderItem({ gender }) {
	const [name, setName] = useState({ fr: gender.name.fr, en: gender.name.en })
	const { t, lang } = useI18n(genderJSON)
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

	const [deleteGender, { loading: deleteLoading }] = useDeleteGenderMutation({
		variables: { id: gender.id },
		refetchQueries: [{ query: GET_GENDERS }]
	})
	const [changeGender, { loading: changeLoading }] = useChangeGenderMutation({
		variables: { id: gender.id, input: { name } },
		refetchQueries: [{ query: GET_GENDERS }]
	})

	async function handleDelete() {
		const { data } = await deleteGender()
		if (data?.deleteGender?.success) {
			onDeleteModalClose()
		}
	}

	async function handleChange() {
		const { data } = await changeGender()
		if (data?.changeGender?.gender) {
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
					<Heading size='sm'>{capitalizeFirstLetter(gender.name[lang])}</Heading>
					<Text fontSize='xs' fontStyle='italic'>
						{t('genderListItemDesc')}
						{capitalizeFirstLetter(gender.name[lang === 'fr' ? 'en' : 'fr'])}
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
							<FormLabel>{t('addGenderLabelFr')}</FormLabel>
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
							<FormLabel>{t('addGenderLabelEn')}</FormLabel>
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
							{t('addGenderBtn')}
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
