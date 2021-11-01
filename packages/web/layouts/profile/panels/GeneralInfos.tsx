import React, { useEffect, useRef, useState } from 'react'
import { useI18n } from 'utils/hooks/useI18n'
import profileJson from 'statics/profile.json'
import {
	AddressInputPolyvalent,
	MultiSelect,
	UniqueDayPicker,
	UniqueDayPickerMobile
} from 'components'
import { ImageInput } from 'components'
import { format } from 'date-fns'
import { fr, enUS } from 'date-fns/locale'
import axios from 'axios'
import { useClickAway } from 'react-use'
import { borderRadius } from 'theme/colors'
import { CURRENT_USER_PROFILE, CURRENT_USER_PROFILE_PICTURES } from 'graphql/profile/query'
import { OtherImage } from './OtherImage'
import { isMobile } from 'react-device-detect'
import {
	Heading,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Box,
	Button,
	Select,
	FormHelperText,
	useToast,
	Image,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	DrawerHeader,
	DrawerBody
} from '@chakra-ui/react'
import {
	useHandleProfileMutation,
	useSaveToStorageMutation,
	Profile,
	useAddPictureUrlToProfileMutation
} from 'generated/graphql'
interface InfosFormProps {
	state: { [key: string]: any }
	setState: React.Dispatch<
		React.SetStateAction<{
			[key: string]: any
		}>
	>
	errors: { [key: string]: string }
	setErrors: React.Dispatch<
		React.SetStateAction<{
			[key: string]: string
		}>
	>
	languagesOptions: any
	gendersOptions: any
	profilePictures: {
		__typename?: 'Profile'
	} & Pick<Profile, 'id' | 'pictureUrl' | 'isPetSitter' | 'otherPictureUrls'>
}

