import onBoardingPersonalJSON from 'statics/onboarding/personal.json'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useI18n } from 'utils/hooks/useI18n'
import { listAsOptions, removeTypename, stringToTyped } from 'utils'
import axios from 'axios'
import { CURRENT_USER_PROFILE } from 'graphql/profile/query'
import { format } from 'date-fns'
import { fr, enUS } from 'date-fns/locale'
import { initializeApollo } from 'lib'
import { GET_LANGUAGES } from 'graphql/language/query'
import { GET_GENDERS } from 'graphql/gender/query'
import { validateFields } from 'utils/errors'
import { isMobile } from 'react-device-detect'
import { personalNeededFields } from 'layouts/onboarding/shared'
import { useClickAway } from 'react-use'
import {
	useCurrentUserQuery,
	useHandleProfileMutation,
	useProfileByCurrentUserIdQuery,
	useSaveToStorageMutation
} from 'generated/graphql'
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Select,
	useDisclosure
} from '@chakra-ui/react'
import {
	AddressInputPolyvalent,
	ImageInput,
	Layout,
	MultiSelect,
	UniqueDayPicker,
	UniqueDayPickerMobile
} from 'components'

export async function getStaticProps({ locale }: { locale: 'en' | 'fr' }) {
	const apolloClient = initializeApollo()

	const queries = [GET_LANGUAGES, GET_GENDERS].map(async (query) => {
		const { data } = await apolloClient.query({
			query
		})
		return data
	})
	const [{ languages }, { genders }] = await Promise.all(queries)

	const gendersOptions = listAsOptions(genders.genders, locale) || []
	const languagesOptions = listAsOptions(languages?.languages, locale) || []

	return {
		props: {
			languagesOptions,
			gendersOptions
		}
	}
}

export default function OnBoardingPersonalInfos({ languagesOptions, gendersOptions }) {
	const [state, setState] = useState<{ [key: string]: any }>({})
	const [errors, setErrors] = useState<{ [key: string]: string }>({})
	const [file, setFile] = useState<File>(null)
	const [dateInputValue, setDateInputValue] = useState('')
	const [showDayPicker, setShowDayPicker] = useState(false)
	const {
		isOpen: isDayPickerDrawerOpen,
		onOpen: onDayPickerDrawerOpen,
		onClose: onDayPickerDrawerClose
	} = useDisclosure()
	const { t, lang } = useI18n(onBoardingPersonalJSON)
	const { push } = useRouter()
	const { data: user } = useCurrentUserQuery()
	const { data: profile } = useProfileByCurrentUserIdQuery()

	const containerRef = useRef<HTMLDivElement>(null)
	useClickAway(containerRef, () => setShowDayPicker(false))
	useEffect(() => {
		if (profile?.profileByCurrentUserId.profile) {
			setState({ ...state, ...removeTypename(profile?.profileByCurrentUserId.profile) })
		}
	}, [profile])

	useEffect(() => {
		if (user?.currentUser.__typename === 'UserAuthenticationError') {
			push({
				pathname: '/onboarding',
				query: { panel: 'signin', src: 'onboarding' }
			})
		}
	}, [user])

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
		const { name, value } = stringToTyped(e)
		setErrors({ ...errors, [name]: undefined })
		setState({ ...state, [name]: value })
	}

	const [saveToStorage] = useSaveToStorageMutation()
	const [handleProfile] = useHandleProfileMutation()

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

	async function saveProfile() {
		const { valid } = validateFields(personalNeededFields, state, setErrors)
		if (!file && !state['pictureUrl'])
			setErrors((errors) => ({ ...errors, pictureUrl: 'Obligatoire' }))
		if (valid && (file || state['pictureUrl'])) {
			const { data } = await handleProfile({
				variables: {
					input: {
						...state,
						pictureUrl: file ? await handleFiles() : state['pictureUrl']
					}
				},
				refetchQueries: [{ query: CURRENT_USER_PROFILE }]
			})
			data.handleProfile.profile && push('/onboarding/hosting')
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
		<Layout>
			<Box
				width='100%'
				height={['auto', 'auto', 'calc(100vh - 98px)']}
				pb={[6, 6, 0]}
				boxSizing='border-box'
				overflowY='hidden'
			>
				<Heading as='h1' my={6}>
					{t('title')}
				</Heading>
				<Flex
					justify='space-between'
					align='flex-start'
					flexDir={['column-reverse', 'column-reverse', 'row']}
					width='100%'
				>
					<Box width={['100%', '100%', '66%']}>
						<Flex mb={[0, 0, 6]} flexDirection={['column', 'column', 'row']}>
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
						/>
					</Box>
					<Flex
						width={['100%', '100%', '30%']}
						mb={[6, 6, 0]}
						align='center'
						justify='center'
					>
						<FormControl isRequired mb={3} width='100%'>
							<FormLabel>{t('profilePicture')}</FormLabel>
							<ImageInput
								setFile={setFile}
								externalImageSource={state['pictureUrl']}
								isInvalid={!!errors['pictureUrl']}
								setErrors={setErrors}
							/>
						</FormControl>
					</Flex>
				</Flex>
				<Flex width={['100%', '100%', '66%']} align='center' justify='flex-end' my={6}>
					<Button onClick={saveProfile} colorScheme='red'>
						{t('personalBtn')}
					</Button>
				</Flex>
			</Box>
		</Layout>
	)
}
