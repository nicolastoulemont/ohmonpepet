import React, { useState } from 'react'
import languageJSON from 'statics/admin/language.json'
import { useI18n } from 'utils/hooks/useI18n'
import { CloseIcon, EditIcon } from '@chakra-ui/icons'
import { Loader } from 'components'
import { GET_LANGUAGES } from 'graphql/language/query'
import { capitalizeFirstLetter } from 'utils'
import {
	useChangeLanguageMutation,
	useDeleteLanguageMutation,
	useGetLanguagesQuery
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

export function LanguageList() {
	const { t } = useI18n(languageJSON)
	const { data, loading } = useGetLanguagesQuery()
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
				{t('languageListTitle')}
			</Heading>
			{loading && !data && <Loader />}
			<List width='100%' maxH='25vh' overflowX='auto'>
				{data?.languages?.languages?.map((language) => (
					<LanguageItem key={language.id} language={language} />
				))}
			</List>
		</Flex>
	)
}

function LanguageItem({ language }) {
	const [name, setName] = useState({ fr: language.name.fr, en: language.name.en })
	const { t, lang } = useI18n(languageJSON)
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

	const [deleteLanguage, { loading: deleteLoading }] = useDeleteLanguageMutation({
		variables: { id: language.id },
		refetchQueries: [{ query: GET_LANGUAGES }]
	})
	const [changeLanguage, { loading: changeLoading }] = useChangeLanguageMutation({
		variables: { id: language.id, input: { name } },
		refetchQueries: [{ query: GET_LANGUAGES }]
	})

	async function handleDelete() {
		const { data } = await deleteLanguage()
		if (data?.deleteLanguage?.success) {
			onDeleteModalClose()
		}
	}

	async function handleChange() {
		const { data } = await changeLanguage()
		if (data?.changeLanguage?.language) {
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
					<Heading size='sm'>{capitalizeFirstLetter(language.name[lang])}</Heading>
					<Text fontSize='xs' fontStyle='italic'>
						{t('languageListItemDesc')}
						{capitalizeFirstLetter(language.name[lang === 'fr' ? 'en' : 'fr'])}
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
							<FormLabel>{t('addLanguageLabelFr')}</FormLabel>
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
							<FormLabel>{t('addLanguageLabelEn')}</FormLabel>
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
							{t('addLanguageBtn')}
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