export function GeneralInfos({
	state,
	setState,
	errors,
	setErrors,
	languagesOptions,
	gendersOptions,
	profilePictures
}: InfosFormProps) {
	const toast = useToast()
	const [file, setFile] = useState<File>(null)
	const [dateInputValue, setDateInputValue] = useState('')
	const [showDayPicker, setShowDayPicker] = useState(false)
	const { t, lang } = useI18n(profileJson)
	const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()
	const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure()
	const {
		isOpen: isDayPickerDrawerOpen,
		onOpen: onDayPickerDrawerOpen,
		onClose: onDayPickerDrawerClose
	} = useDisclosure()

	const containerRef = useRef<HTMLDivElement>(null)
	useClickAway(containerRef, () => setShowDayPicker(false))
	const showMobileDrawer = isMobile

	useEffect(() => {
		if (state.birthDate) {
			setDateInputValue(
				format(new Date(state.birthDate), 'dd LLLL yyyy', {
					locale: lang === 'fr' ? fr : enUS
				})
			)
		}
	}, [state, lang])

	function handleChange(e: React.ChangeEvent<any>) {
		const { name, value } = e.target
		setErrors({ ...errors, [name]: undefined })
		setState({ ...state, [name]: value })
	}

	const [saveToStorage] = useSaveToStorageMutation()
	const [handleProfile] = useHandleProfileMutation()
	const [addPictureUrlToProfile] = useAddPictureUrlToProfileMutation()

	async function handleFiles() {
		if (file) {
			const { data } = await saveToStorage({
				variables: { fileName: `avatars/${file.name}`, fileType: file.type }
			})

			if (data.saveToStorage.signedRequest && data.saveToStorage.url) {
				const { signedRequest, url } = data.saveToStorage
				await axios.put(signedRequest, file, { headers: { 'Content-Type': file.type } })
				return url
			}
		} else if (state.pictureUrl && state.pictureUrl !== '') {
			return state.pictureUrl
		}
	}

	async function addPictureToProfile(file: File) {
		if (!file) return

		const { data } = await saveToStorage({
			variables: { fileName: `avatars/${file.name}`, fileType: file.type }
		})
		if (!data.saveToStorage.signedRequest || !data.saveToStorage.url) return

		const { signedRequest, url } = data.saveToStorage
		await axios.put(signedRequest, file, { headers: { 'Content-Type': file.type } })
		await addPictureUrlToProfile({
			variables: { pictureUrl: url },
			refetchQueries: [{ query: CURRENT_USER_PROFILE_PICTURES }]
		})
		setFile(null)
		showMobileDrawer ? onDrawerClose() : onModalClose()
	}

	async function saveProfile() {
		const { data } = await handleProfile({
			variables: {
				input: {
					...state,
					pictureUrl: await handleFiles()
				}
			},
			refetchQueries: [{ query: CURRENT_USER_PROFILE }]
		})
		if (data?.handleProfile.profile) {
			toast({
				position: 'top',
				title: t('saveProfileSuccessTitle'),
				status: 'success',
				duration: 9000,
				isClosable: true
			})
		} else if (data?.handleProfile.errors) {
			toast({
				position: 'top',
				title: t('saveProfileErrorTitle'),
				status: 'error',
				duration: 9000,
				isClosable: true
			})
		}
	}

	function handleBirthDateClick() {
		if (isMobile) {
			onDayPickerDrawerOpen()
		} else {
			setShowDayPicker(true)
		}
	}

	return (
		<>
			<Heading mb={6}>{t('createProfileHeading')}</Heading>
			<Flex
				as='form'
				justify='space-between'
				align='flex-start'
				flexDir={{ base: 'column-reverse', xl: 'row' }}
				width='100%'
				autoComplete='off'
				onSubmit={saveProfile}
			>
				<Box width={{ base: '100%', xl: '66%' }}>
					<Flex mb={[0, 0, 6]} flexDirection={{ base: 'column', lg: 'row' }}>
						<FormControl flex='1' mb={[6, 6, 0]} mr={[0, 0, 2]} isRequired>
							<FormLabel htmlFor='firstName'>{t('firstNameLabel')}</FormLabel>
							<Input
								type='text'
								id='firstName'
								name='firstName'
								value={state['firstName'] || ''}
								aria-describedby='first Name'
								variant='outline'
								onChange={handleChange}
								isInvalid={!!errors['firstName']}
							/>
							<FormHelperText>{t('mandatorySitterField')}</FormHelperText>
						</FormControl>
						<FormControl flex='1' mb={[6, 6, 0]} ml={[0, 0, 2]} isRequired>
							<FormLabel htmlFor='lastName'>{t('lastNameLabel')}</FormLabel>
							<Input
								type='text'
								id='lastName'
								name='lastName'
								value={state['lastName'] || ''}
								aria-describedby='last Name'
								variant='outline'
								onChange={handleChange}
								isInvalid={!!errors['lastName']}
							/>
							<FormHelperText>{t('mandatorySitterField')}</FormHelperText>
						</FormControl>
					</Flex>
					<Flex mb={[0, 0, 6]} flexDirection={['column', 'column', 'row']}>
						<FormControl flex='1' mb={[6, 6, 0]} mr={[0, 0, 2]} isRequired>
							<FormLabel htmlFor='genderId'>{t('genderLabel')}</FormLabel>
							<Select
								id='genderId'
								name='genderId'
								value={state['genderId'] || ''}
								aria-describedby='gender'
								variant='outline'
								onChange={handleChange}
								isInvalid={!!errors['genderId']}
								placeholder={t('genderPlaceholder')}
							>
								{gendersOptions.map((gender) => (
									<option key={gender.key} value={gender.value}>
										{gender.text}
									</option>
								))}
							</Select>
							<FormHelperText>{t('mandatorySitterField')}</FormHelperText>
						</FormControl>
						<FormControl
							flex='1'
							mb={[6, 6, 0]}
							ml={[0, 0, 2]}
							isRequired
							ref={containerRef}
						>
							<FormLabel htmlFor='birthDate'>{t('birthDateLabel')}</FormLabel>
							<Input
								type='text'
								id='birthDate'
								variant='outline'
								value={dateInputValue}
								isReadOnly={!errors['birthDate']}
								_hover={{ cursor: 'pointer' }}
								onClick={handleBirthDateClick}
								onFocus={() => {
									if (!isMobile) {
										!showDayPicker && setShowDayPicker(true)
									}
								}}
								fontWeight={600}
								isInvalid={!!errors['birthDate']}
							/>
							{showDayPicker && (
								<UniqueDayPicker
									state={state}
									setState={setState}
									setErrors={setErrors}
									closeFn={() => setShowDayPicker(false)}
									name='birthDate'
								/>
							)}
							{!showDayPicker && (
								<FormHelperText>{t('mandatorySitterField')}</FormHelperText>
							)}
							<UniqueDayPickerMobile
								state={state}
								setState={setState}
								setErrors={setErrors}
								closeFn={() => setShowDayPicker(false)}
								name='birthDate'
								label={t('birthDateLabel')}
								onDrawerClose={onDayPickerDrawerClose}
								isDrawerOpen={isDayPickerDrawerOpen}
							/>
						</FormControl>
					</Flex>
					<Flex mb={[0, 0, 6]} flexDirection={['column', 'column', 'row']}>
						<FormControl flex='1' mb={[6, 6, 0]} mr={[0, 0, 2]} isRequired>
							<FormLabel htmlFor='phoneNumber'>{t('phoneNumberLabel')}</FormLabel>
							<Input
								type='tel'
								inputMode='tel'
								id='phoneNumber'
								name='phoneNumber'
								value={state['phoneNumber'] || ''}
								aria-describedby='phoneNumber'
								variant='outline'
								onChange={handleChange}
								isInvalid={!!errors['phoneNumber']}
							/>
							<FormHelperText>{t('mandatorySitterField')}</FormHelperText>
						</FormControl>
						<MultiSelect
							name='languagesIds'
							placeholder={t('languagesLabel')}
							options={languagesOptions}
							state={state['languagesIds']}
							setState={setState}
							setErrors={setErrors}
							errors={errors}
							type='text'
							label={t('languagesLabel')}
							containerWidth='100%'
							styles={{ ml: [0, 0, 2], mb: [6, 6, 0] }}
							withIcon
							required
							showHelper={false}
							helperText={t('mandatorySitterField')}
						/>
					</Flex>
					<AddressInputPolyvalent
						parentState={state}
						setParentState={setState}
						setErrors={setErrors}
						address={state['address']}
						location={state['location']}
						label={t('ownAddressLabel')}
						isRequired={true}
						isInvalid={!!errors['address']}
						helperText={t('mandatorySitterField')}
					/>
				</Box>
				<Flex
					width={{ base: '100%', xl: '30%' }}
					mb={{ base: 6, xl: 0 }}
					align={{ base: 'flex-start', sm: 'stretch', xl: 'flex-start' }}
					justify={{ base: 'center', sm: 'space-between', xl: 'center' }}
					flexDir={{ base: 'column', sm: 'row', xl: 'column' }}
				>
					<FormControl
						isRequired
						mb={{ base: 3, sm: 0, xl: 3 }}
						width={
							profilePictures?.otherPictureUrls?.length > 0
								? { base: '100%', sm: '55%', md: '40%', xl: '100%' }
								: '100%'
						}
					>
						{' '}
						<FormLabel>{t('profilePicture')}</FormLabel>
						{profilePictures?.pictureUrl && profilePictures.pictureUrl !== '' && (
							<Image
								width={330}
								height={330}
								borderRadius={borderRadius}
								src={profilePictures.pictureUrl}
								fallbackSrc={profilePictures.pictureUrl}
								mb={{ base: 3, sm: 0, xl: 3 }}
								alt='User profile picture'
							/>
						)}
						<FormHelperText textAlign='left'>
							{t('mandatorySitterField')}
						</FormHelperText>
						{profilePictures?.otherPictureUrls?.length === 0 && (
							<Button
								onClick={() => (showMobileDrawer ? onDrawerOpen() : onModalOpen())}
								colorScheme='blue'
								mt={3}
								alignSelf='flex-start'
							>
								{t('addPictureBtn')}
							</Button>
						)}
					</FormControl>
					{profilePictures?.otherPictureUrls?.length > 0 && (
						<Flex
							flexDir='column'
							justify={{ base: 'center', sm: 'space-between', xl: 'center' }}
							width={{ base: '100%', sm: '40%', md: '55%', xl: '100%' }}
						>
							<Box>
								<FormLabel textAlign={{ base: 'left', sm: 'right', xl: 'left' }}>
									{t('otherPictures')}
								</FormLabel>
								<Flex
									width='100%'
									wrap='wrap'
									justifyContent={{
										base: 'flex-start',
										sm: 'flex-end',
										xl: 'flex-start'
									}}
								>
									{profilePictures.otherPictureUrls.map((url, index) => (
										<OtherImage
											key={`${profilePictures.id}-${index}`}
											url={url}
											index={index}
										/>
									))}
								</Flex>
							</Box>
							{profilePictures.otherPictureUrls.length < 2 ? (
								<Button
									onClick={() =>
										showMobileDrawer ? onDrawerOpen() : onModalOpen()
									}
									colorScheme='blue'
									mt={3}
									alignSelf={{
										base: 'flex-start',
										sm: 'flex-end',
										xl: 'flex-start'
									}}
								>
									{t('addPictureBtn')}
								</Button>
							) : null}
						</Flex>
					)}
				</Flex>
			</Flex>
			<Flex width={{ base: '100%', lg: '66%' }} align='center' justify='flex-end' mt={6}>
				<Button onClick={saveProfile} colorScheme='red'>
					{t('saveProfile')}
				</Button>
			</Flex>
			<Modal isOpen={isModalOpen} onClose={onModalClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{t('addPictureTitle')}</ModalHeader>
					<ModalCloseButton />
					<ModalBody p={6}>
						<ImageInput
							setFile={setFile}
							isInvalid={!!errors['pictureUrl']}
							setErrors={setErrors}
							callBackFn={addPictureToProfile}
						/>
					</ModalBody>
				</ModalContent>
			</Modal>
			<Drawer isOpen={isDrawerOpen} placement='bottom' onClose={onDrawerClose}>
				<DrawerOverlay>
					<DrawerContent>
						<DrawerHeader>{t('addPictureTitle')}</DrawerHeader>
						<DrawerCloseButton />
						<DrawerBody>
							<ImageInput
								isMobile={showMobileDrawer}
								setFile={setFile}
								isInvalid={!!errors['pictureUrl']}
								setErrors={setErrors}
								callBackFn={addPictureToProfile}
							/>
						</DrawerBody>
					</DrawerContent>
				</DrawerOverlay>
			</Drawer>
		</>
	)
}
