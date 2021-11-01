import React from 'react'
import { useI18n } from 'utils/hooks/useI18n'
import profileJson from 'statics/profile.json'
import { stringToTyped } from 'utils'
import { CURRENT_USER_PROFILE } from 'graphql/profile/query'
import { useHandleProfileMutation } from 'generated/graphql'
import { ToOnBoardingModal } from '../ToOnBoardingModal'
import { useRouter } from 'next/router'
import Hosting from './Hosting'
import Rates from './Rates'
import ExtraServices from './ExtraServices'
import Partners from './Partners'
import Availability from './Availability'
import {
	Heading,
	List,
	ListItem,
	Flex,
	FormControl,
	FormLabel,
	Textarea,
	FormHelperText,
	Box,
	Button,
	useToast
} from '@chakra-ui/react'

type ListOption = {
	iconUrl: string | null
	key: string
	text: string
	value: string
}
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
	speciesOptions: Array<ListOption>
	hostingsOptions: Array<ListOption>
	partnersOptions: Array<ListOption>
	partnersLookUp: object
}

export function SitterInfos({
	state,
	setState,
	errors,
	setErrors,
	speciesOptions,
	hostingsOptions,
	partnersOptions,
	partnersLookUp
}: InfosFormProps) {
	const { t } = useI18n(profileJson)
	const { query } = useRouter()
	const [handleProfile] = useHandleProfileMutation()
	const toast = useToast()

	function handleChange(e: React.ChangeEvent<any>) {
		const { name, value } = stringToTyped(e)
		setErrors({ ...errors, [name]: undefined })
		setState({ ...state, [name]: value })
	}

	function handleCheckBoxes(name: string, checked: boolean) {
		setErrors({ ...errors, [name]: undefined })
		setState({ ...state, [name]: checked })
	}

	async function saveProfile() {
		const { data } = await handleProfile({
			variables: {
				input: {
					...state
				}
			},
			refetchQueries: [{ query: CURRENT_USER_PROFILE }]
		})
		if (data?.handleProfile.profile) {
			toast({
				position: 'top',
				title: t('saveProfileSuccessTitle'),
				description: data.handleProfile.profile.isPetSitter
					? t('saveProfileisPetSitter')
					: undefined,
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

	return (
		<>
			{query?.panel === 'sitter' && !state.isPetSitter && <ToOnBoardingModal />}
			<Heading mb={6}>{t('createSitterProfileHeading')}</Heading>
			<Heading mb={6} size='md'>
				{t('hostingInfos')}
			</Heading>
			<Box width='100%' as='form' autoComplete='off' onSubmit={saveProfile}>
				<Hosting
					state={state}
					setState={setState}
					errors={errors}
					handleChange={handleChange}
					hostingsOptions={hostingsOptions}
					speciesOptions={speciesOptions}
				/>

				<Flex my={[6, 6, 6, 12]}>
					<FormControl flex='1' isRequired>
						<FormLabel htmlFor='description'>{t('descriptionLabel')}</FormLabel>
						<Textarea
							id='description'
							name='description'
							value={state['description'] || ''}
							aria-describedby='description'
							variant='outline'
							onChange={handleChange}
							isInvalid={!!errors['description']}
							maxLength={2000}
							rows={8}
						/>
						<FormHelperText>{t('mandatorySitterField')}</FormHelperText>
					</FormControl>
				</Flex>
				<Rates
					state={state}
					handleCheckBoxes={handleCheckBoxes}
					handleChange={handleChange}
					errors={errors}
				/>
				<ExtraServices state={state} handleCheckBoxes={handleCheckBoxes} />
				<Partners
					state={state}
					setState={setState}
					handleChange={handleChange}
					partnersOptions={partnersOptions}
					partnersLookUp={partnersLookUp}
					errors={errors}
				/>
				<Availability state={state} setState={setState} />
				<Flex width='100%' align='center' justify='flex-end'>
					<Button onClick={saveProfile} colorScheme='red'>
						{t('saveProfile')}
					</Button>
				</Flex>
			</Box>
			<List>
				<ListItem>Premium pet sitter</ListItem>
			</List>
		</>
	)
}
