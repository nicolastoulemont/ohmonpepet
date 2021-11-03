import { Layout, MultiRangesDayPicker } from 'components'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { useI18n } from 'utils/hooks/useI18n'
import onBoardingAvailabilityJSON from 'statics/onboarding/availability.json'
import { useDimensions } from 'utils/hooks'
import { validateFields } from 'utils/errors'
import { availabilityNeededFields } from 'layouts/onboarding/shared'
import { CURRENT_USER_PROFILE } from 'graphql/profile/query'
import { removeTypename } from 'utils'
import {
	useCurrentUserQuery,
	useHandleProfileMutation,
	useProfileByCurrentUserIdQuery
} from 'generated/graphql'
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Heading,
	Link,
	Text
} from '@chakra-ui/react'

export default function OnBoardingAvailabilityInfos() {
	const [state, setState] = useState({})
	const [errors, setErrors] = useState<{ [key: string]: string }>({})
	const { t } = useI18n(onBoardingAvailabilityJSON)
	const { data } = useCurrentUserQuery()
	const { data: profile } = useProfileByCurrentUserIdQuery()
	const { push } = useRouter()
	const [width] = useDimensions()

	useEffect(() => {
		if (data?.currentUser.__typename === 'UserAuthenticationError') {
			push({
				pathname: '/onboarding',
				query: { panel: 'signin', src: 'onboarding' }
			})
		}
	}, [data])

	useEffect(() => {
		if (profile?.profileByCurrentUserId.profile) {
			setState({ ...state, ...removeTypename(profile?.profileByCurrentUserId.profile) })
		}
	}, [profile])

	// Clean up errors
	useEffect(() => {
		if (errors['availability']) {
			setErrors({ availability: undefined })
		}
	}, [state])
	const [handleProfile] = useHandleProfileMutation()

	async function saveProfile() {
		const { valid } = validateFields(availabilityNeededFields, state, setErrors)
		if (valid) {
			const { data } = await handleProfile({
				variables: {
					input: {
						...state
					}
				},
				refetchQueries: [{ query: CURRENT_USER_PROFILE }]
			})
			data.handleProfile.profile && push('/onboarding/partners')
		}
	}

	return (
		<Layout>
			<Box
				width='100%'
				height={['auto', 'auto', 'calc(100vh - 98px)']}
				boxSizing='border-box'
			>
				<Flex width='100%' align='center' justify='flex-start' my={6}>
					<NextLink href='/onboarding/hosting' passHref>
						<Button mr={6} size='sm' as={Link}>
							{t('back')}
						</Button>
					</NextLink>

					<Heading as='h1'>{t('title')}</Heading>
				</Flex>
				<Flex my={[6, 6, 6, 12]}>
					<FormControl flex='1'>
						<FormLabel htmlFor='availability'>{t('availabilityLabel')}</FormLabel>
						<FormHelperText id='availability-helper-text' mb={6}>
							{t('availabilityHelper')}
						</FormHelperText>
						<MultiRangesDayPicker
							parentState={state}
							setParentState={setState}
							name='availability'
							numberOfMonths={!width || width > 900 ? 8 : 2}
						/>
					</FormControl>
				</Flex>
				{errors['availability'] ? (
					<Flex width='100%' align='center' justify='flex-end' my={2}>
						<Text color='red.500' fontWeight={600}>
							{t('availabilityError')}
						</Text>
					</Flex>
				) : null}
				<Flex width='100%' align='center' justify='flex-end' my={6}>
					<Button onClick={saveProfile} colorScheme='red'>
						{t('availabilityBtn')}
					</Button>
				</Flex>
			</Box>
		</Layout>
	)
}
